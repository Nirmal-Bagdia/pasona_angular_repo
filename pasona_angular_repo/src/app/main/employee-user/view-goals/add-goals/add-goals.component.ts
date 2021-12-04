import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatDialog } from '@angular/material';
import { GoalPreviewDailogComponent } from 'app/dialog/goal-preview-dailog/goal-preview-dailog.component';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddGoalsComponent implements OnInit {

  goalsForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  userData: any;
  yearData: any[];
  monthData: any[];
  activeIndex: number;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 1;
  minDate = new Date();
  maxDate = new Date();
  showTicks = false;
  step = 1;
  thumbLabel = true;
  vertical = false;
  removeIds: any[];
  objectiveType=[{name:"Performance Objective",show:true,totalWeightage:0},
                 {name:"Development Objective",show:true,totalWeightage:0}
                ];
  @ViewChild('formDirective', { static: true }) private formDirective: NgForm;
  sub: any;
  appraisalPlanId: number;
  groupConfig: any;
  defaultCompetency:boolean=false;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router,private route: ActivatedRoute, public dialog: MatDialog
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.removeIds = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.appraisalPlanId = +params['id']; // (+) converts string 'id' to a number
    });

    this.goalsForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      empId: [this.userData.empCode],
      unitId: [this.userData.unitId],
      empObjId: [''],
      depId: [this.userData.userData.depId],
      summary: ['', [Validators.required, Validators.maxLength(500)]],
      fromMonth: ['', [Validators.required]],
      fromYear: ['', [Validators.required]],
      toMonth: ['', [Validators.required]],
      toYear: ['', [Validators.required]],
      objectiveType: ['', ],
      comment: ['', Validators.maxLength(500)],
      appraisalPlanId: [this.appraisalPlanId],
      objectiveList: this.fb.array([this.fb.group({ objective: ['', [Validators.required, Validators.maxLength(500)]], measurementCriteria: ['', [Validators.required, Validators.maxLength(500)]], difficultyLevel: [1, Validators.required], weightage: ['', Validators.required], objectiveType: ['', [Validators.required]], fromDate: ['', Validators.required], toDate: ['', Validators.required], id: ['',] })]),
      defaultCompetencyParameterWeightage: this.fb.array([])
    });

  }

  get objectiveLists() {
    return this.goalsForm.get('objectiveList') as FormArray;
  }

  addObjective() {
    this.objectiveLists.push(this.fb.group({ objective: ['', [Validators.required, Validators.maxLength(500)]], measurementCriteria: ['', [Validators.required, Validators.maxLength(500)]], difficultyLevel: [1, Validators.required], weightage: ['', Validators.required], objectiveType: ['', [Validators.required]], fromDate: ['', Validators.required], toDate: ['', Validators.required], id: ['',] }));
    // setTimeout(() => {
    //   this.removeClass();
    // }, 5);
    this.formDirective.resetForm(this.goalsForm.value);
  }

  deleteObjective(index, id) {
    if (id) {
      this.removeIds.push(id);
    }
    this.objectiveLists.removeAt(index);
    this.errorCheckingWeightage();
    this.activeIndex = NaN;

  }

  deleteObj(index, value, id) {
    if (value) {
      this.activeIndex = index;
      setTimeout(() => {
        this.activeIndex = NaN;
      }, 6000);
    }
    else {
      this.deleteObjective(index, id);
    }
  }

  ngOnInit() {
    this.yearData = this.pasonaService.getYear();
    this.monthData = this.pasonaService.getMonth();
    this.getAppraisalDataById();
    this.getGoalsDataById();
  }

  get f() { return this.goalsForm.controls; };

  arrayOne(n: number): any[] {
    return Array(n);
  }
formReplica(formData)
{
  var formReStructure={
    companyId: formData.companyId,
    empId:formData.empId ,
    unitId: formData.unitId,
    empObjId:formData.empObjId ,
    depId: formData.depId,
    summary:this.pasonaService.setEncrypt(formData.summary) ,
    fromMonth:formData.fromMonth ,
    fromYear:formData.fromYear ,
    toMonth:formData.toMonth ,
    toYear:formData.toYear ,
    objectiveType:formData.objectiveType ,
    comment:this.pasonaService.setEncrypt(formData.comment),
    appraisalPlanId:formData.appraisalPlanId ,
    objectiveList:this.pasonaService.setEncryptArray(formData.objectiveList,['objective','measurementCriteria']),
    defaultCompetencyParameterWeightage: formData.defaultCompetencyParameterWeightage
  }
 return formReStructure;
}

