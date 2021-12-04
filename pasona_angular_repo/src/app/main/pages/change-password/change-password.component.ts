import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  fileToUpload: any;
  imgURL: string | ArrayBuffer;
  userData: any;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    this._unsubscribeAll = new Subject();
    this.userData = this.pasonaService.getUserData();
    this.changePassForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirm: ['', [Validators.required]],
    }, {
      validator: CustomValidator.passwordMatchValidator
    });
  }


  ngOnInit() {
  }

  get f() { return this.changePassForm.controls; };

  changePassword() {
    if (this.changePassForm.valid) {
      this.pasonaService.startSpinner();
      var data = {
        "oldPassword": this.pasonaService.setEncrypt(this.changePassForm.value.oldPassword),
        "newPassword": this.pasonaService.setEncrypt(this.changePassForm.value.password),
        "userName": this.userData.userName,
        "userType": this.userData.userType
      }
      this.pasonaService.changePassword(data).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.userData.pwdResetStatus = 1;
          this.pasonaService.setUserData(this.userData);
          this.changePassForm.reset();

          if (this.userData.userType == 1) {
            this.router.navigate(['/admin/company']);
          }
          else if (this.userData.userType == 2) {
            this.router.navigate(['/company/dashboard']);
          }
          else if (this.userData.userType == 3) {
            this.router.navigate(['/unit/dashboard']);
          }
          else if (this.userData.userType == 4) {
            this.router.navigate(['/employee/dashboard']);
          }

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
      this.changePassForm.markAllAsTouched();
    }
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
