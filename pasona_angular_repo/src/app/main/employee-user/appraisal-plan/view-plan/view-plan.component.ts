import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';
import { MatPaginator, MatTableDataSource, MatDialog, MatStepper, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddAppraiserDialogComponent } from 'app/dialog/add-appraiser-dialog/add-appraiser-dialog.component';
import { SendAlertComponent } from 'app/dialog/send-alert/send-alert.component';
import { DateFormDailogModule } from 'app/dialog/date-form-dialog/date-form-dialog.module';
import { DateFormDialogComponent } from 'app/dialog/date-form-dialog/date-form-dialog.component';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ViewPlanComponent implements OnInit {
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  @ViewChild('matTab', { static: true }) matTab:  MatTabGroup;
  displayedColumns: string[] = ['sNo', 'appraisalPlan', 'creation', 'statusApp', 'end', 'action'];//'approverstatus'
  displayedColumns1: string[] = ['sNo', 'appraisalPlan', 'creation', 'end', 'action']; //'approverstatus'
  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  planForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  unitData: any;
  userData: any;
  participantData: any;
  participantDataForMidTerm: any;
  participantDataForEndTerm:any;
  sub: any;
  id: number;
  minDate = new Date();
  maxDate = new Date();
  sendAlertBtn: boolean;
  activatedStep: number = 0;
  matTabIndex:number=0;
  //deadLine:any;
  stepControlPlan = { midterm: { invalid: true }, evalution: { invalid: true } };
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute
  ) {
    
    var date = new Date();
    this.sendAlertBtn = false;
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    this._unsubscribeAll = new Subject();
    this.unitData = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.planForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      unitId: ['', Validators.required],
      planName: ['', [Validators.required, CustomValidator.alphaNumeric]],
      objectiveSetupPer: ['', [Validators.required]],
      midTermReviewStatus: [],
     // deadLine: []
    });  
  }


  ngOnInit() {
    var selectedTab = JSON.parse(localStorage.getItem('activateStep'));
    console.log("selectedTab",selectedTab);
    if (selectedTab) {
      if (selectedTab.type == 'objective') {
        this.getAllAppraisalPlanParticipant();
      }
      else if (selectedTab.type == 'midterm') {
        this.getAllAppraisalPlanParticipantForMidTerm();
      }
      else if (selectedTab.type == 'evalution') {
        if (selectedTab.selectedIndex == 1) {
          this.activatedStep = 1;
        }
        else {
          this.activatedStep = 2;
        }
        this.getAllAppraisalPlanParticipantForEndTerm();
      }
    }
    else {
      var data = { type: 'objective', selectedIndex: 0 };
      localStorage.setItem('activateStep', JSON.stringify(data));
      this.getAllAppraisalPlanParticipant();
    }
  
  }


  arrayOne(n: number): any[] {
    return Array(n);
  }

  get f() { return this.planForm.controls; };

  createGroup() {
    if (this.planForm.valid) {
      this.pasonaService.startSpinner();
      this.pasonaService.addGroup(this.planForm.value).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate(['/employee/group']);
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
      this.planForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  setObjectiveStatus(ev) {
    console.log(ev);
    this.pasonaService.startSpinner();
    let data = {
      "appraisalPlanId": this.id,
      "setObjStatus": ev.value
    }
    this.pasonaService.setObjectiveStatus(data).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        //   this.unitData = resp.unitDetails;
        this.participantData.setObjStatus = ev.value;
        this.pasonaService.openSnackBar(resp.message)
      }
      else {
        //this.participantData.setObjStatus=this.participantData.setObjStatus;
        this.planForm.patchValue({ objectiveSetupPer: this.participantData.setObjStatus });
        this.pasonaService.openSnackBar(resp.message)
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  setMidtermProcessStatus(ev) {
    console.log(ev);
    this.pasonaService.startSpinner();
    let data = {
      "appraisalPlanId": this.id,
      "midTermReviewStatus": ev.value
    }
    this.pasonaService.setMidtermProcessStatus(data).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        //   this.unitData = resp.unitDetails;
        this.participantDataForMidTerm.midTermReviewStatus = ev.value;
        this.pasonaService.openSnackBar(resp.message)
      }
      else {
        //this.participantData.setObjStatus=this.participantData.setObjStatus;
        this.planForm.patchValue({ midTermReviewStatus: this.participantDataForMidTerm.midTermReviewStatus });
        this.pasonaService.openSnackBar(resp.message)
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllAppraisalPlanParticipant() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlanParticipant(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.participantData = resp.appraisalPlanDetails;
        this.activatedStep = 0;
        this.sendAlertBtn = false;
        for (let i = 0; i < this.participantData.planDetail.length; i++) {
          if (this.participantData.planDetail[i].setAppraiserStatus == 0) {
            this.sendAlertBtn = true;
            break;
          }

        }
        if (this.participantData.planDetail.length == 0) {
          this.sendAlertBtn = true;
        }
     //   this.deadLine= this.pasonaService.convertTimeStampToString(this.participantData.deadLine);
        //   this.participantData.forEach(obj => {

        // });
        // this.participantData['setObjStatus']=this.participantData.setObjStatus;
        //  this.participantData['setObjStatus']=this.participantData[0].setObjStatus;
        this.planForm.patchValue({ midTermReviewStatus: this.participantData.midTermReviewStatus, objectiveSetupPer: this.participantData.setObjStatus, planName: this.participantData.planName }); /* deadLine: this.pasonaService.convertTimeStampToString(this.participantData.deadLine) */
        console.log(this.planForm.value);
        this.dataSource1 = new MatTableDataSource<any>(this.participantData.planDetail);
        this.dataSource1.paginator = this.paginator.toArray()[0];

        this.setSteperTab();
      }
      else {
        this.sendAlertBtn = true;
      }
    }, error => {
      this.sendAlertBtn = true;
      this.pasonaService.stopSpinner();
    })
  }

  setSteperTab() {
    if (this.participantData.midTermProcessStatus == 1) {
      this.stepControlPlan.midterm.invalid = false;
    }
     if(this.participantData.endTermProcessStatus == 1)
    {
      this.stepControlPlan.evalution.invalid = false;
    }
  }

  getAllAppraisalPlanParticipantForMidTerm() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlanParticipantForMidTerm(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.stepControlPlan.midterm.invalid = false;
        this.participantDataForMidTerm = resp.appraisalPlanDetails;
        if(this.participantDataForMidTerm.endTermProcessStatus==1)
        {
          this.stepControlPlan.evalution.invalid = false;
        }
        this.activatedStep = 1;
        if (!this.participantData) {
          this.participantData = this.participantDataForMidTerm;
        }
        this.sendAlertBtn = false;
        for (let i = 0; i < this.participantDataForMidTerm.planDetail.length; i++) {
          if (this.participantDataForMidTerm.planDetail[i].setAppraiserStatus == 0) {
            this.sendAlertBtn = true;
            break;
          }

        }
        if (this.participantDataForMidTerm.planDetail.length == 0) {
          this.sendAlertBtn = true;
        }
       // this.deadLine= this.pasonaService.convertTimeStampToString(this.participantDataForMidTerm.deadLine);
        this.planForm.patchValue({ midTermReviewStatus: this.participantDataForMidTerm.midTermReviewStatus, objectiveSetupPer: this.participantDataForMidTerm.setObjStatus, planName: this.participantDataForMidTerm.planName }); /* , deadLine: this.pasonaService.convertTimeStampToString(this.participantDataForMidTerm.deadLine) */
        console.log(this.planForm.value);
        this.dataSource2 = new MatTableDataSource<any>(this.participantDataForMidTerm.planDetail);
        this.dataSource2.paginator = this.paginator.toArray()[1];
      }
      else {
        this.sendAlertBtn = true;
      }
    }, error => {
      this.sendAlertBtn = true;
      this.pasonaService.stopSpinner();
    })
  }


  getAllAppraisalPlanParticipantForEndTerm() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlanParticipantForEndTerm(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.stepControlPlan.midterm.invalid = false;
        this.stepControlPlan.evalution.invalid = false;
        this.participantDataForEndTerm = resp.appraisalPlanDetails;
        if (!this.participantData) {
          this.participantData = this.participantDataForEndTerm;
        }
        this.sendAlertBtn = false;
        for (let i = 0; i < this.participantDataForEndTerm.planDetail.length; i++) {
          if (this.participantDataForEndTerm.planDetail[i].setAppraiserStatus == 0) {
            this.sendAlertBtn = true;
            break;
          }

        }
        if (this.participantDataForEndTerm.planDetail.length == 0) {
          this.sendAlertBtn = true;
        }
    //    this.deadLine= this.pasonaService.convertTimeStampToString(this.participantDataForEndTerm.deadLine);
        this.planForm.patchValue({ midTermReviewStatus: this.participantDataForEndTerm.midTermReviewStatus, objectiveSetupPer: this.participantDataForEndTerm.setObjStatus, planName: this.participantDataForEndTerm.planName });  /* , deadLine: this.pasonaService.convertTimeStampToString(this.participantDataForEndTerm.deadLine) */
        console.log(this.planForm.value);
        this.dataSource3 = new MatTableDataSource<any>(this.participantDataForEndTerm.planDetail);
        this.dataSource3.paginator = this.paginator.toArray()[2];
      }
      else {
        this.sendAlertBtn = true;
      }
    }, error => {
      this.sendAlertBtn = true;
      this.pasonaService.stopSpinner();
    })
  }

  addParticipant() {
    this.router.navigate(['/employee/viewPlan/', this.id, 'addParticipant']);
  }

  viewEmployee(id,groupId) {
    console.log("groupId",groupId,"id",id)
    this.router.navigate(['/employee/viewPlan/', this.id, 'employees', id,groupId]);
  }

