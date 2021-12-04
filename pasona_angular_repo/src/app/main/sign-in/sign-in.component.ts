import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { ForgotPassDialogComponent } from 'app/dialog/forgot-pass-dialog/forgot-pass-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;
    sub: any;
    id: number;
    logo: any;
    companyName: string;
    fuseConfig: any;
    private _unsubscribeAll: Subject<any>;
    see: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private pasonaService: PasonaServiceService,
        public router: Router,
        private route: ActivatedRoute,
        private cookieService: CookieService,
        private dialog:MatDialog
    ) {

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.isLogin();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        console.log("this.id", this.id);
        if (this.id) {
            this.getLogo(this.id);
        }
        else {
            this.logo = "assets/images/pasona_logo.png";
            this.companyName = "PRIDE";
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        //const allCookies: {} = cookieService.getAll();
        this.loginForm = this._formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            companyId: ['']
        });
        const cookieExists: boolean = this.cookieService.check('userName');
        if (cookieExists) {
            this.loginForm.patchValue({ userName: this.cookieService.get('userName'), password: this.cookieService.get('password') });
        }
    }


    isLogin() {
        var userData = this.pasonaService.getUserData();
        if (userData) {
            if (userData.userType == '1') {
                this.router.navigate(['/admin/company']);
            }
            else if (userData.userType == '2') {
                this.router.navigate(['/company/dashboard']);
            }
            else if (userData.userType == '3') {
                this.router.navigate(['/unit/dashboard']);
            }
            else if (userData.userType == '4') {
                this.router.navigate(['/employee/dashboard']);
            }

        }
    }

    getLogo(id) {
        this.pasonaService.getLogo(id).subscribe(resData => {
            //  this.pasonaService.stopSpinner();
            if (resData.status == '1') {
                this.logo = resData['Company Logo'].logo;
                this.companyName = resData['Company Logo'].companyName;
            } else {
                this.pasonaService.openSnackBar(resData.message);
            }
        }, error => {
            //  this.organicService.stopSpinner();
            this.pasonaService.openSnackBarError('Please connect to server!');
        });
    }

    signIn() /* method for sign in request */ {
        if (this.loginForm.value.userName.trim() != '' && this.loginForm.value.password.trim() != '') {
            this.pasonaService.startSpinner();
            var params;
            params={
                companyId:'',
                userName: this.loginForm.value.userName,
                password:this.loginForm.value.password,
            }
            // this.loginForm.value.userName = this.pasonaService.setEncrypt(this.loginForm.value.userName);
            // this.loginForm.value.password = this.pasonaService.setEncrypt(this.loginForm.value.password);
            if (this.id) {
                 params={
                    companyId:this.id,
                    userName: this.pasonaService.setEncrypt(this.loginForm.value.userName),
                    password:this.pasonaService.setEncrypt(this.loginForm.value.password),
                }
                
            }
            this.pasonaService.signIn(params).subscribe(signInRes => {
                this.pasonaService.stopSpinner();
                if (signInRes.status == '1') {
                    // this.navbarSet();
                    if (signInRes.userDetails.companyId) {
                        localStorage.setItem('pasonaUserDetails', JSON.stringify(signInRes.userDetails.companyId));
                    }
                    else {
                        localStorage.removeItem('pasonaUserDetails');
                    }
                    if (this.id == signInRes.userDetails.companyId || (signInRes.userDetails.userType == '1' && !this.id)) {
                        this.pasonaService.openSnackBar(signInRes.message);
                        this.pasonaService.setUserData(signInRes.userDetails);
                        console.log(signInRes);
                        if (signInRes.userDetails.userType == '1') {
                            this.router.navigate(['/admin/company']);
                        }
                        else if (signInRes.userDetails.userType == '2') {
                            if (signInRes.userDetails.pwdResetStatus == 0) {
                                this.router.navigate(['/company/changePassword']);
                            }
                            else {
                                this.router.navigate(['/company/dashboard']);
                            }
                        }
                        else if (signInRes.userDetails.userType == '3') {
                            if (signInRes.userDetails.pwdResetStatus == 0) {
                                this.router.navigate(['/unit/changePassword']);
                            }
                            else {
                                this.router.navigate(['/unit/dashboard']);
                            }
                        }
                        else if (signInRes.userDetails.userType == '4') {
                            if (signInRes.userDetails.pwdResetStatus == 0) {
                                this.router.navigate(['/employee/changePassword']);
                            }
                            else {
                                this.router.navigate(['/employee/dashboard']);
                            }
                        }
                    }
                    else {
                        this.pasonaService.openSnackBar('Invalid Username or Password');
                    }
                } else {
                    this.pasonaService.openSnackBar(signInRes.message);
                }
            }, error => {
                this.pasonaService.stopSpinner();
                this.pasonaService.openSnackBarError('Please connect to server!');
            });
        }
        else {
            // Swal({
            //   type: 'info',
            //   title: 'Please Enter Username and Password!'
            // })
        }
    }

    rememberMe(ev) {
        console.log("ev", ev);
        if (ev.checked) {
            this.cookieService.set('userName', this.loginForm.value.userName);
            this.cookieService.set('password', this.loginForm.value.password);
        }
        else {
            //this.cookieService.deleteAll();  
            this.cookieService.delete('userName');
            this.cookieService.delete('password');
        }
        console.log(this.cookieService);
        // console.log(this.cookieService.get('userName'));  
        // console.log(this.cookieService.get('password'));  
    }

    view(input: any): any {
        input.type = input.type === 'password' ? 'text' : 'password';
        this.see = !this.see;
        setTimeout(() => {
            input.type = input.type === 'password' ? 'text' : 'password';
            this.see=false;
          }, 1000);
    }

    forgotPassDialog() {
        const dialogAp = this.dialog.open(ForgotPassDialogComponent, {
          width: '50vw',
          disableClose: true,
          data: { data: '' }
        });
        dialogAp.afterClosed().subscribe(result => {
          if (result) {
          }
        });
      }
}
