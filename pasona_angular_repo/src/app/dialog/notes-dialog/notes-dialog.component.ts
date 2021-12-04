

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})

export class NotesDialogComponent implements OnInit {
  type: any;
  message: String;
  commentDataObjective: any[] = [];
  commentDataMidTerm: any[] = [];
  commentDataEvalution: any[] = [];
  messageForm: FormGroup;
  userData: any;
  
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;

  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<NotesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.type;
    this.message = data.message;
    
    this.userData = this.pasonaService.getUserData();
    this.messageForm = this.fb.group({
      notificationFrom: [this.userData.empCode],
      notificationTo: [data.empId, Validators.required],
      description: ['', [Validators.maxLength(500)]],
      empObjId: [data.empObjId],
      companyId: [this.userData.companyId]
    });
  }

  ngOnInit() {
    this.getCommentByEmpId();
  }

  onNoClick(): void {
    this.dialogRef.close(true);
  }
  yes() {
    this.dialogRef.close(true);
  }

  getCommentByEmpId() {
    var statusArray = [];
    var userData = this.pasonaService.getUserData();
    this.pasonaService.startSpinner();
    this.pasonaService.getCommentByEmpObjId(this.data.empObjId, this.userData.empCode).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.commentDataObjective = dataRes.commentDetails.setObjectiveComments;
        this.commentDataMidTerm = dataRes.commentDetails.midTermComments;
        this.commentDataEvalution = dataRes.commentDetails.evaluationComments;
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  sendMessage() {
    this.messageForm.value.description=this.pasonaService.setEncrypt(this.messageForm.value.description)
    this.pasonaService.sendAlertToAppraiseeForComment(this.messageForm.value).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.pasonaService.openSnackBar(resp.message);
        this.messageForm.patchValue({ description: '' });
        this.getCommentByEmpId();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
}



