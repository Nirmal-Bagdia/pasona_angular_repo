import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-file-review-dialog',
  templateUrl: './file-review-dialog.component.html',
  styleUrls: ['./file-review-dialog.component.scss']
})

export class FileReviewDialogComponent implements OnInit {
  type: any;
  userData: any;
  id: any;
  displayedColumns: string[] = ['sno', 'MeetingDate', 'file'];
  dataSource = [];
  
  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<FileReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.type = data.type;
    this.id = data.id;
    this.userData = this.pasonaService.getUserData();
  }

  ngOnInit() {
    this.viewHistory();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }

  viewHistory() {
    if (this.dataSource.length == 0) {
      var param = {
        "empObjId": this.data.empObjId,
        "appraiserId": this.userData.empCode
      }
      this.pasonaService.startSpinner();
      this.pasonaService.offlineMeetingHistoryView(param).subscribe(resp => {
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



