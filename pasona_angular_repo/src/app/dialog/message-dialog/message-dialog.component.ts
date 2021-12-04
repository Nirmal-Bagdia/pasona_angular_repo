

import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})

export class MessageDialogComponent implements OnInit {
  type: any;
  userData: any;
  id: any;
  minDate = new Date();
  maxDate = new Date();
  messageForm: FormGroup;
  message: string;
  @ViewChild('photoInput', { static: false }) myInputVariable: ElementRef;
  fileToUpload: any;
  displayedColumns: string[] = ['sno', 'MeetingDate', 'file'];
  dataSource = [];
  isFirst: boolean;
  
  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    var date = new Date();
    this.isFirst = false;
    this.fileToUpload='';
    this.minDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 90);
    this.type = data.type;
    this.id = data.id;
    this.message = data.message;
    if (this.data.midTerm == 1 && this.data.isMidtermFist == 0 && this.data.endTermProcessStatus==0) {
      this.isFirst = true;
    }
    else if (this.data.midTerm == 0 && this.data.isObjFirst == 0) {
      this.isFirst = true;
    }
    else if (this.data.endTermProcessStatus == 1 && this.data.isEndtermFist == 0) {
      this.isFirst = true;
    }
    this.userData = this.pasonaService.getUserData();
    this.messageForm = this.fb.group({
      appraiserId: [this.userData.empCode],
      appraiseeId: [this.id, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      empObjId: [data.empObjId],
      offlineMeetingDate: ['', Validators.required],
      files: []
    });

    if (this.type == 'accept') {
      this.messageForm.get('description').disable();
    }
    if (!this.isFirst) {
      this.messageForm.get('offlineMeetingDate').disable();
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
    console.log("mimeType=", mimeType);
    console.log("mimeType=", mimeType.indexOf('officedocument'));
    if ((mimeType.indexOf('officedocument') == -1) && mimeType.indexOf('pdf') == -1 && mimeType.indexOf('msword') == -1) {
      console.log("ddd", this.myInputVariable.nativeElement.files);
      this.myInputVariable.nativeElement.value = null;
      this.messageForm.patchValue({ files: null });
      this.pasonaService.openSnackBar('Please select valid File');
      return;
    }
    else {
      this.fileToUpload = files[0];
    }

  }

  sendAlert() {
    if (this.messageForm.valid) {
      var meetingDate
      if (this.isFirst) { //changes convertDateTOTimestamp to  convertDateAndTimeTOTimestamp for time add hour and minite
        meetingDate = this.pasonaService.convertDateAndTimeTOTimestamp(this.messageForm.value.offlineMeetingDate);
      }
      else {
        meetingDate = '';
      }
      if(this.messageForm.value.description)
      {
        var description=this.pasonaService.setEncrypt(this.messageForm.value.description);
      }
      var param = new FormData();
      param.append('appraiserId', this.messageForm.value.appraiserId);
      param.append('appraiseeId', this.messageForm.value.appraiseeId);
      param.append('description', description);
      param.append('appraisalPlanId', this.data.appraisalPlanId);
      param.append('empObjId', this.messageForm.value.empObjId);
      param.append('offlineMeetingDate', meetingDate.toString());
      param.append('files', this.fileToUpload);
      this.pasonaService.startSpinner();
      if (this.type == 'accept') {
        if (this.data.midTerm == 1 && this.data.endTermProcessStatus==0) {
          /* for (var i = 0, valuePair; valuePair = this.data.midTermRating[i]; i++) {
            for (var j in valuePair) {
              var paraName = "midTermRating" + '[' + i + ']' + '.' + j;
              if(j=='appraisersComment')
              {
                valuePair[j]=this.pasonaService.setEncrypt(valuePair[j]);
              }
              param.append(paraName, valuePair[j]);
            }
          } */
          this.pasonaService.sendAlertToEmployeeAcceptMidTerm(param).subscribe(resp => {
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
        else if (this.data.endTermProcessStatus==1) {
          this.pasonaService.sendAlertToEmployeeAcceptEndTerm(param).subscribe(resp => {
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
          this.pasonaService.AcceptAppraiseeObjective(param).subscribe(dataRes => {
            this.pasonaService.stopSpinner();
            if (dataRes.status == '1') {
              this.pasonaService.openSnackBar(dataRes.message);
              this.yes();
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
      else if (this.type == 'revise') {
        if (this.data.midTerm == 1  && this.data.endTermProcessStatus==0) {
          param.append("reviseObjectiveIds", this.data.action.editIds.toString());
          param.append("removeObjectiveIds", this.data.action.deleteIds.toString());
          param.append("canAddObjective", this.data.action.addPermission.toString());
          this.pasonaService.sendAlertToEmployeeReviseMidTerm(param).subscribe(resp => {
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
        else if (this.data.endTermProcessStatus==1) {
          param.append("reviseObjectiveIds", this.data.action.editIds.toString());
          param.append("removeObjectiveIds", this.data.action.deleteIds.toString());
          param.append("canAddObjective", this.data.action.addPermission.toString());
          this.pasonaService.sendAlertToEmployeeReviseEndTerm(param).subscribe(resp => {
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
          param.append("reviseObjectiveIds", this.data.action.editIds.toString());
          param.append("removeObjectiveIds", this.data.action.deleteIds.toString());
          param.append("canAddObjective", this.data.action.addPermission.toString());
          this.pasonaService.sendAlertToAppraiseeForRevise(param).subscribe(resp => {
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
      }

    }

    else {
      this.messageForm.markAllAsTouched();
    }
  }

  viewHistory() {

    if (this.dataSource.length == 0) {
      var param = {
        "empObjId": this.data.empObjId,
        "appraiserId": this.userData.empCode
      }
      this.pasonaService.startSpinner();
      this.pasonaService.offlineMeetingHistory(param).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.dataSource = resp.offlineMeetingDetails;
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
  }

  downloadFile(file) {
    window.open(file);
  }

}



