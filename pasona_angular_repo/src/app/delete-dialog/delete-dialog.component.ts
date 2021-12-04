
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  type: any;
  deleteForm: any;
  message: String;
  constructor(private fb: FormBuilder,private pasonaService:PasonaServiceService, public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.data;
    this.message = data.message;
    this.deleteForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get f() { return this.deleteForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }

  yesCompany() {
    if (this.deleteForm.value.password != '') {
      this.dialogRef.close(this.deleteForm.value.password);
    }
    else {
      this.deleteForm.controls['password'].markAsDirty();
    }
  }
}


