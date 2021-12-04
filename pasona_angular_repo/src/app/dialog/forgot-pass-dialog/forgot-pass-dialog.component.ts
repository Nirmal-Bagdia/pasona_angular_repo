import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-forgot-pass-dialog',
  templateUrl: './forgot-pass-dialog.component.html',
  styleUrls: ['./forgot-pass-dialog.component.scss']
})
export class ForgotPassDialogComponent implements OnInit {
  message: any;
  forgotPasswordForm: FormGroup;
  
  constructor(private fb: FormBuilder,private pasonaService:PasonaServiceService, public dialogRef: MatDialogRef<ForgotPassDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.data;
    this.forgotPasswordForm = this.fb.group({
      userName: ['', [Validators.required]] /* CustomValidator.alphaNumeric1, Validators.maxLength(20),Validators.minLength(10) */
  });
    
  }

  ngOnInit() {
  }

  get f() { return this.forgotPasswordForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }

  forgotPass() {
    if (this.forgotPasswordForm.valid) {
      this.pasonaService.startSpinner();
      this.pasonaService.forgotPassword(this.forgotPasswordForm.value).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
            this.onNoClick();
        }
        else {
          this.pasonaService.infoMessage(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}




