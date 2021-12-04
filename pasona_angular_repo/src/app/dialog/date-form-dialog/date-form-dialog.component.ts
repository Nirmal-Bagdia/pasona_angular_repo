import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-date-form-dialog',
  templateUrl: './date-form-dialog.component.html',
  styleUrls: ['./date-form-dialog.component.scss']
})
export class DateFormDialogComponent implements OnInit {
  userData: any;
  minDate = new Date();
  maxDate = new Date();
  dateObjectiveForm: FormGroup;
  dateMidtermForm: FormGroup;
  dateEvalutionForm: FormGroup;

  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<DateFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    var date = new Date();
    console.log("data", data);

    //data: { popupType:popupType,allDate:allDate,planName:planName,appraisalPlanId:appraisalPlanId,toYear:toYear,toMonth:toMonth }
    this.minDate = new Date(data.fromYear, data.fromMonth-1 , 1);
    this.maxDate = new Date(data.toYear, data.toMonth , 0);
    if (data.popupType == 'objective') {
      this.userData = this.pasonaService.getUserData();
      this.dateObjectiveForm = this.fb.group({
        appraisalPlanId: [data.appraisalPlanId],
        setObjectiveStartDate: ['', Validators.required],
        setObjectiveEndDate: ['', Validators.required],
        setObjectiveAppraiseeEndDate: ['',],
        setObjectiveFirstAppraiserEndDate: ['',],
        setObjectiveSecondAppraiserEndDate: ['',],
        setObjectiveThirdAppraiserEndDate: ['',],
        setObjectiveGoalApproverEndDate: ['',],
      });
      if (data.allDate.setObjectiveStartDate) {
        this.dateObjectiveForm.patchValue({
          setObjectiveStartDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveStartDate),
          setObjectiveEndDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveEndDate),
          setObjectiveAppraiseeEndDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveAppraiseeEndDate),
          setObjectiveFirstAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveFirstAppraiserEndDate),
          setObjectiveSecondAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveSecondAppraiserEndDate),
          setObjectiveThirdAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveThirdAppraiserEndDate),
          setObjectiveGoalApproverEndDate: this.pasonaService.convertTimeStampToString(data.allDate.setObjectiveGoalApproverEndDate),
        })
      }
    }

    else if (data.popupType == 'midterm') {
      this.dateMidtermForm = this.fb.group({
        appraisalPlanId: [data.appraisalPlanId],
        midTermStartDate: ['', Validators.required],
        midTermEndDate: ['', Validators.required],
        midTermAppraiseeEndDate: ['',],
        midTermFirstAppraiserEndDate: ['',],
        midTermSecondAppraiserEndDate: ['',],
        midTermThirdAppraiserEndDate: ['',],
        midTermRatingConsolidatorEndDate: ['',],
        midTermFinalApproverEndDate: ['',],
      });
      if (data.allDate.midTermStartDate) {
        this.dateMidtermForm.patchValue({
          midTermStartDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermStartDate),
          midTermEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermEndDate),
          midTermAppraiseeEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermAppraiseeEndDate),
          midTermFirstAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermFirstAppraiserEndDate),
          midTermSecondAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermSecondAppraiserEndDate),
          midTermThirdAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermThirdAppraiserEndDate),
          midTermRatingConsolidatorEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermRatingConsolidatorEndDate),
          midTermFinalApproverEndDate: this.pasonaService.convertTimeStampToString(data.allDate.midTermFinalApproverEndDate),
        })
      }

    }
    else if (data.popupType == 'evalution') {
      this.dateEvalutionForm = this.fb.group({
        appraisalPlanId: [data.appraisalPlanId],
        endTermStartDate: ['', Validators.required],
        endTermEndDate: ['', Validators.required],
        endTermAppraiseeEndDate: ['',],
        endTermFirstAppraiserEndDate: ['',],
        endTermSecondAppraiserEndDate: ['',],
        endTermThirdAppraiserEndDate: ['',],
        endTermRatingConsolidatorEndDate: ['',],
        endTermFinalApproverEndDate: ['',],
      });

      if (data.allDate.midTermStartDate) {
        this.dateObjectiveForm.patchValue({
          endTermStartDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermStartDate),
          endTermEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermEndDate),
          endTermAppraiseeEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermAppraiseeEndDate),
          endTermFirstAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermFirstAppraiserEndDate),
          endTermSecondAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermSecondAppraiserEndDate),
          endTermThirdAppraiserEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermThirdAppraiserEndDate),
          endTermRatingConsolidatorEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermRatingConsolidatorEndDate),
          endTermFinalApproverEndDate: this.pasonaService.convertTimeStampToString(data.allDate.endTermFinalApproverEndDate),
        })
      }
    }

  }

  ngOnInit() {

  }

  get f1() { return this.dateObjectiveForm.controls; };
  get f2() { return this.dateMidtermForm.controls; };
  get f3() { return this.dateEvalutionForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }
  yes() {
    this.dialogRef.close(true);
  }

  setDateObjective() {
    if (this.dateObjectiveForm.valid) {
      let setObjectiveEndDate= this.pasonaService.convertDateTOTimestamp(this.dateObjectiveForm.value.setObjectiveEndDate);
      let dateObjectiveForm =
      {
        appraisalPlanId: this.dateObjectiveForm.value.appraisalPlanId,
        setObjectiveStartDate: this.pasonaService.convertDateTOTimestamp(this.dateObjectiveForm.value.setObjectiveStartDate),
        setObjectiveEndDate: this.pasonaService.convertDateTOTimestamp(this.dateObjectiveForm.value.setObjectiveEndDate),
        setObjectiveAppraiseeEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateObjectiveForm.value.setObjectiveAppraiseeEndDate, setObjectiveEndDate),
        setObjectiveFirstAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateObjectiveForm.value.setObjectiveFirstAppraiserEndDate, setObjectiveEndDate),
        setObjectiveSecondAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateObjectiveForm.value.setObjectiveSecondAppraiserEndDate, setObjectiveEndDate),
        setObjectiveThirdAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateObjectiveForm.value.setObjectiveThirdAppraiserEndDate, setObjectiveEndDate),
        setObjectiveGoalApproverEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateObjectiveForm.value.setObjectiveGoalApproverEndDate, setObjectiveEndDate),
      };
      this.pasonaService.startSpinner();
      this.pasonaService.setAppraisalPlanProcessDateObjective(dateObjectiveForm).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
        else {
          this.pasonaService.openSnackBar(resp.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }

    else {
      this.dateObjectiveForm.markAllAsTouched();
    }
  }

  setDateMidterm() {
    if (this.dateMidtermForm.valid) {
      let midTermEndDate = this.pasonaService.convertDateTOTimestamp(this.dateMidtermForm.value.midTermEndDate);
      let dateMidtermForm =
      {
        appraisalPlanId: this.dateMidtermForm.value.appraisalPlanId,
        midTermStartDate: this.pasonaService.convertDateTOTimestamp(this.dateMidtermForm.value.midTermStartDate),
        midTermEndDate: this.pasonaService.convertDateTOTimestamp(this.dateMidtermForm.value.midTermEndDate),
        midTermAppraiseeEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateMidtermForm.value.midTermAppraiseeEndDate, midTermEndDate),
        midTermFirstAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateMidtermForm.value.midTermFirstAppraiserEndDate, midTermEndDate),
        midTermSecondAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateMidtermForm.value.midTermSecondAppraiserEndDate, midTermEndDate),
        midTermThirdAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateMidtermForm.value.midTermThirdAppraiserEndDate, midTermEndDate),
        midTermRatingConsolidatorEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateMidtermForm.value.midTermRatingConsolidatorEndDate, midTermEndDate),
        midTermFinalApproverEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateMidtermForm.value.midTermFinalApproverEndDate, midTermEndDate),
      };


      this.pasonaService.startSpinner();
      this.pasonaService.setAppraisalPlanProcessDateMidterm(dateMidtermForm).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
        else {
          this.pasonaService.openSnackBar(resp.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }

    else {
      this.dateMidtermForm.markAllAsTouched();
    }
  }

  setDateEvalution() {
    if (this.dateEvalutionForm.valid) {
      let endTermEndDate = this.pasonaService.convertDateTOTimestamp(this.dateEvalutionForm.value.endTermEndDate);
      let dateEvalutionForm =
      {
        appraisalPlanId: this.dateEvalutionForm.value.appraisalPlanId,
        endTermStartDate: this.pasonaService.convertDateTOTimestamp(this.dateEvalutionForm.value.endTermStartDate),
        endTermEndDate: this.pasonaService.convertDateTOTimestamp(this.dateEvalutionForm.value.endTermEndDate),
        endTermAppraiseeEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateEvalutionForm.value.endTermAppraiseeEndDate, endTermEndDate),
        endTermFirstAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateEvalutionForm.value.endTermFirstAppraiserEndDate, endTermEndDate),
        endTermSecondAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateEvalutionForm.value.endTermSecondAppraiserEndDate, endTermEndDate),
        endTermThirdAppraiserEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateEvalutionForm.value.endTermThirdAppraiserEndDate, endTermEndDate),
        endTermRatingConsolidatorEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateEvalutionForm.value.endTermRatingConsolidatorEndDate, endTermEndDate),
        endTermFinalApproverEndDate: this.pasonaService.convertDateTOTimestampOrEndDate(this.dateEvalutionForm.value.endTermFinalApproverEndDate, endTermEndDate)
      };
      this.pasonaService.startSpinner();
      this.pasonaService.setAppraisalPlanProcessDateEvalution(dateEvalutionForm).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
        else {
          this.pasonaService.openSnackBar(resp.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }

    else {
      this.dateEvalutionForm.markAllAsTouched();
    }
  }
}




