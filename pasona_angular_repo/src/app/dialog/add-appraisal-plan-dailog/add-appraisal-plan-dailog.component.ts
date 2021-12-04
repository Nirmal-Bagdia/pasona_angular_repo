import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";


@Component({
  selector: 'app-add-appraisal-plan-dailog',
  templateUrl: './add-appraisal-plan-dailog.component.html',
  styleUrls: ['./add-appraisal-plan-dailog.component.scss']
})
export class AddAppraisalPlanDailogComponent implements OnInit {

  type: any;
  appraisalForm: any;
  userData: any;
  yearData: any[];
  monthData: any[];
  id: any;
  minDate = new Date();
  maxDate = new Date();
  employeeData: any[] = [];
  appraisalParameterData: any[] = [];
  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<AddAppraisalPlanDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.data;
    this.id = data.id;
    this.userData = this.pasonaService.getUserData();
    var date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    this.appraisalForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      unitId: [this.userData.unitId],
      empId: [this.userData.empCode],
      planName: ['', [Validators.required, Validators.maxLength(100)]],
      fromMonth: ['', [Validators.required]],
      fromYear: ['', [Validators.required]],
      toMonth: ['', [Validators.required]],
      toYear: ['', [Validators.required]],
      // midTermReview:[true,Validators.required],
      // midTermSelfEvaluation:['true',],
      // evaluation:[true,Validators.required],
      // setObjective:[true,Validators.required],
      objective: ['', [Validators.required, Validators.maxLength(250)]],
      // appraisalParameterId:['',Validators.required],
      appraisalPlanId: [],
      //deadLine:['',Validators.required]
    });
    this.yearData = this.pasonaService.getYear();
    this.monthData = this.pasonaService.getMonth();
    //  this.getallAppraisalParameter();
    if (this.type == 'Edit') {
      this.getAppraisalDataById();
    }
  }

  ngOnInit() {
  }
  get f() { return this.appraisalForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }
  yes() {
    this.dialogRef.close(true);
  }

  createPlan() {
    if (this.appraisalForm.valid) {
      // if(this.appraisalForm.value.midTermReview==false)
      // {
      //   this.appraisalForm.value.midTermSelfEvaluation=false;
      // }
      this.pasonaService.startSpinner();
      //this.appraisalForm.value.deadLine=this.pasonaService.convertDateTOTimestamp(this.appraisalForm.value.deadLine);
      var encData: any;
      var encArray = ["planName", "objective"];
      encData = this.pasonaService.setEncryptObject(this.appraisalForm.value, encArray);
      this.pasonaService.addAppraisalPlan(encData).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    else {
      this.appraisalForm.markAllAsTouched();
    }
  }

  editPlan() {
    if (this.appraisalForm.valid) {
      // if(this.appraisalForm.value.midTermReview==false)
      // {
      //   this.appraisalForm.value.midTermSelfEvaluation=false;
      // }
      this.pasonaService.startSpinner();
      //  this.appraisalForm.value.deadLine=this.pasonaService.convertDateTOTimestamp(this.appraisalForm.value.deadLine);
      var encData: any;
      var encArray = ["planName", "objective"];
      encData = this.pasonaService.setEncryptObject(this.appraisalForm.value, encArray);
      this.pasonaService.editAppraisalPlan(encData).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    else {
      this.appraisalForm.markAllAsTouched();
    }
  }
  errorChecking(val) {
    var fromMonth = parseInt(this.appraisalForm.value.fromMonth);
    var toMonth = parseInt(this.appraisalForm.value.toMonth);
    var fromYear = parseInt(this.appraisalForm.value.fromYear);
    var toYear = parseInt(this.appraisalForm.value.toYear);
    console.log(fromMonth, toMonth, toYear, fromYear);
    if (toYear && toMonth)
      this.maxDate = new Date(toYear, toMonth - 1, 0);
    if (fromYear == toYear && fromMonth > toMonth) {
      if (val == 'fm') {
        this.appraisalForm.patchValue({ fromMonth: '' });
        this.pasonaService.openSnackBar('From Month should be less than To Month');
      }
      else {
        this.appraisalForm.patchValue({ toMonth: '' });
        this.pasonaService.openSnackBar('To Month should be greater than From Month');
      }
    }
    else if (fromYear > toYear) {
      if (val == 'fy') {
        this.appraisalForm.patchValue({ fromYear: '' });
        this.pasonaService.openSnackBar('From Year should be less than To Year');
      }
      else {
        this.appraisalForm.patchValue({ toYear: '' });
        this.pasonaService.openSnackBar('To Year should be greater than From Year');
      }
    }
  }
  patchValueForm(formData) {
    this.appraisalForm.patchValue({
      companyId: +formData.companyId,
      unitId: +formData.unitId,
      empId: +formData.empId,
      // midTermReview:formData.midTermReview,
      // midTermSelfEvaluation: formData.midTermSelfEvaluation.toString(),
      planName: formData.planName,
      fromMonth: formData.fromMonth,
      fromYear: + formData.fromYear,
      toMonth: formData.toMonth,
      toYear: +formData.toYear,
      appraisalPlanId: formData.appraisalPlanId,
      objective: formData.objective,
      // deadLine:this.pasonaService.convertTimeStampToString(formData.deadLine),
      // appraisalParameterId:+formData.appraisalParameterId
    });
    this.maxDate = new Date(formData.toYear, formData.toMonth - 1, 0);
  }
  getAppraisalDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAppraisalPlanById(this.id).subscribe(dataRes => {
    this.pasonaService.stopSpinner();
    if (dataRes.status == '1') {
        var encDecData: any;
        var encArray = ["planName", "objective"];
        encDecData = this.pasonaService.getDecryptObject(dataRes.appraisalPlanDetails, encArray);
        this.patchValueForm(encDecData);
      }
    else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  getallAppraisalParameter() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalParameter(this.userData.companyId).subscribe(resp => {
    this.pasonaService.stopSpinner();
    if (resp.status == '1') {
        this.appraisalParameterData = resp.appraisalParameterDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
}