/*   updateDeadLine(ev) {
    this.pasonaService.startSpinner();
    const deadLine = this.pasonaService.convertDateTOTimestamp(ev.value);
    this.pasonaService.updateDeadLine(this.id, deadLine).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.pasonaService.openSnackBar(resp.message);
      }
      else {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  } */

  sendMessagePopUp(val, msg, id, ch, data, status, attach) {
    const dialogAp = this.dialog.open(SendAlertComponent, {
      width: '600px',
      disableClose: true,
      data: { data: val, id: id, pType: msg, choice: ch, empData: data, status: status, attach: attach }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        // this.getAllAppraisalPlanData();
        if (this.participantData.appraisalPlanStatus == 0) {
          this.participantData.appraisalPlanStatus = 1;
        }
        else if (status == 10) {
          this.participantData.midTermProcessStatus=1;
          this.stepControlPlan.midterm.invalid = false;
        }
      }
    });
  }

  addAppraiserPopup(val, empData, id, ch) {
    const dialogAp = this.dialog.open(AddAppraiserDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { data: val, empData: empData, id: id, choice: ch }
    });
    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        if (ch == 'single') {
          this.getAllAppraisalPlanParticipant();
        }
      }
    });
  }

  generateReportOfObjective() {
    this.pasonaService.startSpinner();
    this.pasonaService.generateObjectiveReport(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        window.open(resp.url);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  generateReportOfMidtern()
  {
    this.pasonaService.startSpinner();
    this.pasonaService.generateMidtermReport(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        window.open(resp.url);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  generateReportOfEndtern()
  {
    this.pasonaService.startSpinner();
    this.pasonaService.generateEndtermReport(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        window.open(resp.url);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  
  generateFinalReport()
  {
    this.pasonaService.startSpinner();
    this.pasonaService.generateFinalReport(this.id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        window.open(resp.url);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  tabChange(ev:MatTabChangeEvent)
  {
    console.log('ev',ev);
    let label =ev.tab.textLabel;
    if (label == 'objective') {
      this.getAllAppraisalPlanParticipant();
      var data = { type: 'objective', selectedIndex: 0 };
      localStorage.setItem('activateStep', JSON.stringify(data));
    }
    else if (label == 'midterm') {
        var data = { type: 'midterm', selectedIndex: ev.index };
        this.getAllAppraisalPlanParticipantForMidTerm();
        localStorage.setItem('activateStep', JSON.stringify(data));
      }

      else if (label == 'evalution') {
        var data = { type: 'evalution', selectedIndex: ev.index };
        this.getAllAppraisalPlanParticipantForEndTerm();
        localStorage.setItem('activateStep', JSON.stringify(data));
      }
  }

  setDate(popupType, allDate, planName, appraisalPlanId, toYear, toMonth,fromYear,fromMonth) {
    const dialogAp = this.dialog.open(DateFormDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { popupType: popupType, allDate: allDate, planName: planName, appraisalPlanId: appraisalPlanId, toYear: toYear, toMonth: toMonth,fromYear:fromYear,fromMonth:fromMonth }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        if (popupType == 'objective') {
          this.getAllAppraisalPlanParticipant();
        }
        else if (popupType == 'midterm') {
          this.getAllAppraisalPlanParticipantForMidTerm();
        }
        else if (popupType == 'endterm') {
          this.getAllAppraisalPlanParticipantForEndTerm();
        }
      }
    });
  }

   getVal():number
  {
    return this.matTabIndex++;
  }

}
