import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;


    // Private
    private _unsubscribeAll: Subject<any>;
    userData: any;
    notificationData: number = 0;
    interval: any;
    companyName: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _fuseNavigationService: FuseNavigationService,
        public router: Router,
        private pasonaService: PasonaServiceService
    ) {
        this.pasonaService.notification.subscribe(data => {
            this.notificationData = data;
        });
        this.userData = {};
        this.userData = this.pasonaService.getUserData();
        this.companyName = "Pride";
        // this.logo = "assets/images/pasona_logo.png";
        // Set the private defaults
        if (this.userData) {
            if (this.userData.userType != '1') {
                this.companyName = this.pasonaService.getDecrypt(this.userData.companyName);
                // this.logo=userdata.logo;
            }

        }
        // Set the defaults


        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'jp',
                title: 'Japanese',
                flag: 'jp'
            }
        ];


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
        this.getNotificationCountByEmpId();

        this.interval = setInterval(() => {
            this.getNotificationCountByEmpId();
        }, 10000);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {

        let data = {
            companyId: this.userData.companyId,
            uniId: this.userData.unitId,
            id: this.userData.empCode,
            userType: this.userData.userType,
            language: lang.id
        }
        this.pasonaService.updateLanguageType(data).subscribe(dataRes => {
            this.pasonaService.stopSpinner(); 
            if (dataRes.status == '1') {
                // Set the selected language for the toolbar
                this.selectedLanguage = lang;
                this.pasonaService.setLanguage(this.selectedLanguage.id);
                this.pasonaService.language.next(this.selectedLanguage.id);
                this.userData.language = this.selectedLanguage.id;
                this.pasonaService.setUserData(this.userData);
                // Use the selected language for translations
                this._translateService.use(lang.id);
                this.pasonaService.openSnackBar(dataRes.message);
            }
            else {
                this.pasonaService.openSnackBar(dataRes.message);
            }
        }, error => {
            this.pasonaService.stopSpinner();
            // this.pasonaService.openSnackBarError('Please connect to server!');
        });
    }

    logOut() {
        var companyId = JSON.parse(localStorage.getItem('pasonaUserDetails'));
        if (companyId) {
            this.router.navigate(['/login/', companyId]);
        }
        else {
            this.router.navigate(['/login']);
        }
        localStorage.removeItem('pasonaUserDetails');
        sessionStorage.removeItem('pasonaUserDetails');
        this._fuseNavigationService.unregister('main');
    }

    changePassword() {
        var userdata = this.pasonaService.getUserData();
        if (userdata) {
            if (userdata.userType == '1') {
                this.router.navigate(['/admin/changePassword']);
            }
            else if (userdata.userType == '2') {
                this.router.navigate(['/company/changePassword']);
            }
            else if (userdata.userType == '3') {
                this.router.navigate(['/unit/changePassword']);
            }
            else if (userdata.userType == '4') {
                this.router.navigate(['/employee/changePassword']);
            }
            // else{
            //     this.router.navigate(['/login/',userdata.companyId]);
            // }
        }
    }

    showNotificarion() {
        var userdata = this.pasonaService.getUserData();
        if (userdata) {
            if (userdata.userType == '1') {
                this.router.navigate(['/admin/notification']);
            }
            else if (userdata.userType == '2') {
                this.router.navigate(['/company/notification']);
            }
            else if (userdata.userType == '3') {
                this.router.navigate(['/unit/notification']);
            }
            else if (userdata.userType == '4') {
                this.router.navigate(['/employee/notification']);
            }
            // else{
            //     this.router.navigate(['/login/',userdata.companyId]);
            // }
        }
    }

    getNotificationCountByEmpId() {
        if (this.userData) {
            if (this.userData.userType != 1) {
                let data = {
                    companyId: this.userData.companyId,
                    unitId: this.userData.unitId,
                    empId: this.userData.empCode,
                    type: this.userData.userType,
                }
                this.pasonaService.getNotificationCountByEmpId(data).subscribe(dataRes => {
                    this.pasonaService.stopSpinner();
                    if (dataRes.status == '1') {
                        this.pasonaService.updatedNotification(dataRes.notificationDetails);
                        //this.pasonaService.openSnackBar(dataRes.message);
                    }
                    else {
                        //  this.pasonaService.openSnackBar(dataRes.message);
                    }
                }, error => {
                    this.pasonaService.stopSpinner();
                    // this.pasonaService.openSnackBarError('Please connect to server!');
                });

            }
        }
    }

    updateUserData(data) {
        this.pasonaService.updatedDataSelection(data);
    }

    changeDateFormat() {
        this.pasonaService.setDateFormat('yyyy/MM/dd hh:mm a');
    }

}
