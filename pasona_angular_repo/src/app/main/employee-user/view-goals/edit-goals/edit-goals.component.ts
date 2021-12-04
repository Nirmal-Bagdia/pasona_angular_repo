import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatDialog, MatTabGroup } from '@angular/material';
import { NotesDialogComponent } from 'app/dialog/notes-dialog/notes-dialog.component';

@Component({
  selector: 'app-edit-goals',
  templateUrl: './edit-goals.component.html',
  styleUrls: ['./edit-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditGoalsComponent implements OnInit {
  @ViewChild('appraiseeTab', { static: false }) appraiseeTab: MatTabGroup;
  goalsForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  userData: any;
  yearData: any[];
  monthData: any[];
  sub: any;
  id: number;
  removeIds: any[];
  activeIndex: number;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  vertical = false;
  goalData: any;
  commentsEnable: boolean;
  submitEnable: boolean;
  minDate = new Date();
  maxDate = new Date();
  appraisalPlanId: number;
  objectiveType = [
    { name: "Performance Objective", show: true, totalWeightage: 0 },
    { name: "Development Objective", show: true, totalWeightage: 0 }
  ];
  groupConfig: any;
  defaultCompetency: boolean;
  ratingData: any[] = [];
  objective: boolean = true;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;
  configMidTermAppraisee: any;
  configEndTermAppraisee: any;
  activatedStep = 0;
  constructor(
    private fb: FormBuilder, public dialog: MatDialog, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    this.configMidTermAppraisee = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    this.configEndTermAppraisee = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.removeIds = [];
    this.commentsEnable = true;
    this.submitEnable = false;
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.appraisalPlanId = +params['ids'];
    });

    this.goalsForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      empId: [this.userData.empCode],
      unitId: [this.userData.unitId],
      depId: [this.userData.userData.depId],
      summary: ['', [Validators.required, Validators.maxLength(500)]],
      fromMonth: ['', [Validators.required]],
      fromYear: ['', [Validators.required]],
      toMonth: ['', [Validators.required]],
      toYear: ['',],
      objectiveType: ['',],
      comment: ['', Validators.maxLength(500)],
      appraisalPlanId: [this.appraisalPlanId],
      empObjId: [''],
      removeId: [''],
      objectiveList: this.fb.array([this.getObjectiveData()]),
      defaultCompetencyParameterWeightage: this.fb.array([]),
      competencyParameterWeightage: this.fb.array([]),
      companyParameterWeightage: this.fb.array([])
    });
  }

  get objectiveLists() {
    return this.goalsForm.get('objectiveList') as FormArray;
  }

  ngOnInit() {
    this.yearData = this.pasonaService.getYear();
    this.monthData = this.pasonaService.getMonth();
    this.getGoalsDataById();
  }

  addObjective() {
    this.objectiveLists.push(this.getObjectiveData());
  }

  addObjective1() {
    this.objectiveLists.push(this.getObjectiveData());
    this.goalData.objectiveList.push({ canRevise: true, canDelete: true });
  }

  getObjectiveData(): FormGroup {
    return this.fb.group({
      objective: ['', [Validators.required, Validators.maxLength(500)]],
      measurementCriteria: ['', [Validators.required, Validators.maxLength(500)]],
      difficultyLevel: [1, Validators.required],
      weightage: ['', Validators.required],
      id: ['',],
      objectiveType: ['', [Validators.required]],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      midTermActionsTaken: ['',],
      midTermResultsAchieved: ['',],
      midTermSelfRating: ['',],
      endTermActionsTaken: ['',],
      endTermResultsAchieved: ['',],
      endTermSelfRating: ['',]
    })
  }

  deleteObjective(index, id) {
    if (id) {
      this.removeIds.push(id);
    }
    this.objectiveLists.removeAt(index);
    this.errorCheckingWeightage();
    this.activeIndex = NaN;
  }

  /* removeFieldEditForObjective()
  {
    this.objectiveLists.at(this.objectiveLists.length-1).get('midTermSelfRating').disable();
    this.objectiveLists.at(this.objectiveLists.length-1).get('midTermActionsTaken').disable();
    this.objectiveLists.at(this.objectiveLists.length-1).get('midTermResultsAchieved').disable();
  } */

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

  get f() { return this.goalsForm.controls; };

  arrayOne(n: number): any[] {
    return Array(n);
  }

  formReplica(formData) {
    if (this.goalData.midTermProcessStatus == 1 || this.goalData.endTermProcessStatus == 1) {
      var competencyParameterWeightage = [...formData.competencyParameterWeightage];
      competencyParameterWeightage.forEach((element, i) => {
        competencyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(competencyParameterWeightage[i].parameters, ['midTermAppraiseeComment', 'endTermAppraiseeComment']);
      });

      var companyParameterWeightage = [...formData.companyParameterWeightage];
      companyParameterWeightage.forEach((element, i) => {
        companyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(companyParameterWeightage[i].parameters, ['midTermAppraiseeComment', 'endTermAppraiseeComment']);
      });
    }

    var defaultCompetencyParameterWeightage = [...formData.defaultCompetencyParameterWeightage];
    defaultCompetencyParameterWeightage.forEach((element, i) => {
      defaultCompetencyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(defaultCompetencyParameterWeightage[i].parameters, ['parameterName', 'midTermAppraiseeComment', 'endTermAppraiseeComment']);
    });

    var formReStructure = {
      companyId: formData.companyId,
      empId: formData.empId,
      unitId: formData.unitId,
      empObjId: formData.empObjId,
      removeId: formData.removeId,
      depId: formData.depId,
      summary: this.pasonaService.setEncrypt(formData.summary),
      fromMonth: formData.fromMonth,
      fromYear: formData.fromYear,
      toMonth: formData.toMonth,
      toYear: formData.toYear,
      objectiveType: formData.objectiveType,
      comment: this.pasonaService.setEncrypt(formData.comment),
      appraisalPlanId: formData.appraisalPlanId,
      objectiveList: this.pasonaService.setEncryptArray(formData.objectiveList, ['objective', 'measurementCriteria', 'midTermActionsTaken', 'midTermResultsAchieved', 'endTermActionsTaken', 'endTermResultsAchieved']),
      defaultCompetencyParameterWeightage: defaultCompetencyParameterWeightage,
      competencyParameterWeightage: competencyParameterWeightage,
      companyParameterWeightage: companyParameterWeightage
    }
    return formReStructure;
  }

  checkValidate100() {
    if (this.groupConfig.objective) {
      if (this.objectiveType[0].show) {
        if (this.objectiveType[0].totalWeightage != 100) {
          this.pasonaService.infoMessage('Total Performance Objective Weightage should be equal to 100');
          return false;
        }
      }
      if (this.objectiveType[1].show) {
        if (this.objectiveType[1].totalWeightage != 100) {
          this.pasonaService.infoMessage('Total Development Objective Weightage should be equal to 100');
          return false;
        }
      }
    }
    if (this.goalData.defaultCompetencyParameterWeightage) {
      if (this.goalsForm.value.defaultCompetencyParameterWeightage[0].totalWeightage != 100) {
        this.pasonaService.infoMessage('Total Competency Parameter Weightage should be equal to 100');
        return false;
      }
    }
    return true;
  }

  updateGoals() {
    if (this.goalsForm.valid) {
      let validate = this.checkValidate100();
      if (validate) {
        this.goalsForm.patchValue({ removeId: this.removeIds });
        this.pasonaService.startSpinner();
        this.goalsForm.get('summary').enable();
        let formData = this.formReplica(this.goalsForm.value);
        if (this.goalData.editStatus == 1) {

          this.pasonaService.editGoalsEmp(formData).subscribe(dataRes => {
            this.pasonaService.stopSpinner();
            if (dataRes.status == '1') {
              this.pasonaService.openSnackBar(dataRes.message);
              this.router.navigate(['/employee/empGoals', this.appraisalPlanId]);
            }
            else {
              this.pasonaService.openSnackBar(dataRes.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
            this.pasonaService.openSnackBarError('Please connect to server!');
          });
        }
        else if (this.goalData.endTermProcessStatus == 1 && this.goalData.editStatus == 0) {
          this.pasonaService.addGoalsEffortsEmpEndterm(formData).subscribe(dataRes => {
            this.pasonaService.stopSpinner();
            if (dataRes.status == '1') {
              this.pasonaService.openSnackBar(dataRes.message);
              this.router.navigate(['/employee/empGoals', this.appraisalPlanId]);
            }
            else {
              this.pasonaService.openSnackBar(dataRes.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
            this.pasonaService.openSnackBarError('Please connect to server!');
          });
        }
        else if (this.goalData.midTermProcessStatus == 1 && this.goalData.editStatus == 0) {
          this.pasonaService.addGoalsEffortsEmp(formData).subscribe(dataRes => {
            this.pasonaService.stopSpinner();
            if (dataRes.status == '1') {
              this.pasonaService.openSnackBar(dataRes.message);
              this.router.navigate(['/employee/empGoals', this.appraisalPlanId]);
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
    }
    else {
      this.goalsForm.markAllAsTouched();
      if ((this.goalData.midTermProcessStatus == 1 || this.goalData.endTermProcessStatus == 1) && this.goalData.editStatus == 0) {
        let err = '';
        if (this.goalsForm.controls['objectiveList'].invalid)
          err = 'objective';
        else if (this.goalsForm.controls['defaultCompetencyParameterWeightage'].invalid)
          err = 'default competency';
        else if (this.goalsForm.controls['competencyParameterWeightage'].invalid)
          err = 'competency';
        else if (this.goalsForm.controls['companyParameterWeightage'].invalid)
          err = 'company parameter';

        this.pasonaService.infoMessage(`Please complete self appraisal for ${err}!`);
      }
      else {
        this.pasonaService.infoMessage('Something went wrong please check your forms!');
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllCompanyData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getCompanyById(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.companyData.push(resp.companyDetails);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getRatingTypeById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getRatingTypeById(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.ratingData = [];
        if (resp.ratingDetails.ratingType == 'numeric') {
          for (let i = 1; i <= resp.ratingDetails.ratingTo; i++) {
            this.ratingData.push(i);
          }
        }
        else {
          for (let i = 0; i < resp.ratingDetails.ratingTo; i++) {
            this.ratingData.push(resp.ratingDetails.alphaNumericList[i].name);
          }
        }
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllUnitDataByCompanyId(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitByCompanyId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  errorChecking(val) {
    var fromMonth = parseInt(this.goalsForm.value.fromMonth);
    var toMonth = parseInt(this.goalsForm.value.toMonth);
    var fromYear = parseInt(this.goalsForm.value.fromYear);
    var toYear = parseInt(this.goalsForm.value.toYear);
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

  patchValueForm(formData) {
    this.goalsForm.patchValue({
      companyId: +formData.companyId,
      summary: formData.summary,
      fromMonth: formData.fromMonth,
      fromYear: +formData.fromYear,
      toMonth: formData.toMonth,
      toYear: +formData.toYear,
      objectiveType: formData.objectiveType,
      empObjId: formData.empObjId,
      comment: formData.comment
    });
  }

  patchObjective(formData) {
    for (var i = 1; i < formData.objectiveList.length; i++) {
      if (formData.objectiveList.length != i && this.goalsForm.value.objectiveList.length != formData.objectiveList.length) {
        this.addObjective();
      }
    }
    if (formData.objectiveList.length != 0) {
      this.goalsForm.patchValue({ objectiveList: formData.objectiveList });
      if (this.goalData.midTermProcessStatus == 1 && this.goalData.editStatus == 0) {
        for (var i = 0; i < this.objectiveLists.length; i++) {
          this.objectiveLists.at(i).get('objective').disable();
          this.objectiveLists.at(i).get('measurementCriteria').disable();
          this.objectiveLists.at(i).get('difficultyLevel').disable();
          this.objectiveLists.at(i).get('weightage').disable();
          this.objectiveLists.at(i).get('objectiveType').disable();
          this.objectiveLists.at(i).get('fromDate').disable();
          this.objectiveLists.at(i).get('toDate').disable();
        }
        // if(this.objectiveLists.at(0).get('comments').value)
        // {
        //   this.commentsEnable=false;
        // }
        //  this.goalsForm.get('objectiveType').disable();
        this.goalsForm.get('summary').disable();
        this.goalsForm.patchValue({ objectiveList: formData.objectiveList });
        for (var i = 0; i < this.objectiveLists.length; i++) {
          if (this.objectiveLists.at(i).get('midTermSelfRating').value == 0) {
            this.objectiveLists.at(i).get('midTermSelfRating').patchValue('');
          }
          /* else
          {
          this.objectiveLists.at(i).get('midTermSelfRating').disable();
          this.objectiveLists.at(i).get('midTermActionsTaken').disable();
          this.objectiveLists.at(i).get('midTermResultsAchieved').disable();
           this.submitEnable=true;
          } */
        }
      }
    }
  }

  getGoalsDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGoalsByIdEmp(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.goalData = dataRes.departmentDetails;

        this.minDate = new Date(dataRes.departmentDetails.fromYear, dataRes.departmentDetails.fromMonth - 1, 1);
        this.maxDate = new Date(dataRes.departmentDetails.toYear, dataRes.departmentDetails.toMonth , 0);
        var goalData = dataRes.departmentDetails;
        goalData.summary = this.pasonaService.getDecrypt(goalData.summary);
        if (goalData.comment) {
          goalData.comment = this.pasonaService.getDecrypt(goalData.comment);
        }
        goalData.objectiveList = this.pasonaService.getdecryptArray(goalData.objectiveList, ['objective', 'measurementCriteria', 'midTermActionsTaken', 'midTermResultsAchieved', 'endTermActionsTaken', 'endTermResultsAchieved']);
        this.patchValueForm(goalData);
        this.patchObjective(goalData);
        if (goalData.addMidTermReviewStatus && goalData.editStatus == 0 && goalData.endTermProcessStatus == 0) {
          this.submitEnable = true;
        }

        this.getGroupConfigForObjective(1);

        if (goalData.midTermProcessStatus == 1 || goalData.endTermProcessStatus == 1) {
          this.getRatingTypeById();
        }
        if (goalData.defaultCompetencyParameterWeightage) {
          this.defaultCompetency = true;
          let parameters = this.pasonaService.getdecryptArray(goalData.defaultCompetencyParameterWeightage[0].parameters, ['parameterName']);
          goalData.defaultCompetencyParameterWeightage[0].parameters = parameters;
          this.setCompetency(goalData.defaultCompetencyParameterWeightage[0], 'defaultCompetencyParameterWeightage');
        }
        this.objectiveType[0].totalWeightage = 100;
        this.objectiveType[1].totalWeightage = 100;
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  setCompetency(data: any, ch) {
    let competenyData = [];
    competenyData.push(data);
    let control = <FormArray>this.goalsForm.controls[ch];
    competenyData.forEach(x => {
      control.push(this.fb.group({
        appraisalParameterId: x.appraisalParameterId || 0,
        companyParameterId: x.companyParameterId || 0,
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
        parameterName: [y.parameterName, [Validators.required, Validators.maxLength(500)]],
        parameterWeightage: y.parameterWeightage,
        parameterId: y.parameterId,
        midTermAppraiseeRating: y.midTermAppraiseeRating || '',
        midTermAppraiseeComment: this.pasonaService.getDecrypt(y.midTermAppraiseeComment) || '',
        endTermAppraiseeRating: y.endTermAppraiseeRating || '',
        endTermAppraiseeComment: this.pasonaService.getDecrypt(y.endTermAppraiseeComment) || '',
      }))
    })
    return arr;
  }

  setParametersAfterRating(data, ch) {
    let control = <FormArray>this.goalsForm.controls[ch];
    data.forEach((x, index) => {
      let parameter = <FormArray>control.at(index).get('parameters');
      x.parameters.forEach((y, j) => {
        parameter.at(j).patchValue({ midTermAppraiseeRating: y.midTermAppraiseeRating || '' });
        parameter.at(j).patchValue({ midTermAppraiseeComment: this.pasonaService.getDecrypt(y.midTermAppraiseeComment) || '' });
        parameter.at(j).patchValue({ endTermAppraiseeRating: y.endTermAppraiseeRating || '' });
        parameter.at(j).patchValue({ endTermAppraiseeComment: this.pasonaService.getDecrypt(y.endTermAppraiseeComment) || '' });
      })
    })
  }

  checkTotal100(parameter: any[], ch) {
    var sum = 0;
    let control = <FormArray>this.goalsForm.controls[ch];
    for (var i = 0; i < parameter.length; i++) {
      sum += parseInt(parameter[i].parameterWeightage);
    }
    control.at(0).get('totalWeightage').patchValue(sum);
  }

  errorCheckingWeightage() {
    this.objectiveType[0].totalWeightage = 0;
    this.objectiveType[1].totalWeightage = 0;
    for (var i = 0; i < this.objectiveLists.length; i++) {
      if (this.objectiveLists.at(i).get('objectiveType').value == 'Performance Objective') {
        this.objectiveType[0].totalWeightage += this.objectiveLists.at(i).get('weightage').value;
        if (this.objectiveType[0].totalWeightage > 100) {
          this.pasonaService.infoMessage('Total Performance Objective Weightage should be equal to 100');
          this.objectiveLists.at(i).get('weightage').patchValue('', { emitModelToViewChange: true });
        }
      }
      else {
        this.objectiveType[1].totalWeightage += this.objectiveLists.at(i).get('weightage').value;
        if (this.objectiveType[1].totalWeightage > 100) {
          this.pasonaService.infoMessage('Total Development Objective Weightage should be equal to 100');
          this.objectiveLists.at(i).get('weightage').patchValue('', { emitModelToViewChange: true });
        }
      }
    }
  }


  notesPopUp(empId, empObjId, ch) {
    const dialogAp = this.dialog.open(NotesDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { type: ch, empObjId: empObjId, empId: empId }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        // this.getAllAppraisalPlanData();
      }
    });
  }

  getGroupConfigForObjective(ch) {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGroupConfigForObjective(this.userData.userData.groupId).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.groupConfig = dataRes.groupDetails;
        if (this.groupConfig.objective) {
          this.objectiveType[0].show = this.groupConfig.objectiveType.performanceObjective;
          this.objectiveType[1].show = this.groupConfig.objectiveType.developmentObjective;
        }
        else
          this.objective = false;
        if (this.groupConfig.competencyParameterWeightage && ch == 1) {
          for (var i = 0; i < this.groupConfig.competencyParameterWeightage.length; i++) {
            let parameters = this.pasonaService.getdecryptArray(this.groupConfig.competencyParameterWeightage[i].parameters, ['parameterName']);
            this.groupConfig.competencyParameterWeightage[i].parameters = parameters;
            this.setCompetency(this.groupConfig.competencyParameterWeightage[i], 'competencyParameterWeightage');
          }
        }

        if (this.groupConfig.companyParameterWeightage && ch == 1) {
          for (var i = 0; i < this.groupConfig.companyParameterWeightage.length; i++) {
            let parameters = this.pasonaService.getdecryptArray(this.groupConfig.companyParameterWeightage[i].parameters, ['parameterName']);
            this.groupConfig.companyParameterWeightage[i].parameters = parameters;
            this.setCompetency(this.groupConfig.companyParameterWeightage[i], 'companyParameterWeightage');
          }
        }

        if (this.goalData.companyParameterWeightage && ch == 1) {
          this.setParametersAfterRating(this.goalData.companyParameterWeightage, 'companyParameterWeightage');
          /*  for (var i=0;i<this.goalData.companyParameterWeightage.length;i++)
           {
             let parameters=this.pasonaService.getdecryptArray(this.goalData.companyParameterWeightage[i].parameters,['parameterName']);
             this.groupConfig.companyParameterWeightage[i].parameters=parameters;
             this.setCompetency(this.goalData.companyParameterWeightage[i],'companyParameterWeightage');
           } */
        }
        if (this.goalData.competencyParameterWeightage && ch == 1) {
          this.setParametersAfterRating(this.goalData.competencyParameterWeightage, 'competencyParameterWeightage')
          /*   for (var i=0;i<this.goalData.competencyParameterWeightage.length;i++)
            {
              let parameters=this.pasonaService.getdecryptArray(this.goalData.competencyParameterWeightage[i].parameters,['parameterName']);
              this.goalData.competencyParameterWeightage[i].parameters=parameters;
              this.setCompetency(this.goalData.competencyParameterWeightage[i],'competencyParameterWeightage');
            } */
        }


        this.configurationSet();

      }
      else {
        // this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  configurationSet() {
    if (this.goalData.midTermProcessStatus == 1) {
      this.configMidTermAppraisee.objectiveComment = this.groupConfig.midtermConfigurarion[0]['appraisee'];
      this.configMidTermAppraisee.objectiveRating = this.groupConfig.midtermConfigurarion[1]['appraisee'];

      this.configMidTermAppraisee.defaultCompetencyComment = this.groupConfig.midtermConfigurarion[2]['appraisee'];
      this.configMidTermAppraisee.defaultCompetencyRating = this.groupConfig.midtermConfigurarion[3]['appraisee'];

      this.configMidTermAppraisee.competencyComment = this.groupConfig.midtermConfigurarion[2]['appraisee'];
      this.configMidTermAppraisee.competencyRating = this.groupConfig.midtermConfigurarion[3]['appraisee'];

      this.configMidTermAppraisee.companyComment = this.groupConfig.midtermConfigurarion[4]['appraisee'];
      this.configMidTermAppraisee.companyRating = this.groupConfig.midtermConfigurarion[5]['appraisee'];

      this.configMidTermAppraisee.overallComments = this.groupConfig.midtermConfigurarion[6]['appraisee'];
      this.configMidTermAppraisee.trainingNeeds = this.groupConfig.midtermConfigurarion[7]['appraisee'];
    }

    if (this.goalData.endTermProcessStatus == 1) {
      this.configEndTermAppraisee.objectiveComment = this.groupConfig.endtermConfiguration[0]['appraisee'];
      this.configEndTermAppraisee.objectiveRating = this.groupConfig.endtermConfiguration[1]['appraisee'];

      this.configEndTermAppraisee.defaultCompetencyComment = this.groupConfig.endtermConfiguration[2]['appraisee'];
      this.configEndTermAppraisee.defaultCompetencyRating = this.groupConfig.endtermConfiguration[3]['appraisee'];

      this.configEndTermAppraisee.competencyComment = this.groupConfig.endtermConfiguration[2]['appraisee'];
      this.configEndTermAppraisee.competencyRating = this.groupConfig.endtermConfiguration[3]['appraisee'];

      this.configEndTermAppraisee.companyComment = this.groupConfig.endtermConfiguration[4]['appraisee'];
      this.configEndTermAppraisee.companyRating = this.groupConfig.endtermConfiguration[5]['appraisee'];

      this.configEndTermAppraisee.overallComments = this.groupConfig.endtermConfiguration[6]['appraisee'];
      this.configEndTermAppraisee.trainingNeeds = this.groupConfig.endtermConfiguration[7]['appraisee'];
    }
    this.validateRatingAndComment();
  }

  validateRatingAndComment() {
    //this.configMidTermAppraisee = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    if (this.goalData.midTermProcessStatus == 1 && this.goalData.endTermProcessStatus == 0) {
      if (this.groupConfig.objective) {
        if (this.configMidTermAppraisee.objectiveRating || this.configMidTermAppraisee.objectiveComment) {
          for (var i = 0; i < this.objectiveLists.length; i++) {
            if (this.configMidTermAppraisee.objectiveRating) {
              this.objectiveLists.at(i).get('midTermSelfRating').setValidators([Validators.required]);
              this.objectiveLists.at(i).get('midTermSelfRating').updateValueAndValidity();
            }
            if (this.configMidTermAppraisee.objectiveComment) {
              this.objectiveLists.at(i).get('midTermActionsTaken').setValidators([Validators.required, Validators.maxLength(500)]);
              this.objectiveLists.at(i).get('midTermResultsAchieved').setValidators([Validators.required, Validators.maxLength(500)]);
              this.objectiveLists.at(i).get('midTermActionsTaken').updateValueAndValidity();
              this.objectiveLists.at(i).get('midTermResultsAchieved').updateValueAndValidity();
            }
          }
        }
      }
      else {
        this.objectiveLists.removeAt(0);
      }
      if (this.configMidTermAppraisee.competencyRating || this.configMidTermAppraisee.competencyComment) {
        let defaultCompetencyControl = <FormArray>this.goalsForm.controls.defaultCompetencyParameterWeightage;

        for (var i = 0; i < defaultCompetencyControl.length; i++) {
          let parameters = <FormArray>defaultCompetencyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this.configMidTermAppraisee.defaultCompetencyRating) {
              parameters.at(j).get('midTermAppraiseeRating').setValidators([Validators.required]);
              parameters.at(j).get('midTermAppraiseeRating').updateValueAndValidity();
            } if (this.configMidTermAppraisee.defaultCompetencyComment) {
              parameters.at(j).get('midTermAppraiseeComment').setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get('midTermAppraiseeComment').updateValueAndValidity();
            }
          }
        }
      }

      if (this.configMidTermAppraisee.competencyRating || this.configMidTermAppraisee.competencyComment) {
        let competencyControl = <FormArray>this.goalsForm.controls.competencyParameterWeightage;
        for (var i = 0; i < competencyControl.length; i++) {
          let parameters = <FormArray>competencyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this.configMidTermAppraisee.competencyRating) {
              parameters.at(j).get('midTermAppraiseeRating').setValidators([Validators.required]);
              parameters.at(j).get('midTermAppraiseeRating').updateValueAndValidity();
            } if (this.configMidTermAppraisee.competencyComment) {
              parameters.at(j).get('midTermAppraiseeComment').setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get('midTermAppraiseeComment').updateValueAndValidity();
            }
          }
        }
      }

      if (this.configMidTermAppraisee.companyRating || this.configMidTermAppraisee.companyComment) {
        let companyControl = <FormArray>this.goalsForm.controls.companyParameterWeightage;
        for (var i = 0; i < companyControl.length; i++) {
          let parameters = <FormArray>companyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this.configMidTermAppraisee.companyRating) {
              parameters.at(j).get('midTermAppraiseeRating').setValidators([Validators.required]);
              parameters.at(j).get('midTermAppraiseeRating').updateValueAndValidity();
            } if (this.configMidTermAppraisee.companyComment) {
              parameters.at(j).get('midTermAppraiseeComment').setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get('midTermAppraiseeComment').updateValueAndValidity();
            }
          }
        }
      }
    }

    else if (this.goalData.endTermProcessStatus == 1) {
      if (this.configEndTermAppraisee.objectiveRating || this.configEndTermAppraisee.objectiveComment) {
        for (var i = 0; i < this.objectiveLists.length; i++) {
          if (this.configEndTermAppraisee.objectiveRating) {
            this.objectiveLists.at(i).get('endTermSelfRating').setValidators([Validators.required]);
            this.objectiveLists.at(i).get('endTermSelfRating').updateValueAndValidity();
          }
          if (this.configEndTermAppraisee.objectiveComment) {
            this.objectiveLists.at(i).get('endTermActionsTaken').setValidators([Validators.required, Validators.maxLength(500)]);
            this.objectiveLists.at(i).get('endTermResultsAchieved').setValidators([Validators.required, Validators.maxLength(500)]);
            this.objectiveLists.at(i).get('endTermActionsTaken').updateValueAndValidity();
            this.objectiveLists.at(i).get('endTermResultsAchieved').updateValueAndValidity();
          }
        }
      }
      if (this.configEndTermAppraisee.competencyRating || this.configEndTermAppraisee.competencyComment) {
        let defaultCompetencyControl = <FormArray>this.goalsForm.controls.defaultCompetencyParameterWeightage;

        for (var i = 0; i < defaultCompetencyControl.length; i++) {
          let parameters = <FormArray>defaultCompetencyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this.configEndTermAppraisee.defaultCompetencyRating) {
              parameters.at(j).get('endTermAppraiseeRating').setValidators([Validators.required]);
              parameters.at(j).get('endTermAppraiseeRating').updateValueAndValidity();
            } if (this.configEndTermAppraisee.defaultCompetencyComment) {
              parameters.at(j).get('endTermAppraiseeComment').setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get('endTermAppraiseeComment').updateValueAndValidity();
            }
          }
        }
      }

      if (this.configEndTermAppraisee.competencyRating || this.configEndTermAppraisee.competencyComment) {
        let competencyControl = <FormArray>this.goalsForm.controls.competencyParameterWeightage;
        for (var i = 0; i < competencyControl.length; i++) {
          let parameters = <FormArray>competencyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this.configEndTermAppraisee.competencyRating) {
              parameters.at(j).get('endTermAppraiseeRating').setValidators([Validators.required]);
              parameters.at(j).get('endTermAppraiseeRating').updateValueAndValidity();
            } if (this.configEndTermAppraisee.competencyComment) {
              parameters.at(j).get('endTermAppraiseeComment').setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get('endTermAppraiseeComment').updateValueAndValidity();
            }
          }
        }
      }

      if (this.configEndTermAppraisee.companyRating || this.configEndTermAppraisee.companyComment) {
        let companyControl = <FormArray>this.goalsForm.controls.companyParameterWeightage;
        for (var i = 0; i < companyControl.length; i++) {
          let parameters = <FormArray>companyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this.configEndTermAppraisee.companyRating) {
              parameters.at(j).get('endTermAppraiseeRating').setValidators([Validators.required]);
              parameters.at(j).get('endTermAppraiseeRating').updateValueAndValidity();
            } if (this.configEndTermAppraisee.companyComment) {
              parameters.at(j).get('endTermAppraiseeComment').setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get('endTermAppraiseeComment').updateValueAndValidity();
            }
          }
        }
      }
    }

    if (this.goalData.addMidTermReviewStatus && this.goalData.editStatus == 0 && this.goalData.endTermProcessStatus == 0) {
      this.disabledControlSet();
    }
    if (this.goalData.addEndTermReviewStatus && this.goalData.editStatus == 0 && this.goalData.endTermProcessStatus == 1) {
      this.disabledControlSet();
    }

  }

  disabledControlSet() {
    (<FormArray>this.goalsForm.get('defaultCompetencyParameterWeightage'))
      .controls
      .forEach(control => {
        control.disable();
      });
    (<FormArray>this.goalsForm.get('competencyParameterWeightage'))
      .controls
      .forEach(control => {
        control.disable();
      });
    (<FormArray>this.goalsForm.get('companyParameterWeightage'))
      .controls
      .forEach(control => {
        control.disable();
      });
    (<FormArray>this.goalsForm.get('objectiveList'))
      .controls
      .forEach(control => {
        control.disable();
      });
  }
}
