import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  message: any;
  
  constructor(private fb: FormBuilder,private pasonaService:PasonaServiceService, public dialogRef: MatDialogRef<InfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.data;
    
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



