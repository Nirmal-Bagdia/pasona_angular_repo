import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { map } from 'rxjs/operators';
import { MessageDialogComponent } from 'app/dialog/message-dialog/message-dialog.component';
import { NotesDialogComponent } from 'app/dialog/notes-dialog/notes-dialog.component';
import { SendAlertComponent } from 'app/dialog/send-alert/send-alert.component';
import { CommentRatingDialogComponent } from 'app/dialog/comment-rating-dialog/comment-rating-dialog.component';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-edit-goals',
  templateUrl: './edit-goals.component.html',
  styleUrls: ['./edit-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditGoalsComponent implements OnInit {
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
  weightage: any[];
  empId: number;
  goalsData: any = {};
  objectiveList: any[];
  urlCurrent: string;
  appraiserView: boolean;
  type: number;
  action: any = { editIds: [], deleteIds: [], addPermission: false };
  editArr: any[];
  deleteArr: any[];
  showRating: boolean;
  showRatingEndTerm: boolean;
  stateName: any;
  groupConfig: any;
  defaultCompetency: boolean;
  ratingData: any[];
  configMidTermAppraiser: any;
  configEndTermAppraiser: any;
  configMidTermAppraisee: any;
  configEndTermAppraisee: any;
  appraisalPlanId: number;
  endtermDiv1Ele: number = 1;
  endtermDiv2Ele: number = 1;
  endtermDiv3Ele: number = 1;
  endtermDiv4Ele: number = 1;
  midtermDiv1Ele: number = 1;
  midtermDiv2Ele: number = 1;
  midtermDiv3Ele: number = 1;
  midtermDiv4Ele: number = 1;
  @ViewChild('endtermDiv1', { static: false }) endtermDiv1: ElementRef;
  @ViewChild('endtermDiv2', { static: false }) endtermDiv2: ElementRef;
  @ViewChild('endtermDiv3', { static: false }) endtermDiv3: ElementRef;
  @ViewChild('endtermDiv4', { static: false }) endtermDiv4: ElementRef;
  @ViewChild('midtermDiv1', { static: false }) midtermDiv1: ElementRef;
  @ViewChild('midtermDiv2', { static: false }) midtermDiv2: ElementRef;
  @ViewChild('midtermDiv3', { static: false }) midtermDiv3: ElementRef;
  @ViewChild('midtermDiv4', { static: false }) midtermDiv4: ElementRef;
  objective: boolean = true;
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, private dialog: MatDialog, public router: Router, private route: ActivatedRoute
  ) {
    this.configMidTermAppraiser = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    this.configEndTermAppraiser = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    this.configMidTermAppraisee = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    this.configEndTermAppraisee = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    this.stateName = this.pasonaService.getStateData();
    this.showRating = false;
    this.showRatingEndTerm = false;
    this.objectiveList = [];
    this.editArr = [];
    this.deleteArr = [];
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.removeIds = [];
    this.appraiserView = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['ids'];
      this.empId = +params['id'];
      this.appraisalPlanId = +params['appId'];
      this.getGoalsDataById();
    });
    // console.log("this.appraisalPlanId",this.appraisalPlanId);

    if (!this.appraisalPlanId) {
      this.appraisalPlanId = this.empId;
    }
    // console.log("this.appraisalPlanId",this.appraisalPlanId);
    const url = this.router.url.toString();
    url.search('myAppraisees')
    this.type = url.search('myAppraisees');
    // console.log("urllll", url, url.search('myAppraisees'));

    this.userData = this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrent = "company";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "unit";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "employee";
      if (this.type == -1) {
        this.appraiserView = false;
      }
      else {
        this.appraiserView = true;

      }
    }


    // console.log("id", this.id);
    this.goalsForm = this.fb.group({
      companyId: [this.userData.companyId],
      appraiseeId: [],
      appraiserId: [this.userData.empCode],
      appraisalPlanId: [this.appraisalPlanId],
      objectiveId: [],
      midTermTrainingNeeds: [''],
      midTermOverallComments: [''],
      endTermTrainingNeeds: [''],
      endTermOverallComments: [''],
      objectiveList: this.fb.array([this.getobjData()]),
      defaultCompetencyParameterWeightage: this.fb.array([]),
      competencyParameterWeightage: this.fb.array([]),
      companyParameterWeightage: this.fb.array([])
    });

  }

  get objectiveLists() {
    return this.goalsForm.get('objectiveList') as FormArray;
  }

  getobjData(): FormGroup {
    return this.fb.group({ midTermEvaluationId: ['',], companyId: ['',], appraiseeId: ['',], appraiserId: ['',], objectiveId: ['',], subObjectiveId: ['',], appraisalPlanId: [''], midTermAppraiserRating: ['',], midTermAppraiserComment: ['',], endTermAppraiserRating: ['',], endTermAppraiserComment: ['',] })
    //return this.fb.group({ midTermEvaluationId: ['',], objectiveId: ['',], subObjectiveId: ['',], midTermAppraiserRating: ['', ], midTermAppraiserComment: ['',] })
  }

  addObjective() {
    this.objectiveLists.push(this.getobjData());
  }

  deleteObjective(index, id) {
    if (id) {
      this.removeIds.push(id);
    }
    this.objectiveLists.removeAt(index);
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
  }

  get f() { return this.goalsForm.controls; };

  saveRating() {
    // console.log("form", this.goalsForm.value, this.goalsForm.valid);
    if (this.goalsForm.valid) {
      this.pasonaService.startSpinner();

      let objectiveList = this.pasonaService.setEncryptArray(this.goalsForm.value.objectiveList, ['midTermAppraiserComment', 'endTermAppraiserComment']);

      let defaultCompetencyParameterWeightage = [...this.goalsForm.value.defaultCompetencyParameterWeightage];
      defaultCompetencyParameterWeightage.forEach((element, i) => {
        defaultCompetencyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(defaultCompetencyParameterWeightage[i].parameters, ['midTermAppraiserComment', 'endTermAppraiserComment']);
      });

      let competencyParameterWeightage = [...this.goalsForm.value.competencyParameterWeightage];
      competencyParameterWeightage.forEach((element, i) => {
        competencyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(competencyParameterWeightage[i].parameters, ['midTermAppraiserComment', 'endTermAppraiserComment']);
      });

      let companyParameterWeightage = [...this.goalsForm.value.companyParameterWeightage];
      companyParameterWeightage.forEach((element, i) => {
        companyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(companyParameterWeightage[i].parameters, ['midTermAppraiserComment', 'endTermAppraiserComment']);
      });

      var data = {
        objectiveList: objectiveList,
        companyId: this.goalsForm.value.companyId,
        appraiseeId: this.goalsForm.value.appraiseeId,
        appraiserId: this.goalsForm.value.appraiserId,
        appraisalPlanId: this.goalsForm.value.appraisalPlanId,
        midTermTrainingNeeds: this.pasonaService.setEncrypt(this.goalsForm.value.midTermTrainingNeeds),
        midTermOverallComments: this.pasonaService.setEncrypt(this.goalsForm.value.midTermOverallComments),
        objectiveId: this.goalsForm.value.objectiveId,
        defaultCompetencyParameterWeightage: defaultCompetencyParameterWeightage,
        competencyParameterWeightage: competencyParameterWeightage,
        companyParameterWeightage: companyParameterWeightage
      }
      this.pasonaService.saveRatingAppraiser(data).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          //  this.router.navigate(['/employee/goals']);
        }
        else {
          this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.goalsForm.markAllAsTouched();
      let err = '';
      if (this.goalsForm.controls['objectiveList'].invalid)
        err = 'objective';
      else if (this.goalsForm.controls['defaultCompetencyParameterWeightage'].invalid)
        err = 'default competency';
      else if (this.goalsForm.controls['competencyParameterWeightage'].invalid)
        err = 'competency';
      else if (this.goalsForm.controls['companyParameterWeightage'].invalid)
        err = 'company parameter';
      this.pasonaService.infoMessage(`Please complete appraisal review/comment for ${err}!`);
    }
  }


  saveRatingEndTerm() {
    // console.log("form", this.goalsForm.value, this.goalsForm.valid);
    if (this.goalsForm.valid) {
      this.pasonaService.startSpinner();

      let objectiveList = this.pasonaService.setEncryptArray(this.goalsForm.value.objectiveList, ['midTermAppraiserComment', 'endTermAppraiserComment']);

      let defaultCompetencyParameterWeightage = [...this.goalsForm.value.defaultCompetencyParameterWeightage];
      defaultCompetencyParameterWeightage.forEach((element, i) => {
        defaultCompetencyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(defaultCompetencyParameterWeightage[i].parameters, ['midTermAppraiserComment', 'endTermAppraiserComment']);
      });

      let competencyParameterWeightage = [...this.goalsForm.value.competencyParameterWeightage];
      competencyParameterWeightage.forEach((element, i) => {
        competencyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(competencyParameterWeightage[i].parameters, ['midTermAppraiserComment', 'endTermAppraiserComment']);
      });

      let companyParameterWeightage = [...this.goalsForm.value.companyParameterWeightage];
      companyParameterWeightage.forEach((element, i) => {
        companyParameterWeightage[i].parameters = this.pasonaService.setEncryptArray(companyParameterWeightage[i].parameters, ['midTermAppraiserComment', 'endTermAppraiserComment']);
      });

      var data = {
        objectiveList: objectiveList,
        companyId: this.goalsForm.value.companyId,
        appraiseeId: this.goalsForm.value.appraiseeId,
        appraiserId: this.goalsForm.value.appraiserId,
        appraisalPlanId: this.goalsForm.value.appraisalPlanId,
        midTermTrainingNeeds: this.pasonaService.setEncrypt(this.goalsForm.value.midTermTrainingNeeds),
        midTermOverallComments: this.pasonaService.setEncrypt(this.goalsForm.value.midTermOverallComments),
        endTermTrainingNeeds: this.pasonaService.setEncrypt(this.goalsForm.value.endTermTrainingNeeds),
        endTermOverallComments: this.pasonaService.setEncrypt(this.goalsForm.value.endTermOverallComments),
        objectiveId: this.goalsForm.value.objectiveId,
        defaultCompetencyParameterWeightage: defaultCompetencyParameterWeightage,
        competencyParameterWeightage: competencyParameterWeightage,
        companyParameterWeightage: companyParameterWeightage
      }
      this.pasonaService.saveRatingAppraiserEndterm(data).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          //  this.router.navigate(['/employee/goals']);
        }
        else {
          this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.goalsForm.markAllAsTouched();
      let err = '';
      if (this.goalsForm.controls['objectiveList'].invalid)
        err = 'objective';
      else if (this.goalsForm.controls['defaultCompetencyParameterWeightage'].invalid)
        err = 'default competency';
      else if (this.goalsForm.controls['competencyParameterWeightage'].invalid)
        err = 'competency';
      else if (this.goalsForm.controls['companyParameterWeightage'].invalid)
        err = 'company parameter';
      this.pasonaService.infoMessage(`Please complete appraisal review/comment for ${err}!`);
    }
  }

  getAppraiserRatingEndTerm() {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.goalsData.appraisalPlanId,
      objectiveId: this.goalsData.empObjId,
      appraiserId: this.userData.empCode
    }
    this.pasonaService.getRatingAppraiserEndTerm(data).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.showRatingEndTerm = true;
        var goalData = dataRes.midTermEvaluationDetails;
        goalData.endTermTrainingNeeds = this.pasonaService.getDecrypt(goalData.endTermTrainingNeeds);
        goalData.endTermOverallComments = this.pasonaService.getDecrypt(goalData.endTermOverallComments);
        this.goalsForm.patchValue({ endTermTrainingNeeds: goalData.endTermTrainingNeeds, endTermOverallComments: goalData.endTermOverallComments })
        if (goalData.companyParameterWeightage)
          this.setParametersAfterAppaiserRatingEndTerm(goalData.companyParameterWeightage, 'companyParameterWeightage');
        if (goalData.competencyParameterWeightage)
          this.setParametersAfterAppaiserRatingEndTerm(goalData.competencyParameterWeightage, 'competencyParameterWeightage');
        if (goalData.defaultCompetencyParameterWeightage)
          this.setParametersAfterAppaiserRatingEndTerm(goalData.defaultCompetencyParameterWeightage, 'defaultCompetencyParameterWeightage')
        if (goalData.objectiveList)
          goalData.objectiveList = this.pasonaService.getdecryptArray(goalData.objectiveList, ['midTermAppraiserComment', 'endTermAppraiserComment']);
        //  console.log("this.objectiveLists",this.objectiveLists)
        for (var i = 0; i < this.objectiveList.length; i++) {
          this.objectiveLists.at(i).get('endTermAppraiserRating').patchValue(goalData.objectiveList[i].endTermAppraiserRating || '');
          this.objectiveLists.at(i).get('endTermAppraiserComment').patchValue(goalData.objectiveList[i].endTermAppraiserComment || '');
          // this.objectiveLists.at(i).get('endTermEvaluationId').patchValue(goalData.objectiveList[i].endTermEvaluationId || '');
        }
      }
      else {
        //this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  getAppraiserRating() {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.goalsData.appraisalPlanId,
      objectiveId: this.goalsData.empObjId,
      appraiserId: this.userData.empCode
    }
    this.pasonaService.getRatingAppraiser(data).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.showRating = true;
        var goalData = dataRes.midTermEvaluationDetails;
        goalData.midTermTrainingNeeds = this.pasonaService.getDecrypt(goalData.midTermTrainingNeeds);
        goalData.midTermOverallComments = this.pasonaService.getDecrypt(goalData.midTermOverallComments);
        this.goalsForm.patchValue({ midTermTrainingNeeds: goalData.midTermTrainingNeeds, midTermOverallComments: goalData.midTermOverallComments })
        if (goalData.companyParameterWeightage)
          this.setParametersAfterAppaiserRating(goalData.companyParameterWeightage, 'companyParameterWeightage');
        if (goalData.competencyParameterWeightage)
          this.setParametersAfterAppaiserRating(goalData.competencyParameterWeightage, 'competencyParameterWeightage');
        if (goalData.defaultCompetencyParameterWeightage)
          this.setParametersAfterAppaiserRating(goalData.defaultCompetencyParameterWeightage, 'defaultCompetencyParameterWeightage')
        if (goalData.objectiveList)
          goalData.objectiveList = this.pasonaService.getdecryptArray(goalData.objectiveList, ['midTermAppraiserComment', 'endTermAppraiserComment']);
        //  console.log("this.objectiveLists",this.objectiveLists)
        for (var i = 0; i < this.objectiveList.length; i++) {
          this.objectiveLists.at(i).get('midTermAppraiserRating').patchValue(goalData.objectiveList[i].midTermAppraiserRating || '');
          this.objectiveLists.at(i).get('midTermAppraiserComment').patchValue(goalData.objectiveList[i].midTermAppraiserComment || '');
          this.objectiveLists.at(i).get('midTermEvaluationId').patchValue(goalData.objectiveList[i].midTermEvaluationId || '');
        }
      }
      else {
        //this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
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

  setParametersAfterAppaiserRating(data, ch) {
    let control = <FormArray>this.goalsForm.controls[ch];
    data.forEach((x, index) => {
      let parameter = <FormArray>control.at(index).get('parameters');
      x.parameters.forEach((y, j) => {
        parameter.at(j).patchValue({ midTermAppraiserRating: y.midTermAppraiserRating || '' });
        parameter.at(j).patchValue({ midTermAppraiserComment: this.pasonaService.getDecrypt(y.midTermAppraiserComment) || '' });
      })
    })
  }

  setParametersAfterAppaiserRatingEndTerm(data, ch) {
    let control = <FormArray>this.goalsForm.controls[ch];
    data.forEach((x, index) => {
      let parameter = <FormArray>control.at(index).get('parameters');
      x.parameters.forEach((y, j) => {
        parameter.at(j).patchValue({ endTermAppraiserRating: y.endTermAppraiserRating || '' });
        parameter.at(j).patchValue({ endTermAppraiserComment: this.pasonaService.getDecrypt(y.endTermAppraiserComment) || '' });
      })
    })
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
    // console.log(fromMonth, toMonth, toYear, fromYear);
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
      fromYear: formData.fromYear.toString(),
      toMonth: formData.toMonth,
      toYear: formData.toYear.toString(),
      objectiveType: formData.objectiveType,
      empObjId: formData.empObjId
    });
  }
  patchObjective(formData) {
    for (var i = 1; i < formData.objectiveList.length; i++) {
      if (formData.objectiveList.length != i && this.goalsForm.value.objectiveList.length != formData.objectiveList.length) {
        this.addObjective();
      }
    }
    this.goalsForm.patchValue({ appraiseeId: formData.empId, objectiveId: formData.empObjId });
    for (var i = 0; i < formData.objectiveList.length; i++) {
      this.objectiveLists.at(i).get('midTermEvaluationId').patchValue('');
      this.objectiveLists.at(i).get('companyId').patchValue(formData.companyId);
      this.objectiveLists.at(i).get('appraiseeId').patchValue(formData.empId);
      this.objectiveLists.at(i).get('appraiserId').patchValue(this.userData.empCode);
      this.objectiveLists.at(i).get('objectiveId').patchValue(formData.empObjId);
      this.objectiveLists.at(i).get('subObjectiveId').patchValue(formData.objectiveList[i].id);
      this.objectiveLists.at(i).get('appraisalPlanId').patchValue(formData.appraisalPlanId);
      // this.objectiveLists.at(i).get('midTermAppraiserRating').patchValue('');
      //this.objectiveLists.at(i).get('midTermAppraiserComment').patchValue('');

    }
    // this.markGroupDirty(this.goalsForm);
    //this.goalsForm.markAsPristine();
    if (this.goalsData.midTermProcessStatus == 1)
      this.getAppraiserRating();
    if (this.goalsData.endTermProcessStatus == 1)
      this.getAppraiserRatingEndTerm();
  }

  getGoalsDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGoalsByIdEmp(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var goalData = dataRes.departmentDetails;
        goalData.summary = this.pasonaService.getDecrypt(goalData.summary);
        goalData.objectiveList = this.pasonaService.getdecryptArray(goalData.objectiveList, ['objective', 'measurementCriteria', 'midTermActionsTaken', 'midTermResultsAchieved', 'endTermActionsTaken', 'endTermResultsAchieved']);
        this.goalsData = goalData;

        this.objectiveList = goalData.objectiveList;
        this.getGroupConfigForObjective(1);
        if (this.goalsData.defaultCompetencyParameterWeightage) {
          this.defaultCompetency = true;
          let parameters = this.pasonaService.getdecryptArray(goalData.defaultCompetencyParameterWeightage[0].parameters, ['parameterName']);
          goalData.defaultCompetencyParameterWeightage[0].parameters = parameters;
          this.setCompetency(goalData.defaultCompetencyParameterWeightage[0], 'defaultCompetencyParameterWeightage');
        }

        if (this.goalsData.midTermProcessStatus == 1) {
          this.getRatingTypeById();
          this.patchObjective(goalData);
        }
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  errorCheckingWeightage(index) {
    var sum = 0;
    for (var i = 0; i < this.objectiveLists.length; i++) {
      sum += this.objectiveLists.at(i).get('weightage').value;
      if (sum > 100) {
        this.pasonaService.openSnackBar('Weightage should be less or equal to 100');
        this.objectiveLists.at(i).get('weightage').patchValue('', { emitModelToViewChange: true });
      }
    }
  }

  backToGoals() {
    if (this.urlCurrent != "employee") {

      this.router.navigate([`/${this.urlCurrent}/employees`, this.appraisalPlanId, 'empGoals', this.empId]);
    }
    else {
      if (this.type == -1)
        this.router.navigate([`/${this.urlCurrent}/empGoals`, this.appraisalPlanId]);
      else
        this.router.navigate([`/${this.urlCurrent}/myAppraisees`, this.appraisalPlanId]);

    }

  }

  sendMessagePopUp(val, msg, id, objId, ch) {
    const dialogAp = this.dialog.open(SendAlertComponent, {
      width: '600px',
      disableClose: true,
      data: { data: val, id: id, pType: msg, objId: objId, choice: ch }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        // this.getAllAppraisalPlanData();
      }
    });
  }


  AcceptRevisePopUP(type, empid, empObjId, name, midTerm, action, isObjFirst, isMidtermFist, endterm, isEndtermFist) {
    if ((this.goalsData.midTermProcessStatus == 1 && this.goalsForm.valid) || this.goalsData.midTermProcessStatus == 0) {
      var param = {
        midTermRating: []
      }
      if (this.goalsData.midTermProcessStatus == 1 && this.goalsData.endTermProcessStatus == 0) {
        if (this.goalsForm.touched)
          this.saveRating();
      }
      if (this.goalsData.endTermProcessStatus == 1) {
        if (this.goalsForm.touched)
          this.saveRatingEndTerm();
      }
      name = this.pasonaService.getDecrypt(name);
      console.log("param.midTermRating", param.midTermRating);
      const dialogAp = this.dialog.open(MessageDialogComponent, {
        width: '600px',
        disableClose: true,
        data: { type: type, id: empid, empObjId: empObjId, message: `Do you want to accept ${name} objective ?`, midTerm: midTerm, action: action, isObjFirst: isObjFirst, isMidtermFist: isMidtermFist, midTermRating: param.midTermRating, appraisalPlanId: this.appraisalPlanId, endTermProcessStatus: endterm, isEndtermFist: isEndtermFist }
      });

      dialogAp.afterClosed().subscribe(result => {
        // console.log('The dialog for Pasona delete was closed', result);
        if (result) {
          if (type == 'accept') {
            this.appraiserView = true;
            this.goalsData.assignedTo = 1;
            this.showRating = true;
            this.showRatingEndTerm = true;
          }
          else {
            this.goalsData.reviseStatus = 1;
          }
          // this.getAllAppraisalPlanData();
        }
      });
    }
    else {
      this.goalsForm.markAllAsTouched();
      //this.pasonaService.infoMessage('Something went wrong please check your forms!');
      let err = '';
      if (this.goalsForm.controls['objectiveList'].invalid)
        err = 'objective';
      else if (this.goalsForm.controls['defaultCompetencyParameterWeightage'].invalid)
        err = 'default competency';
      else if (this.goalsForm.controls['competencyParameterWeightage'].invalid)
        err = 'competency';
      else if (this.goalsForm.controls['companyParameterWeightage'].invalid)
        err = 'company parameter';
      this.pasonaService.infoMessage(`Please complete appraisal review/comment for ${err}!`);
    }
  }

  notesPopUp(empId, empObjId, ch) {
    const dialogAp = this.dialog.open(NotesDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { type: ch, empObjId: empObjId, empId: empId }
    });

    dialogAp.afterClosed().subscribe(result => {
      // console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        // this.getAllAppraisalPlanData();
      }
    });
  }

  viewCommentAndRating(subObjectiveId, empObjId, type) {
    const dialogAp = this.dialog.open(CommentRatingDialogComponent, {
      width: '70vw',
      disableClose: true,
      data: { type: type, empObjId: empObjId, subObjectiveId: subObjectiveId, appraisalPlanId: this.goalsData.appraisalPlanId, empId: this.goalsData.empId, appraiserId: this.goalsData.assignedTo }
    });

    dialogAp.afterClosed().subscribe(result => {
      // console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        // this.getAllAppraisalPlanData();
      }
    });
  }

  editPermissin(id, event, ind) {
    this.editArr[ind] = 1;
    if (event.checked == true) {
      this.action.editIds.push(id);
    }
    else {
      var indexVal = this.action.editIds.findIndex(record => record == id)
      this.action.editIds.splice(indexVal, 1);
      this.editArr[ind] = null;
    }
  }

  deletePermissin(id, event, ind) {
    this.deleteArr[ind] = 1;
    if (event.checked == true) {
      this.action.deleteIds.push(id);
    }
    else {
      var indexVal = this.action.deleteIds.findIndex(record => record == id)
      this.action.deleteIds.splice(indexVal, 1);
      this.deleteArr[ind] = null;
    }
  }

  addPermission(event) {
    if (event.checked == true) {
      this.action.addPermission = true;
    }
    else {
      this.action.addPermission = false;
    }
  }

  arrayOne(n: number): any[] {
    return Array(n);
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
        midTermAppraiserRating: y.midTermAppraiserRating || '',
        midTermAppraiserComment: this.pasonaService.getDecrypt(y.midTermAppraiserComment) || '',
        endTermAppraiserComment: this.pasonaService.getDecrypt(y.endTermAppraiserComment) || '',
        endTermAppraiserRating: y.endTermAppraiserRating || ''
      }))
    })
    return arr;
  }

  getGroupConfigForObjective(ch) {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGroupConfigForObjective(this.goalsData.groupId).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.groupConfig = dataRes.groupDetails;
        if (!this.groupConfig.objective) {
          this.objective = false;
          this.objectiveLists.removeAt(0);
        }

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

        if (this.goalsData.companyParameterWeightage && ch == 1) {
          this.setParametersAfterRating(this.goalsData.companyParameterWeightage, 'companyParameterWeightage');
          /* for (var i=0;i<this.goalsData.companyParameterWeightage.length;i++)
          {
            let parameters=this.pasonaService.getdecryptArray(this.goalsData.companyParameterWeightage[i].parameters,['parameterName']);
            this.groupConfig.companyParameterWeightage[i].parameters=parameters;
            this.setCompetency(this.goalsData.companyParameterWeightage[i],'companyParameterWeightage');
          } */
        }

        if (this.goalsData.competencyParameterWeightage && ch == 1) {
          this.setParametersAfterRating(this.goalsData.competencyParameterWeightage, 'competencyParameterWeightage');
          /* for (var i=0;i<this.goalsData.competencyParameterWeightage.length;i++)
          {
            let parameters=this.pasonaService.getdecryptArray(this.goalsData.competencyParameterWeightage[i].parameters,['parameterName']);
            this.goalsData.competencyParameterWeightage[i].parameters=parameters;
            this.setCompetency(this.goalsData.competencyParameterWeightage[i],'competencyParameterWeightage');
          } */
        }
        this.configurationSet();
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  configurationSet() {
    let appraiser = '';
    if (this.goalsData.appraiser1 == this.userData.empCode) {
      appraiser = 'appraiser1';
    }
    else if (this.goalsData.appraiser2 == this.userData.empCode) {
      appraiser = 'appraiser2';
    }
    else if (this.goalsData.appraiser3 == this.userData.empCode) {
      appraiser = 'appraiser3';
    }
    if (this.goalsData.midTermProcessStatus == 1) {
      // console.log( this.groupConfig.midtermConfigurarion[0][appraiser]);

      this.configMidTermAppraiser.objectiveComment = this.groupConfig.midtermConfigurarion[0][appraiser];
      this.configMidTermAppraiser.objectiveRating = this.groupConfig.midtermConfigurarion[1][appraiser];

      this.configMidTermAppraiser.defaultCompetencyComment = this.groupConfig.midtermConfigurarion[2][appraiser];
      this.configMidTermAppraiser.defaultCompetencyRating = this.groupConfig.midtermConfigurarion[3][appraiser];

      this.configMidTermAppraiser.competencyComment = this.groupConfig.midtermConfigurarion[2][appraiser];
      this.configMidTermAppraiser.competencyRating = this.groupConfig.midtermConfigurarion[3][appraiser];

      this.configMidTermAppraiser.companyComment = this.groupConfig.midtermConfigurarion[4][appraiser];
      this.configMidTermAppraiser.companyRating = this.groupConfig.midtermConfigurarion[5][appraiser];

      this.configMidTermAppraiser.overallComments = this.groupConfig.midtermConfigurarion[6][appraiser];
      this.configMidTermAppraiser.trainingNeeds = this.groupConfig.midtermConfigurarion[7][appraiser];

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
      if (this.goalsData.endTermProcessStatus == 0)
        this.validateRatingAndComment('midTerm', 'configMidTermAppraiser');
    }

    if (this.goalsData.endTermProcessStatus == 1) {

      this.configEndTermAppraiser.objectiveComment = this.groupConfig.endtermConfiguration[0][appraiser];
      this.configEndTermAppraiser.objectiveRating = this.groupConfig.endtermConfiguration[1][appraiser];

      this.configEndTermAppraiser.defaultCompetencyComment = this.groupConfig.endtermConfiguration[2][appraiser];
      this.configEndTermAppraiser.defaultCompetencyRating = this.groupConfig.endtermConfiguration[3][appraiser];

      this.configEndTermAppraiser.competencyComment = this.groupConfig.endtermConfiguration[2][appraiser];
      this.configEndTermAppraiser.competencyRating = this.groupConfig.endtermConfiguration[3][appraiser];

      this.configEndTermAppraiser.companyComment = this.groupConfig.endtermConfiguration[4][appraiser];
      this.configEndTermAppraiser.companyRating = this.groupConfig.endtermConfiguration[5][appraiser];

      this.configEndTermAppraiser.overallComments = this.groupConfig.endtermConfiguration[6][appraiser];
      this.configEndTermAppraiser.trainingNeeds = this.groupConfig.endtermConfiguration[7][appraiser];

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
      this.validateRatingAndComment('endTerm', 'configEndTermAppraiser');
      console.log('+++++++++++++++++++++++++');
      console.log('configEndTermAppraisee');
      console.log(this.configEndTermAppraisee);
      console.log('this.groupConfig');
      console.log(this.groupConfig);
    }
    this.endtermHideShow();
  }

  validateRatingAndComment(term, configterm) {
    //this.configMidTermAppraisee = { objectiveRating: false, objectiveComment: false, competencyRating: false, competencyComment: false, defaultCompetencyRating: false, defaultCompetencyComment: false, companyRating: false, companyComment: false, overallComments: false, trainingNeeds: false };
    if (this.goalsData.midTermProcessStatus == 1 || this.goalsData.endTermProcessStatus == 1) {
      if (this[`${configterm}`].objectiveRating || this[`${configterm}`].objectiveComment) {
        for (var i = 0; i < this.objectiveLists.length; i++) {
          if (this[`${configterm}`].objectiveRating) {
            this.objectiveLists.at(i).get(`${term}AppraiserRating`).setValidators([Validators.required]);
            this.objectiveLists.at(i).get(`${term}AppraiserRating`).updateValueAndValidity();
          }
          if (this[`${configterm}`].objectiveComment) {
            this.objectiveLists.at(i).get(`${term}AppraiserComment`).setValidators([Validators.required, Validators.maxLength(500)]);
            this.objectiveLists.at(i).get(`${term}AppraiserComment`).updateValueAndValidity();
          }
        }
      }
      if (this[`${configterm}`].competencyRating || this[`${configterm}`].competencyComment) {
        let defaultCompetencyControl = <FormArray>this.goalsForm.controls.defaultCompetencyParameterWeightage;
        // console.log("this.compe default",defaultCompetencyControl);
        for (var i = 0; i < defaultCompetencyControl.length; i++) {
          let parameters = <FormArray>defaultCompetencyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this[`${configterm}`].defaultCompetencyRating) {
              parameters.at(j).get(`${term}AppraiserRating`).setValidators([Validators.required]);
              parameters.at(j).get(`${term}AppraiserRating`).updateValueAndValidity();
            } if (this[`${configterm}`].defaultCompetencyComment) {
              parameters.at(j).get(`${term}AppraiserComment`).setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get(`${term}AppraiserComment`).updateValueAndValidity();
            }
          }
        }
      }

      if (this[`${configterm}`].competencyRating || this[`${configterm}`].competencyComment) {
        let competencyControl = <FormArray>this.goalsForm.controls.competencyParameterWeightage;
        for (var i = 0; i < competencyControl.length; i++) {
          let parameters = <FormArray>competencyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this[`${configterm}`].competencyRating) {
              parameters.at(j).get(`${term}AppraiserRating`).setValidators([Validators.required]);
              parameters.at(j).get(`${term}AppraiserRating`).updateValueAndValidity();
            } if (this[`${configterm}`].competencyComment) {
              parameters.at(j).get(`${term}AppraiserComment`).setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get(`${term}AppraiserComment`).updateValueAndValidity();
            }
          }
        }
      }

      if (this[`${configterm}`].companyRating || this[`${configterm}`].companyComment) {
        let companyControl = <FormArray>this.goalsForm.controls.companyParameterWeightage;
        for (var i = 0; i < companyControl.length; i++) {
          let parameters = <FormArray>companyControl.at(i).get('parameters');
          for (let j = 0; j < parameters.length; j++) {
            if (this[`${configterm}`].companyRating) {
              parameters.at(j).get(`${term}AppraiserRating`).setValidators([Validators.required]);
              parameters.at(j).get(`${term}AppraiserRating`).updateValueAndValidity();
            } if (this[`${configterm}`].companyComment) {
              parameters.at(j).get(`${term}AppraiserComment`).setValidators([Validators.required, Validators.maxLength(500)]);
              parameters.at(j).get(`${term}AppraiserComment`).updateValueAndValidity();
            }
          }
        }
      }
    }
    /* if(this.goalsData.addMidTermReviewStatus)
        {
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
        } */
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

  endtermHideShow() {
    if (this.endtermDiv1)
      this.endtermDiv1Ele = this.endtermDiv1.nativeElement.childElementCount;
    if (this.endtermDiv2)
      this.endtermDiv2Ele = this.endtermDiv2.nativeElement.childElementCount;
    if (this.endtermDiv3)
      this.endtermDiv3Ele = this.endtermDiv3.nativeElement.childElementCount;
    if (this.endtermDiv4)
      this.endtermDiv4Ele = this.endtermDiv4.nativeElement.childElementCount;
    this.midtermHideShow();
  }

  midtermHideShow() {
    if (this.midtermDiv1)
      this.midtermDiv1Ele = this.midtermDiv1.nativeElement.childElementCount;
    if (this.midtermDiv2)
      this.midtermDiv2Ele = this.midtermDiv2.nativeElement.childElementCount;
    if (this.midtermDiv3)
      this.midtermDiv3Ele = this.midtermDiv3.nativeElement.childElementCount;
    if (this.midtermDiv4)
      this.midtermDiv4Ele = this.midtermDiv4.nativeElement.childElementCount;
  }
}
