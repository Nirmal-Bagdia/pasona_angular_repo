import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
    selector: 'app-dashboard-company',
    templateUrl: './dashboard-company.component.html',
    styleUrls: ['./dashboard-company.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class DashboardCompanyComponent implements OnInit {

    dateNow = Date.now();
    widgetsDashboard: any[];
    dashboardData: any;
    userData: any;
    selectedLanguage:any;
    constructor(
        private pasonaService: PasonaServiceService,
    ) {
        if (this.pasonaService.getLanguage() == 'en') {
            this.pasonaService.language.next('en');
        } else {
            this.pasonaService.language.next('jp');
        }             
        this.userData = this.pasonaService.getUserData();
        this.pasonaService.language.subscribe(res=>{
            this.selectedLanguage=res;
            this.dashboardConfig();
            this.getDashboardInformation();          
        }) 
    }

    ngOnInit(): void {
        // this.getDashboardInformation();
    }

    dashboardConfig(){
        this.widgetsDashboard = [
            {
                'title': this.selectedLanguage == 'en' ? 'Total Unit' : 'Total Unit',
                'data': {
                    'label': 'Unit',
                    'count': 4,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Total Department' : 'Total Department',
                'data': {
                    'label': 'Department',
                    'count': 10,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Total Section' : 'Total Section',
                'data': {
                    'label': 'Section',
                    'count': 40,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Total Employee' : 'Total Employee',
                'data': {
                    'label': 'Employee',
                    'count': 40,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Total Appraisal Plan' : 'Total Appraisal Plan',
                'data': {
                    'label': 'Plan',
                    'count': 8,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Close Appraisal Plan' : 'Close Appraisal Plan',
                'data': {
                    'label': 'Plan',
                    'count': 4,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Active Appraisal Plan' : 'Active Appraisal Plan',
                'data': {
                    'label': 'Plan',
                    'count': 4,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
            {
                'title': this.selectedLanguage == 'en' ? 'Total Appraisal Group' : 'Total Appraisal Group',
                'data': {
                    'label': 'Appraisal Group',
                    'count': 4,
                    'extra': {
                        'label': 'Yesterday\'s overdue',
                        'count': 2
                    }
                },
                'detail': 'You can show some detailed information about this widget in here.'
            },
        ];
    }

    getDashboardInformation() {
        this.pasonaService.startSpinner();
        this.pasonaService.getDashboardInformation(this.userData.companyId).subscribe(resp => {
            this.pasonaService.stopSpinner();
            if (resp.status == '1') {
                this.dashboardData = resp.userDetails;
                this.widgetsDashboard[0].data.count = this.dashboardData.unitCount;
                this.widgetsDashboard[1].data.count = this.dashboardData.departmentCount;
                this.widgetsDashboard[2].data.count = this.dashboardData.sectionCount;
                this.widgetsDashboard[3].data.count = this.dashboardData.employeeCount;
                this.widgetsDashboard[4].data.count = this.dashboardData.appraisalPlanCount;
                this.widgetsDashboard[6].data.count = this.dashboardData.activePlanCount;
                this.widgetsDashboard[5].data.count = this.dashboardData.closePlanCount;
                this.widgetsDashboard[7].data.count = this.dashboardData.appraisalGroupCount;
            }
        }, error => {
            this.pasonaService.stopSpinner();
            this.pasonaService.openSnackBarError('Please connect to server!');
        })
    }

}

