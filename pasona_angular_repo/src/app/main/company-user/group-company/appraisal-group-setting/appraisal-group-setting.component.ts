import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';
import { validateBasis } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-appraisal-group-setting',
  templateUrl: './appraisal-group-setting.component.html',
  styleUrls: ['./appraisal-group-setting.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AppraisalGroupSettingComponent implements OnInit {
  groupForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  id: any;
  sub: any;
  userData: any;
  urlCurrent: string;
  roleModule: any;
  companyParameterData: any[];
  appraisalParameterData: any[];
  activatedStep = 0;
  //ratingConsolidator: false, hr: false, finalAuthority: false,
END_TERM_DATA: any[] = [
    { name: 'Objective Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Objective Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Competency Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Competency Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Company Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Company Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Overall Comments', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Training Needs', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Consolidate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Indicative Rating', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
  ];

  MID_TERM_DATA: any[] = [
    { name: 'Objective Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true},
    { name: 'Objective Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Competency Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Competency Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Company Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Company Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Overall Comments', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true },
    { name: 'Training Needs', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:true},
  ];
  
  evaluationOptionData: any[] = [
    { name: 'Mid-term', performanceObj: false, performanceObjWeightage: 0, developmentObj: false, developmentObjWeightage: 0, competencyPara: false, competencyParaWeightage: 0, companyPara: false, companyParaWeightage: 0, show: true, totalWeightage: 0 },
    { name: 'End-term', performanceObj: false, performanceObjWeightage: 0, developmentObj: false, developmentObjWeightage: 0, competencyPara: false, competencyParaWeightage: 0, companyPara: false, companyParaWeightage: 0, show: true, totalWeightage: 0 },
  ];
  
  displayedColumns: string[] = ['sNo', 'Mid-Term', 'End-term'];
  displayedColumnsEvaluation: string[] = ['sNo', 'perObj', 'devObj', 'competency', 'companyPara'];
  evalutionDataSource = new MatTableDataSource<any>(this.evaluationOptionData);
  midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
  endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
  selectAllModuleMidTerm: boolean = false;
  selectAllModuleSecondTerm: boolean = false;
  selectAllModuleEndTerm: boolean = false;
  selectAllModuleFirstTerm: boolean = false;
  selectAllModuleMidTermEvaluation: boolean = false;
  selectAllModuleSecondTermEvaluation: boolean = false;
  selectAllModuleEndTermEvaluation: boolean = false;
  selectAllModuleFirstTermEvaluation: boolean = false;

  objectiveType = { performanceObjective: true, developmentObjective: true };
  evaluationProcess = { indicativeRating: false, primaryRating: false, finalRating: true };
  evaluationResult = { performanceRating: true,performanceRatingWeightage:0, companyParameter: false ,companyParameterWeightage: 0, competencyRating: false, competencyRatingWeightage: 0, compositeRating: false ,total:0 };
  termType = { midterm: true, midtermWeightage: 50, endterm: true, endtermWeightage: 50, totalWeightage: 100 };

  //displayedColumns2: string[] = ['sNo', 'appraisee', 'ap1', 'ap2', 'ap3', 'rc', 'hr', 'fa', "star"];
  displayedColumns2: string[] = ['sNo', 'appraisee', 'ap1', 'ap2', 'ap3'/*, "star" */];
  headerTable = ["Appraisee", "Appraiser-1", "Appraiser-2", "Appraiser-3", "Consolidator", "HR", "Final Authority", "Particulars"];
  evalutionCompetencyWeightageTotal: number=0;
  evalutionCompanyWeightageTotal: number=0;
  appraiserWeightageTotal: number = 100;
  stateName: any;
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    this.stateName=this.pasonaService.getStateData();
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.companyParameterData = [];
    this.appraisalParameterData = [];
    this.unitData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    this.groupForm = this.fb.group({
      objective: [true,],
      competencyParameter: [true,],
      companyParameter: [true,],
      appraiser: [1,],
      appraiser1weightage: [100, Validators.required],
      appraiser2weightage: [0,],
      appraiser3weightage: [0,],
      competencyGroupIdsTemp: [''],
      competencyGroupIds: [],
      companyId: [this.userData.companyId],
      companyGroupIdsTemp: [''],
      companyGroupIds: [],
      competencyParameterWeightage: this.fb.array([]),
      companyParameterWeightage: this.fb.array([]),
      groupId: [this.id],
      ratingAndComment: [],
      evaluationConfiguration: [],
      evaluationType: ['relative',],
      midtermConfigurarion: [''],
      endtermConfiguration: [''],
      objectiveType: [],
      evaluationProcess: [],
      evaluationResult: [],
      termType: []
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/group";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/group";
      this.roleModule = { write: true };
      this.groupForm.patchValue({ unitId: this.userData.unitId });
      this.groupForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/group";
    }
    var roleData = this.pasonaService.getRoleModule(5);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.groupForm.disable();
      }
      console.log("roleData", roleData);
    }

  }

  ngOnInit() {
    //  this.getAllCompanyData();
    this.getallAppraisalParameter();
    
  }
  submitGroupSetting() {
    if (this.groupForm.valid) {
      this.groupForm.value.evaluationConfiguration = this.evaluationOptionData;
      this.groupForm.value.midtermConfigurarion = this.MID_TERM_DATA;
      this.groupForm.value.endtermConfiguration = this.END_TERM_DATA;
      this.groupForm.value.objectiveType = this.objectiveType;
      this.groupForm.value.evaluationProcess = this.evaluationProcess;
      this.groupForm.value.evaluationResult = this.evaluationResult;
      this.groupForm.value.termType = this.termType;
      var companyGroupIds = [];
      for (let obj of this.groupForm.value.companyGroupIdsTemp) {
        companyGroupIds.push(obj.companyParameterId );
      }
      this.groupForm.value.companyGroupIds = companyGroupIds;

      var competencyGroupIds = [];
      for (let obj of this.groupForm.value.competencyGroupIdsTemp) {
        competencyGroupIds.push(obj.appraisalParameterId);
      }
      this.groupForm.value.competencyGroupIds = competencyGroupIds;
      console.log("form", this.groupForm.value);
      var competencyWeightage = this.groupForm.value.competencyParameterWeightage;
      var companyWeightage = this.groupForm.value.companyParameterWeightage;
      if((this.evaluationResult.total==100 && this.evaluationResult.compositeRating) || (!this.evaluationResult.compositeRating) ){
        let success = this.checkWeightageOfCompanyAndCompetency(competencyWeightage, 'Competency');
        if (success) {
        let success = this.checkWeightageOfCompanyAndCompetency(companyWeightage, 'Company');
        if (success) {
          let successAppraiser = this.errorCheckingWeightageAppraiser100();
          if (successAppraiser) {
            if (this.termType.totalWeightage == 100) {
              if (this.evaluationOptionData[1].totalWeightage == 100) {
                if (this.termType.midterm) {
                  if (this.evaluationOptionData[0].totalWeightage == 100) {
                    this.groupSettingAdd();
                  }
                  else {
                    this.pasonaService.infoMessage('Evaluation Matrix Mid-term weightage should be equal to 100');
                    return 0;
                  }
                }
                else
                this.groupSettingAdd();
              }
              else {
                this.pasonaService.infoMessage('Evaluation Matrix End-term weightage should be equal to 100');
                return 0;
              }
            

            }
            else {
              this.pasonaService.infoMessage('Mid-term & End-term total weightage should be equal to 100');
            }

          }
        }
      }
    }
    else
    {
      this.pasonaService.infoMessage('Total Evaluation Result Weightage should be equal to 100');
    }
    }
    else {
      this.groupForm.markAllAsTouched();
      console.log(this.groupForm.value)
     //  this.pasonaService.infoMessage('Somthing went wrong please check the form!')
    }
  }

  groupSettingAdd() {
    this.pasonaService.addAppraiserGroupSetting(this.groupForm.value).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.pasonaService.openSnackBar(dataRes.message);
        this.router.navigate([this.urlCurrent]);
      }
      else {
        this.pasonaService.infoMessage(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }
  get f() { return this.groupForm.controls; };


  addNewcompetencyGroupIds() {
    let control = <FormArray>this.groupForm.controls.competencyParameterWeightage;
    control.push(
      this.fb.group({
        appraisalParameterId: [''],
        name: [''],
        weightage: [1],
        totalWeightage: [''],
        defaultGroup:[''],
        // nested form array, you could also add a form group initially
        parameters: this.fb.array([])
      })
    )
  }

  deletecompetencyGroupIds(index) {
    let control = <FormArray>this.groupForm.controls.competencyParameterWeightage;
    control.removeAt(index)
  }

  addNewPrameters(control) {
    control.push(
      this.fb.group({
        parameterId: [''],
        parameterName: [''],
        parameterWeightage: ['', Validators.required],
      }))
  }

  deleteParameters(control, index) {
    control.removeAt(index)
  }


  addNewcompanyGroupIds() {
    let control = <FormArray>this.groupForm.controls.companyParameterWeightage;
    control.push(
      this.fb.group({
        companyParameterId: [''],
        name: [''],
        weightage: [1],
        totalWeightage: [''],
        // nested form array, you could also add a form group initially
        parameters: this.fb.array([])
      })
    )
  }

  deletecompanyGroupIds(index) {
    let control = <FormArray>this.groupForm.controls.companyParameterWeightage;
    control.removeAt(index)
  }

  addNewCompanyPrameters(control) {
    control.push(
      this.fb.group({
        parameterId: [''],
        parameterName: [''],
        parameterWeightage: ['', Validators.required],
      }))
  }

  deleteCompanyParameters(control, index) {
    control.removeAt(index)
  }

  setcompanyParameterWeightage(selected, data: any) {
    console.log("selected", selected);
    console.log("ev", data)
    if (!selected) {
      if (this.groupForm.value.companyParameterWeightage.length != 0) {
        this.groupForm.value.companyParameterWeightage.forEach((element, i) => {
          if (data.companyParameterId === element.companyParameterId) {
            this.deletecompanyGroupIds(i)
          }
        });
      }
    }
    else {
      let companyData = [];
      companyData.push(data);
      let control = <FormArray>this.groupForm.controls.companyParameterWeightage;
      companyData.forEach(x => {
        control.push(this.fb.group({
          companyParameterId: x.companyParameterId,
          name: x.name,
          defaultGroup:x.defaultGroup || false,
          weightage: x.weightage || 0,
          totalWeightage: x.totalWeightage,
          parameters: this.setParameters(x)
        }))
      })
    }
  }

  setCompetency(selected, data: any) {
    console.log("selected", selected);
    console.log("ev", data)
    if (!selected) {
      if (this.groupForm.value.competencyParameterWeightage.length != 0) {
        this.groupForm.value.competencyParameterWeightage.forEach((element, i) => {
          if (data.appraisalParameterId === element.appraisalParameterId) {
            this.deletecompetencyGroupIds(i)
          }
        });
      }
    }
    else {
      let competenyData = [];
      competenyData.push(data);
      let control = <FormArray>this.groupForm.controls.competencyParameterWeightage;
      competenyData.forEach(x => {
        control.push(this.fb.group({
          appraisalParameterId: x.appraisalParameterId,
          name: x.name,
          defaultGroup:x.defaultGroup || false,
          weightage: x.weightage || 0,
          totalWeightage: x.totalWeightage,
          parameters: this.setParameters(x)
        }))
      })
    }
  }

  setParameters(x) {
    let arr = new FormArray([])
    x.parameters.forEach(y => {
      arr.push(this.fb.group({
        parameterName: y.parameterName,
        parameterWeightage: y.parameterWeightage,
        parameterId: y.parameterId
      }))
    })
    return arr;
  }

  checkWeightageOfCompanyAndCompetency(competencyAndCompanyWeightage, ch) {
    let evalutionWeightage = 0;
    let parameterWeightage = 0;
    for (var i = 0; i < competencyAndCompanyWeightage.length; i++) {
      evalutionWeightage += competencyAndCompanyWeightage[i].weightage;
      parameterWeightage = competencyAndCompanyWeightage[i].totalWeightage || 0;
      if (parameterWeightage < 100 && competencyAndCompanyWeightage[i].defaultGroup==false ) {
        this.pasonaService.infoMessage('Total Parameter Weightage should be equal to 100');
        return false;
      }
    }
    if (evalutionWeightage < 100 && competencyAndCompanyWeightage.length!=0) {
      this.pasonaService.infoMessage(`Total ${ch} Weightage should be equal to 100`);
      return false;
    }
    return true;
  }

  errorCheckingWeightageAppraiser100() {
    if (this.appraiserWeightageTotal != 100) {
      this.pasonaService.infoMessage('Total Appraiser Weightage should be equal to 100');
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getAllCompanyParameter() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCompanyParameter(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.getGroupDataById();
        this.companyParameterData = this.pasonaService.getdecryptArray(resp.appraisalParameterDetails, ['name']);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }


  getallAppraisalParameter() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalParameter(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.getAllCompanyParameter();
        this.appraisalParameterData = this.pasonaService.getdecryptArray(resp.appraisalParameterDetails, ['name']);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  patchValueForm(formData) {
    this.groupForm.patchValue({
      objective:formData.objective ,
      competencyParameter: formData.competencyParameter,
      companyParameter: formData.companyParameter,
      appraiser:formData.appraiser,
      appraiser1weightage:formData.appraiser1weightage,
      appraiser2weightage:formData.appraiser2weightage,
      appraiser3weightage: formData.appraiser3weightage,
      companyId: this.userData.companyId,
      groupId: this.id,
      evaluationType: formData.evaluationType,
    });
     this.END_TERM_DATA=formData.endtermConfiguration;
     this.MID_TERM_DATA=formData.midtermConfigurarion;
     this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
     this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
    this.objectiveType=formData.objectiveType;
    this.evaluationProcess=formData.evaluationProcess;
    this.evaluationResult=formData.evaluationResult;
    if(!formData.evaluationResult.compositeRating)
    {
      this.evaluationResult.total=0;
    }
    this.termType = formData.termType;
    if(!this.termType.midterm)
    {
      this.activatedStep=1;
    }
    this.evaluationOptionData=formData.evaluationConfiguration;
    this.evalutionDataSource = new MatTableDataSource<any>(this.evaluationOptionData);
    if(formData.competencyGroupIds)
    {
      var dataCompetency=this.appraisalParameterData.filter(d => formData.competencyGroupIds.indexOf(d.appraisalParameterId) > -1)
      this.groupForm.patchValue({competencyGroupIdsTemp:dataCompetency});
      if(formData.competencyGroupIds.length!=0)
    {
      this.evalutionCompetencyWeightageTotal = 100;
    }
    for (var i=0;i<formData.competencyParameterWeightage.length;i++)
    {
      this.setCompetency(true,formData.competencyParameterWeightage[i]);
    }
    this.groupForm.controls['competencyGroupIdsTemp'].setValidators([Validators.required]);
    this.groupForm.controls['competencyGroupIdsTemp'].updateValueAndValidity();
    }
    else{  this.groupForm.controls['competencyGroupIdsTemp'].setValidators(null);
    this.groupForm.controls['competencyGroupIdsTemp'].updateValueAndValidity();
    }
    if(formData.companyGroupIds)
    {
    var dataCompany=this.companyParameterData.filter(d => formData.companyGroupIds.indexOf(d.companyParameterId) > -1)
    this.groupForm.patchValue({companyGroupIdsTemp:dataCompany});
    if(formData.companyGroupIds.length!=0)
    {
        this.evalutionCompanyWeightageTotal = 100;
    }
    for (var i=0;i<formData.companyParameterWeightage.length;i++)
    {
      this.setcompanyParameterWeightage(true,formData.companyParameterWeightage[i]);
    }
    this.groupForm.controls['companyGroupIdsTemp'].setValidators([Validators.required]);
    this.groupForm.controls['companyGroupIdsTemp'].updateValueAndValidity();
  }
  else{
    this.groupForm.controls['companyGroupIdsTemp'].setValidators(null);
    this.groupForm.controls['companyGroupIdsTemp'].updateValueAndValidity();
   }
  }

  other(formData)
  {
    // companyGroupIds: ['', Validators.required],
    // competencyParameterWeightage: this.fb.array([]),
    // companyParameterWeightage: this.fb.array([]),
    // competencyGroupIds: ['', Validators.required],
    // : [],
   
  }
  getGroupDataById() {
    this.pasonaService.startSpinner();
    console.log("id", this.id);
    this.pasonaService.getAppraiserGroupSettingById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.patchValueForm(dataRes.groupDetails);
      }
      else {
        setTimeout(() => {
          this.groupForm.controls['companyGroupIdsTemp'].setValidators([Validators.required]);
          this.groupForm.controls['companyGroupIdsTemp'].updateValueAndValidity();

          this.groupForm.controls['competencyGroupIdsTemp'].setValidators([Validators.required]);
          this.groupForm.controls['competencyGroupIdsTemp'].updateValueAndValidity();
            }, 2000);
       // this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  competencyChange(event) {
    if (!event.checked) {
      this.evaluationOptionData[0].competencyPara = false;
      this.evaluationOptionData[1].competencyPara = false;
      this.evaluationOptionData[0].totalWeightage-=this.evaluationOptionData[0].competencyParaWeightage;
      this.evaluationOptionData[1].totalWeightage-=this.evaluationOptionData[1].competencyParaWeightage;
      this.evaluationOptionData[0].competencyParaWeightage = 0;
      this.evaluationOptionData[1].competencyParaWeightage = 0;
      this.evaluationResult.total-= this.evaluationResult.competencyRatingWeightage;
      this.evaluationResult.competencyRatingWeightage=0;
      this.evaluationResult.competencyRating=false;
      if(this.groupForm.value.companyParameter==false)
      {
        this.evaluationResult.compositeRating=false;
      }
      this.MID_TERM_DATA[2]={ name: 'Competency Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.MID_TERM_DATA[3]= { name: 'Competency Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.END_TERM_DATA[2]={ name: 'Competency Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.END_TERM_DATA[3]= { name: 'Competency Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
      this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
      this.groupForm.controls['competencyGroupIdsTemp'].setValidators(null);
     // this.groupForm.controls['competencyGroupIdsTemp'].updateValueAndValidity();
      this.groupForm.patchValue({ competencyGroupIdsTemp: [] });
      this.evalutionCompetencyWeightageTotal=0;
      while (this.groupForm.value.competencyParameterWeightage.length != 0) {
        this.deletecompetencyGroupIds(0);
      }
    }
    else { 
      this.MID_TERM_DATA[2].show=true;
      this.MID_TERM_DATA[3].show=true;
      this.END_TERM_DATA[2].show=true;
      this.END_TERM_DATA[3].show=true;
      this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
      this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
      this.groupForm.controls['competencyGroupIdsTemp'].setValidators([Validators.required]);
    }
   // this.groupForm.controls['competencyGroupIdsTemp'].updateValueAndValidity();
  }

  objectiveChange(event) {
    if (!event.checked) {
      this.evaluationOptionData[0].performanceObj = false;
      this.evaluationOptionData[1].performanceObj = false;
      this.evaluationOptionData[0].developmentObj = false;
      this.evaluationOptionData[1].developmentObj = false;
      this.evaluationOptionData[0].totalWeightage-=this.evaluationOptionData[0].performanceObjWeightage;
      this.evaluationOptionData[1].totalWeightage-=this.evaluationOptionData[1].performanceObjWeightage;
      this.evaluationOptionData[0].totalWeightage-=this.evaluationOptionData[0].developmentObjWeightage;
      this.evaluationOptionData[1].totalWeightage-=this.evaluationOptionData[1].developmentObjWeightage;
      this.evaluationOptionData[0].performanceObjWeightage = 0;
      this.evaluationOptionData[1].performanceObjWeightage = 0;
      this.evaluationOptionData[0].developmentObjWeightage = 0;
      this.evaluationOptionData[1].developmentObjWeightage = 0;
      this.evaluationResult.total-= this.evaluationResult.performanceRatingWeightage;
      this.evaluationResult.performanceRatingWeightage=0;
      this.evaluationResult.performanceRating=false;
      this.MID_TERM_DATA[0]= { name: 'Objective Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.MID_TERM_DATA[1]= { name: 'Objective Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.END_TERM_DATA[0]= { name: 'Objective Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.END_TERM_DATA[1]= { name: 'Objective Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
      this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
    }
    else {
      this.MID_TERM_DATA[0].show=true;
      this.MID_TERM_DATA[1].show=true;
      this.END_TERM_DATA[0].show=true;
      this.END_TERM_DATA[1].show=true;
     this.objectiveType.performanceObjective=true;
     this.objectiveType.developmentObjective=true;
      this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
      this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
     }

  }

  companyChange(event) {
    if (!event.checked) {
      this.evaluationOptionData[0].companyPara = false;
      this.evaluationOptionData[1].companyPara = false;
      this.evaluationOptionData[0].totalWeightage-=this.evaluationOptionData[0].companyParaWeightage;
      this.evaluationOptionData[1].totalWeightage-=this.evaluationOptionData[1].companyParaWeightage;
      this.evaluationOptionData[0].companyParaWeightage = 0;
      this.evaluationOptionData[1].companyParaWeightage = 0;
      this.evaluationResult.total-= this.evaluationResult.companyParameterWeightage;
      this.evaluationResult.companyParameterWeightage=0;
      this.evaluationResult.companyParameter=false;
      if(this.groupForm.value.competencyParameter==false)
      {
        this.evaluationResult.compositeRating=false;
      }
      this.MID_TERM_DATA[4]={ name: 'Company Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.MID_TERM_DATA[5]= { name: 'Company Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.END_TERM_DATA[4]={ name: 'Company Review', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.END_TERM_DATA[5]= { name: 'Company Evaluate', appraisee: false, appraiser1: false, appraiser2: false, appraiser3: false, show:false };
      this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
      this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
      this.groupForm.controls['companyGroupIdsTemp'].setValidators(null);
     // this.groupForm.controls['companyGroupIdsTemp'].updateValueAndValidity();
      this.groupForm.patchValue({ companyGroupIdsTemp: [] });
      this.evalutionCompanyWeightageTotal=0;
      while (this.groupForm.value.companyParameterWeightage.length != 0) {
        this.deletecompanyGroupIds(0);
      }
    }
    else {
      this.MID_TERM_DATA[4].show=true;
      this.MID_TERM_DATA[5].show=true;
      this.END_TERM_DATA[4].show=true;
      this.END_TERM_DATA[5].show=true;
      this.midtermDataSource = new MatTableDataSource<any>(this.MID_TERM_DATA);
      this.endtermDataSource = new MatTableDataSource<any>(this.END_TERM_DATA);
      this.groupForm.controls['companyGroupIdsTemp'].setValidators([Validators.required]);
     }
    //this.evaluationOptionData[1].show=true;
  
    //this.groupForm.controls['companyGroupIdsTemp'].updateValueAndValidity();
  }
  changeTermWeigthage(j,ch)
  {
    this.evaluationOptionData[j]['totalWeightage']-=this.evaluationOptionData[j][ch];
    this.evaluationOptionData[j][ch]=0;   
    this.evalutionDataSource = new MatTableDataSource<any>(this.evaluationOptionData);
  }

  checkTotal100(parameter: any[], index, ch) {
    var sum = 0;
    let control = <FormArray>this.groupForm.controls[ch];
    //let parameters = <FormArray>control.at(index).get('parameters');
    for (var i = 0; i < parameter.length; i++) {
      sum += parseInt(parameter[i].parameterWeightage);
      // if (sum > 100) {
      //   this.pasonaService.infoMessage('Total Parameter Weightage should be equal to 100');
      //   sum -= parseInt(parameter[i].parameterWeightage);
      //   parameters.at(i).get('parameterWeightage').patchValue('', { emitModelToViewChange: true });
      //   break;
      // }
    }
    control.at(index).get('totalWeightage').patchValue(sum);
    console.log(sum);
  }

  checkTotal100Evalution(parameter: any[], ch) {
    var sum = 0;
    for (var i = 0; i < parameter.length; i++) {
      sum += parseInt(parameter[i].weightage);
    }
    if (ch == 1)
      this.evalutionCompetencyWeightageTotal = sum;
    else
      this.evalutionCompanyWeightageTotal = sum;
    console.log(sum);
  }

  selectAllMidTerm(event, ch) {
    var arr = [];
    if (ch == 1)
      arr = [];
    else
      arr = this.evaluationOptionData;

    if (event.checked == true) {
      arr.forEach((element, ind) => {
        element.midterm = true;
      });
    }
    else {
      arr.forEach((element, ind) => {
        element.midterm = false;
      });
    }
  }

  selectAllEndTerm(event, ch) {
    var arr = [];
    if (ch == 1)
      arr = [];
    else
      arr = this.evaluationOptionData;
    if (event.checked == true) {
      arr.forEach((element, ind) => {
        element.endterm = true;
      });
    }
    else {
      arr.forEach((element, ind) => {
        element.endterm = false;
      });
    }
  }

  radioChange(ev) {
    console.log("ev", ev);
    if (ev.value == 1) {
      this.groupForm.patchValue({ appraiser1weightage: 100 });
    }
    else if (ev.value == 2) {
      this.groupForm.patchValue({ appraiser1weightage: 100, appraiser2weightage: 0, appraiser3weightage: 0 });
    }
    else if (ev.value == 3) {
      this.groupForm.patchValue({ appraiser1weightage: 100, appraiser2weightage: 0, appraiser3weightage: 0 });
    }
    this.appraiserWeightageTotal = 100;
  }

  getDisplayedColumns(): string[] {
    var formData = this.groupForm.value;
    this.displayedColumnsEvaluation = ['sNo', 'perObj', 'devObj', 'competency', 'companyPara'];
    if (formData.objective) {
      if (this.objectiveType.developmentObjective == false) {
        var index = this.displayedColumnsEvaluation.findIndex(record => record == 'devObj');
        if (index != -1)
          this.displayedColumnsEvaluation.splice(index, 1);
      }
      if (this.objectiveType.performanceObjective == false) {
        var index = this.displayedColumnsEvaluation.findIndex(record => record == 'perObj');
        if (index != -1)
          this.displayedColumnsEvaluation.splice(1, 1);
      }
    }
    else {
      var index1 = this.displayedColumnsEvaluation.findIndex(record => record == 'devObj');
      if (index1 != -1)
        this.displayedColumnsEvaluation.splice(index1, 1);
      var index2 = this.displayedColumnsEvaluation.findIndex(record => record == 'perObj');
      if (index2 != -1)
        this.displayedColumnsEvaluation.splice(index2, 1);
    }
    if (formData.companyParameter == false) {
      var index = this.displayedColumnsEvaluation.findIndex(record => record == 'companyPara');
      if (index != -1)
        this.displayedColumnsEvaluation.splice(index, 1);
    }
    if (formData.competencyParameter == false) {
      var index = this.displayedColumnsEvaluation.findIndex(record => record == 'competency');
      if (index2 != -1)
        this.displayedColumnsEvaluation.splice(index, 1);
    }
    return this.displayedColumnsEvaluation;
  }

  errorCheckingWeightage(ch) {
    let val1, val2, val3;
    if(this.groupForm.value.appraiser==1)
    {

    }
    else if(this.groupForm.value.appraiser==2)
    {
      let total=100-this.groupForm.value.appraiser1weightage;
      this.groupForm.patchValue({appraiser2weightage:total})
    }
    else if(this.groupForm.value.appraiser==3 && ch=='appraiser1weightage')
    {
      let total=100-(this.groupForm.value.appraiser1weightage + this.groupForm.value.appraiser3weightage);
      this.groupForm.patchValue({appraiser2weightage:total})
    }
    else if(this.groupForm.value.appraiser==3 && ch=='appraiser2weightage')
    {
      let total=100-(this.groupForm.value.appraiser1weightage + this.groupForm.value.appraiser2weightage);
      this.groupForm.patchValue({appraiser3weightage:total})
    }
    val1 = this.groupForm.value.appraiser1weightage || 0;
    val2 = this.groupForm.value.appraiser2weightage || 0;
    val3 = this.groupForm.value.appraiser3weightage || 0;
    this.appraiserWeightageTotal = val3 + val1 + val2;
    // if (sum > 100) {
    //   this.pasonaService.infoMessage('Total Appraiser Weightage should be equal to 100');
    //   this.groupForm.get(ch).patchValue('', { emitModelToViewChange: true });
    // }
  }

  errorCheckingWeightageEvaluationResult(ch)
  {
    let val1, val2, val3;
    val1 = this.evaluationResult.performanceRatingWeightage || 0;
    val2 = this.evaluationResult.companyParameterWeightage || 0;
    val3 = this.evaluationResult.competencyRatingWeightage || 0;
    this.evaluationResult.total = val3 + val1 + val2;
  }
  evaluationResultOptionChange(ch,ev)
  {
    if(ch=='per')
    {
      this.evaluationResult.total-= this.evaluationResult.performanceRatingWeightage;
      this.evaluationResult.performanceRatingWeightage=0;
    }
    else if(ch=='com')
    {
      this.evaluationResult.total-= this.evaluationResult.companyParameterWeightage;
      this.evaluationResult.companyParameterWeightage=0;
    }
    else if(ch=='compe')
    {
      this.evaluationResult.total-= this.evaluationResult.competencyRatingWeightage;
      this.evaluationResult.competencyRatingWeightage=0;
    }
    else if(ch=='one')
    {
      if(ev.checked)
      {
        if(this.groupForm.value.competencyParameter){this.evaluationResult.competencyRating=true};
        if(this.groupForm.value.companyParameter){this.evaluationResult.companyParameter=true}
        if(this.groupForm.value.objective){this.evaluationResult.performanceRating=true}
      }
      else
      {
        this.evaluationResult.competencyRating=false;
        this.evaluationResult.companyParameter=false;
       // this.evaluationResult.performanceRating=false;
       this.evaluationResult.total=0;
       this.evaluationResult.performanceRatingWeightage=0;
       this.evaluationResult.companyParameterWeightage=0;
       this.evaluationResult.competencyRatingWeightage=0;
      }
    }
  }

  objectiveTypeChange(event, ch) {
    if (!event.checked) {
      if (ch == 1) {
        this.evaluationOptionData[0].performanceObj = false;
        this.evaluationOptionData[1].performanceObj = false;
        this.evaluationOptionData[0].totalWeightage-=this.evaluationOptionData[0].performanceObjWeightage;
        this.evaluationOptionData[1].totalWeightage-=this.evaluationOptionData[1].performanceObjWeightage;
        this.evaluationOptionData[0].performanceObjWeightage = 0;
        this.evaluationOptionData[1].performanceObjWeightage = 0;
      }
      else {
        this.evaluationOptionData[0].developmentObj = false;
        this.evaluationOptionData[1].developmentObj = false;
        this.evaluationOptionData[0].totalWeightage-=this.evaluationOptionData[0].developmentObjWeightage;
        this.evaluationOptionData[1].totalWeightage-=this.evaluationOptionData[1].developmentObjWeightage;
        this.evaluationOptionData[0].developmentObjWeightage = 0;
        this.evaluationOptionData[1].developmentObjWeightage = 0;
      }
    }
    if(this.objectiveType.developmentObjective==false && this.objectiveType.performanceObjective==false)
    {
      let data ={event:false};
      this.objectiveChange(data);
      this.groupForm.patchValue({objective:false});
    }
  }

  midtermChange(event) {
    if (event.checked) {
      this.evaluationOptionData[0].show = true;
    }
    else {
      this.activatedStep = 1;
      this.evaluationOptionData[0].performanceObj = false;
      this.evaluationOptionData[0].developmentObj = false;
      this.evaluationOptionData[0].competencyPara = false;
      this.evaluationOptionData[0].companyPara = false;
      this.evaluationOptionData[0].performanceObjWeightage = 0;
      this.evaluationOptionData[0].developmentObjWeightage = 0;
      this.evaluationOptionData[0].competencyParaWeightage = 0;
      this.evaluationOptionData[0].companyParaWeightage = 0;
      this.evaluationOptionData[0].show = false;
      this.evaluationOptionData[0].totalWeightage = 0;
      this.termType.totalWeightage = 100;
      this.termType.midtermWeightage = 0;
      this.termType.endtermWeightage = 100;
    }

  }
  errorCheckingWeightageEvalution(ch, ind) {
    let sum = this.evaluationOptionData[ind].performanceObjWeightage + this.evaluationOptionData[ind].developmentObjWeightage + this.evaluationOptionData[ind].competencyParaWeightage + this.evaluationOptionData[ind].companyParaWeightage;
    // if(sum>100)
    // {
    //   console.log(this.evaluationOptionData[ind][ch])
    //   setTimeout(() => {
    //     this.evaluationOptionData[ind][ch]=0;
    //   }, 1000);

    //   console.log(this.evaluationOptionData[ind][ch])
    //   this.pasonaService.infoMessage('Total Weightage should be equal to 100');

    // }
    //       else
    // {
    this.evaluationOptionData[ind].totalWeightage = sum;
    //}

  }

  // termType={midterm:true,midtermWeightage:50,endterm:true,endtermWeightage:50,totalWeightage:100};
  totalWeightageCountTerm() {
    this.termType.totalWeightage = this.termType.midtermWeightage + this.termType.endtermWeightage;
  }
}

