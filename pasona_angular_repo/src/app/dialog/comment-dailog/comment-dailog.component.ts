import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-comment-dailog',
  templateUrl: './comment-dailog.component.html',
  styleUrls: ['./comment-dailog.component.scss']
})
export class CommentDailogComponent implements OnInit {
  type: any;
  message: String;
  commentDataObjective: any[] = [];
  commentDataMidTerm: any[] = [];
  commentDataEvalution: any[] = [];
  userData: any;
  
  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<CommentDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.type = data.data;
    this.message = data.message;
    this.userData = this.pasonaService.getUserData();
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
    this.pasonaService.getCommentByEmpId(this.data.empObjId, userData.empCode).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var commentData = [];
        if (dataRes.commentDetails.midTermComments.length == 0) {
          commentData.push(dataRes.commentDetails.setObjectiveComments);
        }
        else if (dataRes.commentDetails.evaluationComments.length == 0 && dataRes.commentDetails.midTermComments.length != 0) {
          commentData.push(dataRes.commentDetails.midTermComments);
        }
        else if (dataRes.commentDetails.evaluationComments.length != 0) {
          commentData.push(dataRes.commentDetails.evaluationComments);
        }

        this.commentDataObjective = dataRes.commentDetails.setObjectiveComments;
        this.commentDataMidTerm = dataRes.commentDetails.midTermComments;
        this.commentDataEvalution = dataRes.commentDetails.evaluationComments;
        for (let i = 0; i < commentData.length; i++) {
          if (commentData[i].commentStatus == 0) {
            statusArray.push(commentData[i].commentId);
          }
        }
        if (statusArray.length != 0) {
          this.viewComment(statusArray);
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

  viewComment(statusArray) {
    this.pasonaService.changeCommentStatus(statusArray).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
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