checkValidate100()
{
  if(this.objectiveType[0].show)
  {
    if(this.objectiveType[0].totalWeightage!=100)
    {
      this.pasonaService.infoMessage('Total Performance Objective Weightage should be equal to 100');
      return false;
    }
  }
  if(this.objectiveType[1].show)
  {
    if(this.objectiveType[1].totalWeightage!=100)
    {
      this.pasonaService.infoMessage('Total Development Objective Weightage should be equal to 100');
      return false;
    }
  }
  if(this.groupConfig.competencyParameter)
  { 
    if (this.goalsForm.value.defaultCompetencyParameterWeightage[0].totalWeightage!=100 ) {
      this.pasonaService.infoMessage('Total Competency Parameter Weightage should be equal to 100');
      return false;
    }
  }
  return true;
}
  createGoals() {
    console.log("form", this.goalsForm.value);
    if (this.goalsForm.valid) {
      let validate=this.checkValidate100();
     if (validate){
      this.goalsForm.value['removeId'] = this.removeIds;
      this.pasonaService.startSpinner();
      let formData=this.formReplica(this.goalsForm.value);
      this.pasonaService.saveGoalsEmp(formData).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate(['/employee/empGoals',this.appraisalPlanId]);
        }
        else {
          this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    }
    else {
      this.goalsForm.markAllAsTouched();
    }
  }

  submitGoals() {
    console.log("form", this.goalsForm.value);
    if (this.goalsForm.valid) {
      let validate=this.checkValidate100();
     if (validate){
      this.goalsForm.value['removeId'] = this.removeIds;
      this.pasonaService.startSpinner();
      let formData=this.formReplica(this.goalsForm.value);
      this.pasonaService.addGoalsEmp(formData).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate(['/employee/empGoals',this.appraisalPlanId]);
        }
        else {
          this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    }
    else {
      this.goalsForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  errorChecking(val) {
    var fromMonth = parseInt(this.goalsForm.value.fromMonth);
    var toMonth = parseInt(this.goalsForm.value.toMonth);
    var fromYear = parseInt(this.goalsForm.value.fromYear);
    var toYear = parseInt(this.goalsForm.value.toYear);
    console.log(fromMonth, toMonth, toYear, fromYear);
    if (fromYear == toYear && fromMonth > toMonth) {
      if (val == 'fm') {
        this.goalsForm.patchValue({ fromMonth: '' });
        this.pasonaService.openSnackBar('From Month should be less than To Month');
      }
      else {
        this.goalsForm.patchValue({ toMonth: '' });
        this.pasonaService.openSnackBar('To Month should be greater than From Month');
      }
    }
    else if (fromYear > toYear) {
      if (val == 'fy') {
        this.goalsForm.patchValue({ fromYear: '' });
        this.pasonaService.openSnackBar('From Year should be less than To Year');
      }
      else {
        this.goalsForm.patchValue({ toYear: '' });
        this.pasonaService.openSnackBar('To Year should be greater than From Year');
      }
    }
  }

  errorCheckingWeightage() {
    this.objectiveType[0].totalWeightage=0;
    this.objectiveType[1].totalWeightage=0;
    for (var i = 0; i < this.objectiveLists.length; i++) {
      console.log("this.objectiveLists.at(i).get('objectiveType').value",this.objectiveLists.at(i).get('objectiveType').value);
      if( this.objectiveLists.at(i).get('objectiveType').value=='Performance Objective')
      {
        this.objectiveType[0].totalWeightage += this.objectiveLists.at(i).get('weightage').value;
        if (this.objectiveType[0].totalWeightage > 100) {
          this.pasonaService.infoMessage('Total Performance Objective Weightage should be equal to 100');
          this.objectiveLists.at(i).get('weightage').patchValue('', { emitModelToViewChange: true });
        }
      }
      else
      {
        this.objectiveType[1].totalWeightage += this.objectiveLists.at(i).get('weightage').value;
        if (this.objectiveType[1].totalWeightage > 100) {
          this.pasonaService.infoMessage('Total Development Objective Weightage should be equal to 100');
          this.objectiveLists.at(i).get('weightage').patchValue('', { emitModelToViewChange: true });
        }
      }
    }
  }

  smartGoals() {
    const dialogAp = this.dialog.open(GoalPreviewDailogComponent, {
      width: '90vw',
      height: '95vh',
      panelClass: 'full-width-dialog',
      disableClose: true,
      data: { data: 'Smart Goal' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        //  this.deleteGoal(this.deleteId);
      }
    });
  }

  getAppraisalDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAppraisalPlanById(this.appraisalPlanId).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var goalData = dataRes.appraisalPlanDetails;
        this.goalsForm.patchValue({
          fromMonth: goalData.fromMonth,
          fromYear: +goalData.fromYear,
          toMonth: goalData.toMonth,
          toYear: +goalData.toYear
        })
        this.minDate = new Date(goalData.fromYear, goalData.fromMonth - 1, 1);
        this.maxDate = new Date(goalData.toYear, goalData.toMonth , 0);
      }
      else {
        // this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }


  patchValueForm(formData) {
    this.goalsForm.patchValue({
      companyId: +formData.companyId,
      summary: formData.summary,
      fromMonth: formData.fromMonth,
      fromYear: +formData.fromYear,
      toMonth: formData.toMonth,
      toYear: +formData.toYear,
      empObjId: formData.empObjId,
      comment: formData.comment,
      empId: this.userData.empCode,
      unitId: this.userData.unitId,
      depId: this.userData.userData.depId
    });
    if (!formData.comment) {
      this.goalsForm.patchValue({ comment: '' });
    }
  }

  patchObjective(formData) {
    for (var i = 1; i < formData.objectiveList.length; i++) {
      if (formData.objectiveList.length != i && this.goalsForm.value.objectiveList.length != formData.objectiveList.length) {
        this.addObjective();
      }
    }
    if (formData.objectiveList.length != 0) {
      this.goalsForm.patchValue({ objectiveList: formData.objectiveList });
    }
  }

  getGoalsDataById() {
    this.pasonaService.startSpinner();
    var formData = new FormData();
    formData.append("empId", this.userData.empCode);
    formData.append("appraisalPlanId", this.appraisalPlanId.toString());

    this.pasonaService.getGoalsByIdEmpAndAppraisalId(formData).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var goalData=dataRes.departmentDetails;
        goalData.summary=this.pasonaService.getDecrypt(goalData.summary);
        goalData.comment=this.pasonaService.getDecrypt(goalData.comment);
        goalData.objectiveList=this.pasonaService.getdecryptArray(goalData.objectiveList,['objective','measurementCriteria']);
        this.patchValueForm(goalData);
        this.patchObjective(goalData);
        this.objectiveType[0].totalWeightage=100;
        this.objectiveType[1].totalWeightage=100;
        if(goalData.defaultCompetencyParameterWeightage)
        {
          this.defaultCompetency=true;
          let parameters=this.pasonaService.getdecryptArray(goalData.defaultCompetencyParameterWeightage[0].parameters,['parameterName']);
          goalData.defaultCompetencyParameterWeightage[0].parameters=parameters;
          this.setCompetency(goalData.defaultCompetencyParameterWeightage[0]);
          this.getGroupConfigForObjective(2);
        }
        else
        {
          this.getGroupConfigForObjective(1);
        }
        
      }
      else {
        this.getGroupConfigForObjective(1);
        // this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }


  getGroupConfigForObjective(ch) {
    this.pasonaService.startSpinner();
    this.pasonaService.getGroupConfigForObjective(this.userData.userData.groupId).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.groupConfig=dataRes.groupDetails;
        if(this.groupConfig.objective)
        {
          this.objectiveType[0].show=this.groupConfig.objectiveType.performanceObjective;
          this.objectiveType[1].show=this.groupConfig.objectiveType.developmentObjective;
        }
        if(this.groupConfig.competencyParameterWeightage.length!=0 && ch==1)
        {
          this.defaultCompetency=true;
        let parameters=this.pasonaService.getdecryptArray(this.groupConfig.competencyParameterWeightage[0].parameters,['parameterName']);
        this.groupConfig.competencyParameterWeightage[0].parameters=parameters;
        this.setCompetency(this.groupConfig.competencyParameterWeightage[0]);
        }
      }
      else {
        // this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  setCompetency(data: any) {
      let competenyData = [];
      competenyData.push(data);
      let control = <FormArray>this.goalsForm.controls.defaultCompetencyParameterWeightage;
      competenyData.forEach(x => {
        control.push(this.fb.group({
          appraisalParameterId: x.appraisalParameterId,
          name: x.name,
          weightage: x.weightage || 0,
          totalWeightage: x.totalWeightage || 0,
          parameters: this.setParameters(x)
        }))
      })
  }

  setParameters(x) {
    let arr = new FormArray([])
    x.parameters.forEach(y => {
      arr.push(this.fb.group({
        parameterName: [y.parameterName,[Validators.required, Validators.maxLength(500)]],
        parameterWeightage: y.parameterWeightage,
        parameterId: y.parameterId
      }))
    })
    return arr;
  }

  checkTotal100(parameter: any[], ch) {
    var sum = 0;
    let control = <FormArray>this.goalsForm.controls[ch];
    for (var i = 0; i < parameter.length; i++) {
      sum += parseInt(parameter[i].parameterWeightage);
    }
    control.at(0).get('totalWeightage').patchValue(sum);
    console.log(sum);
  }

} 
