import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogueModule } from 'app/delete-dialog/delete-dialog.module';

const routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'company',
        loadChildren: './view-company/view-company.module#CompanyModule'
    },
    {
        path: 'addCompany',
        loadChildren: './view-company/add-company/add-company.module#AddCompanyModule'
    },
    {
        path: 'editCompany/:id',
        loadChildren: './view-company/edit-company/edit-company.module#EditCompanyModule'
    },
    {
        path: 'changePassword',
        loadChildren: '../pages/change-password/change-password.module#ChangePasswordModule'
    },
    {
        path        : 'notification',
        loadChildren: '../pages/notification/notification.module#NotificationModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatDialogModule,
        DeleteDialogueModule
    ],
    declarations: [],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {
}
