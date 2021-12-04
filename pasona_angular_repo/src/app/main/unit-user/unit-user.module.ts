import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogueModule } from 'app/delete-dialog/delete-dialog.module';
import { changePasswordCheckGuard } from '../guard/changePasswordCheck.guard';

const routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard-unit/dashboard-unit.module#DashboardModuleUnit'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'department',
        loadChildren: '../company-user/view-department-company/view-department-company.module#DepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'addDepartment',
        loadChildren: '../company-user/view-department-company/add-department-company/add-department-company.module#AddDepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'editDepartment/:id',
        loadChildren: '../company-user/view-department-company/edit-department-company/edit-department-company.module#EditDepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'section',
        loadChildren: '../company-user/view-section-company/view-section-company.module#SectionModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'addSection',
        loadChildren: '../company-user/view-section-company/add-section-company/add-section-company.module#AddSectionModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'editSection/:id',
        loadChildren: '../company-user/view-section-company/edit-section-company/edit-section-company.module#EditSectionModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'employee',
        loadChildren: '../company-user/view-employee-company/view-employee-company.module#EmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'addEmployee',
        loadChildren: '../company-user/view-employee-company/add-employee-company/add-employee-company.module#AddEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'bulkUploadEmployee',
        loadChildren: '../company-user/view-employee-company/bulk-upload-employee/bulk-upload-employee.module#BulkUploadEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'editEmployee/:id',
        loadChildren: '../company-user/view-employee-company/edit-employee-company/edit-employee-company.module#EditEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'viewDep',
        loadChildren: './department-goals-unit/view-department-unit.module#DepartmentModuleUnitGoals'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'viewDep/viewDepGoals/:id',
        loadChildren: '../company-user/view-goals-department-company/view-goals.module#GoalsModuleDepartmentCompany'
    },
    {
        path: 'viewDep/viewDepGoals/:id/depGoals/:ids',
        loadChildren: '../company-user/view-goals-department-company/view-department-goals/edit-goals.module#ViewDepartmentGoalEmpCompany'
    },
    {
        path: 'companyGoals',
        loadChildren: './view-goals-company-unit/view-goals.module#GoalsModuleCompanyUnit'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'viewCompanyGoals/:id',
        loadChildren: '../employee-user/view-goals-company-emp/edit-goals/edit-goals.module#GoalsEditModuleCompanyEmployee'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'employees/empGoals/:id',
        loadChildren: '../company-user/view-goals-employee/view-goals.module#GoalsModuleEmployeeCompany'
    },
    {
        path: 'employees',
        loadChildren: './employee-goals-unit/view-employee-unit.module#EmployeeModuleUnitGoals'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'employees/empGoals/:id/editEmpGoals/:ids',
        loadChildren: '../company-user/view-goals-employee/edit-goals/edit-goals.module#EditGoalsModuleEmployeeCompany'
    },
    {
        path: 'changePassword',
        loadChildren: '../pages/change-password/change-password.module#ChangePasswordModule'
    },
    {
        path        : 'notification',
        loadChildren: '../pages/notification/notification.module#NotificationModule'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatDialogModule,
        DeleteDialogueModule
    ],
    declarations: []
})
export class UnitUserModule {
}
