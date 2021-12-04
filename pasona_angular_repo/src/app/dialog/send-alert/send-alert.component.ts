import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-send-alert',
  templateUrl: './send-alert.component.html',
  styleUrls: ['./send-alert.component.scss']
})

export class SendAlertComponent implements OnInit {
  type: any;
  userData: any;
  yearData: any[];
  monthData: any[];
  id: any;
  messageForm: FormGroup;
  employeeData: any[] = [];
  choice: string;
  alertChoice: string;
  @ViewChild('photoInput', { static: false }) myInputVariable: ElementRef;
  fileToUpload: any;

  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<SendAlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.data;
    this.alertChoice = 'other';
    this.id = data.id;
    this.userData = this.pasonaService.getUserData();
    this.choice = "other"
    if (data.choice) {
      this.choice = data.choice;
    }

    this.messageForm = this.fb.group({
      companyId: [this.userData.companyId],
      notificationFrom: [this.userData.empCode],
      to: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      appraisalPlanDetailId: [this.id],
      appraisalPlanId: [this.id],
      files: ['']
    });

    if (this.type != 'allmsg') {
      if (data.choice == 'single') {
        this.alertChoice = 'single';
        var empdata = [];
        this.employeeData.push(data.empData)
        empdata.push(data.empData.empId);

        this.messageForm.patchValue({ to: empdata });
        this.messageForm.get('to').disable();
      }
      else if (data.choice == 'multi') {
        this.getallEmployeeParticipant();
      }
      this.messageForm.get('appraisalPlanId').disable();
    }
    else if (this.type == 'allmsg' && this.choice == 'other') {
      this.messageForm.get('to').disable();
      this.messageForm.get('appraisalPlanDetailId').disable();
    }
    else if (this.type == 'allmsg' && this.choice != 'other') {
      this.messageForm.get('to').disable();
      this.messageForm.get('appraisalPlanDetailId').disable();
      this.messageForm.get('appraisalPlanId').disable();
    }

  }

  ngOnInit() {

  }

  get f1() { return this.messageForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    // if ((mimeType.indexOf('officedocument') == -1) && mimeType.indexOf('pdf') == -1 && mimeType.indexOf('msword') == -1) {
    if (mimeType.match(/spreadsheetml\/*/) == null) {
      this.myInputVariable.nativeElement.value = null;
      this.messageForm.patchValue({ file: null });
      return;
    }
    this.fileToUpload = files[0];
  }

  sendAlert() {
    if (this.messageForm.valid) {
      this.pasonaService.startSpinner();
      if (this.type != 'allmsg') {
        this.messageForm.get('to').enable();
        this.messageForm.value.description = this.pasonaService.setEncrypt(this.messageForm.value.description)
        this.pasonaService.sendAlertToEmployee(this.messageForm.value).subscribe(resp => {
          this.pasonaService.stopSpinner();
          if (resp.status == '1') {
            this.pasonaService.openSnackBar(resp.message);
            this.yes();
          }
        }, error => {
          this.pasonaService.stopSpinner();
        })
      }
      else if (this.type == 'allmsg' && this.choice == 'other') {
        this.messageForm.value['appraisalPlanStatus'] = this.data.status;
        if (this.data.status == 11) {
          this.pasonaService.startSpinner();
          let messageForm = {
            companyId: this.messageForm.value.companyId,
            description: this.pasonaService.setEncrypt(this.messageForm.value.description),
            appraisalPlanId: this.messageForm.value.appraisalPlanId,
          }
          this.pasonaService.startConsolidatorProcess(messageForm).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }
        if (this.data.status == 15) {
          this.pasonaService.startSpinner();
          let messageForm = {
            companyId: this.messageForm.value.companyId,
            description: this.pasonaService.setEncrypt(this.messageForm.value.description),
            appraisalPlanId: this.messageForm.value.appraisalPlanId,
          }
          this.pasonaService.startConsolidatorProcessEndTerm(messageForm).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }
        else if (this.data.status == 12) {
          this.pasonaService.startSpinner();
          let messageForm = {
            companyId: this.messageForm.value.companyId,
            description: this.pasonaService.setEncrypt(this.messageForm.value.description),
            appraisalPlanId: this.messageForm.value.appraisalPlanId,
          }
          this.pasonaService.startFinalApproverProcess(messageForm).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }
        else if (this.data.status == 14) {
          this.pasonaService.startSpinner();
          let messageForm = {
            companyId: this.messageForm.value.companyId,
            description: this.pasonaService.setEncrypt(this.messageForm.value.description),
            appraisalPlanId: this.messageForm.value.appraisalPlanId,
          }
          this.pasonaService.startFinalApproverProcessEndTerm(messageForm).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }
        else if (this.data.status == 13) {
          this.pasonaService.startSpinner();
          this.messageForm.value.description = this.pasonaService.setEncrypt(this.messageForm.value.description)
          this.pasonaService.startEndtermProcess(this.messageForm.value).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }
        else if (this.data.status != 10) {
          var formData = new FormData();
          formData.append('notificationFrom', this.messageForm.value.notificationFrom);
          formData.append('description', this.pasonaService.setEncrypt(this.messageForm.value.description));
          formData.append('appraisalPlanId', this.messageForm.value.appraisalPlanId);
          formData.append('appraisalPlanStatus', this.messageForm.value.appraisalPlanStatus);
          formData.append('files', this.fileToUpload);
          this.pasonaService.sendAlertToAllAppraisee(formData).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }
        else if (this.data.status == 10) {
          this.pasonaService.startSpinner();
          this.messageForm.value.description = this.pasonaService.setEncrypt(this.messageForm.value.description)
          this.pasonaService.startMidtermProcess(this.messageForm.value).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
              this.pasonaService.openSnackBar(resp.message);
              this.yes();
            }
            else {
              this.onNoClick();
              this.pasonaService.infoMessage(resp.message);
            }
          }, error => {
            this.pasonaService.stopSpinner();
          })
        }

      }
      else if (this.type == 'allmsg' && this.choice == 'comment') {
        var data1 = {
          notificationFrom: this.messageForm.value.notificationFrom,
          notificationTo: this.data.id,
          description: this.pasonaService.setEncrypt(this.messageForm.value.description),
          empObjId: this.data.objId,
          companyId: this.userData.companyId
        }
        this.pasonaService.sendAlertToAppraiseeForComment(data1).subscribe(resp => {
          this.pasonaService.stopSpinner();
          if (resp.status == '1') {
            this.pasonaService.openSnackBar(resp.message);
            this.yes();
          }
        }, error => {
          this.pasonaService.stopSpinner();
        })
      }

    }
    else {
      this.messageForm.markAllAsTouched();
    }
  }

  getallEmployeeParticipant() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllEmployeeParticipant(this.id, this.type).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.employeeData = resp.employeeDetails;
        var emp = [];
        this.employeeData.forEach((element, i) => {
          if (element.status == 0) {
            emp.push(element.empId);
          }
        });
        this.messageForm.patchValue({ to: emp });
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

}



