import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogueModule } from 'app/delete-dialog/delete-dialog.module';
import { changePasswordCheckGuard } from '../guard/changePasswordCheck.guard';
import { AppraiserGroupDailogModule } from 'app/dialog/appraisal-group-dialog/appraisal-group-dialog.module';
import { CompanyParameterDailogModule } from 'app/dialog/company-parameter-dialog/company-parameter-dialog.module';
import { AppraisalParameterDailogModule } from 'app/dialog/appraisal-parameter-dailog/appraisal-parameter-dailog.module';
import { AppraisalGroupSettingDialogModule } from 'app/dialog/appraisal-group-setting-dialog/appraisal-group-setting-dialog.module';
import {} from './company-configuraion/company-configuration.module'
import { GradeCategoryDialogModule } from 'app/dialog/grade-category-dialog/grade-category-dialog.module';
import { RelativeGroupDialogModule } from 'app/dialog/relative-group-dialog/relative-group-dialog.module';
const routes = [
    {
        path        : 'dashboard',
        loadChildren: './dashboard-company/dashboard-company.module#DashboardModuleCompany',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'unit',
        loadChildren: './view-unit-company/view-unit-company.module#UnitModuleCompany',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addUnit',
        loadChildren: './view-unit-company/add-unit-company/add-unit-company.module#AddUnitModuleCompany',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editUnit/:id',
        loadChildren: './view-unit-company/edit-unit-company/edit-unit-company.module#DetailsUnitModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'department',
        loadChildren: './view-department-company/view-department-company.module#DepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addDepartment',
        loadChildren: './view-department-company/add-department-company/add-department-company.module#AddDepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editDepartment/:id',
        loadChildren: './view-department-company/edit-department-company/edit-department-company.module#EditDepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'group',
        loadChildren: './group-company/group.module#GroupModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addGroup',
        loadChildren: './group-company/add-group/add-group.module#AddGroupModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editGroup/:id',
        loadChildren: './group-company/edit-group/edit-group.module#EditGroupModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'groupSetting/:id',
        loadChildren: './group-company/appraisal-group-setting/appraisal-group-setting.module#AppraisalGroupSettingModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'configuration',
        loadChildren: './company-configuraion/company-configuration.module#CompanyConfiguraionModule'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'goals',
        loadChildren: './view-goals-company/view-goals.module#GoalsModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addGoals',
        loadChildren: './view-goals-company/add-goals/add-goals.module#AddGoalsModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editGoals/:id',
        loadChildren: './view-goals-company/edit-goals/edit-goals.module#GoalsEditModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'viewDep',
        loadChildren: './view-goals-department-company/view-department-com/view-department-company.module#ViewDepartmentModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'viewDep/viewDepGoals/:id',
        loadChildren: './view-goals-department-company/view-goals.module#GoalsModuleDepartmentCompany'
       
    },
    {
        path        : 'viewDep/viewDepGoals/:id/depGoals/:ids',
        loadChildren: './view-goals-department-company/view-department-goals/edit-goals.module#ViewDepartmentGoalEmpCompany'
       
    },
    {
        path        : 'employees/:appId/empGoals/:id',
        loadChildren: './view-goals-employee/view-goals.module#GoalsModuleEmployeeCompany'
    },
    {
        path        : 'employees/:appId',
        loadChildren: './view-goals-employee/view-employee-company/view-employee-company.module#EmployeeModuleCompanyEmp'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'appraisalPlan',
        loadChildren: './view-goals-employee/appraisal-plan/appraisal-plan.module#AppraisalPlanCompanyModule'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'employees/:appId/empGoals/:id/editEmpGoals/:ids',
        loadChildren: './view-goals-employee/edit-goals/edit-goals.module#EditGoalsModuleEmployeeCompany'
    },
    {
        path        : 'empType',
        loadChildren: './view-emptype-company/view-emptype.module#EmpTypeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addempType',
        loadChildren: './view-emptype-company/add-emptype/add-emptype.module#AddEmpTypeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editempType/:id',
        loadChildren: './view-emptype-company/edit-emptype/edit-emptype.module#EditEmpTypeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'section',
        loadChildren: './view-section-company/view-section-company.module#SectionModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addSection',
        loadChildren: './view-section-company/add-section-company/add-section-company.module#AddSectionModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editSection/:id',
        loadChildren: './view-section-company/edit-section-company/edit-section-company.module#EditSectionModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'role',
        loadChildren: './role-mgnt/role-mgnt.module#RoleMgntModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addRole',
        loadChildren: './role-mgnt/add-role/add-role.module#AddRoleModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editRole/:id',
        loadChildren: './role-mgnt/edit-role/edit-role.module#EditRoleModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'employee',
        loadChildren: './view-employee-company/view-employee-company.module#EmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addEmployee',
        loadChildren: './view-employee-company/add-employee-company/add-employee-company.module#AddEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'bulkUploadEmployee',
        loadChildren: './view-employee-company/bulk-upload-employee/bulk-upload-employee.module#BulkUploadEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editEmployee/:id',
        loadChildren: './view-employee-company/edit-employee-company/edit-employee-company.module#EditEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'changePassword',
        loadChildren: '../pages/change-password/change-password.module#ChangePasswordModule'
    },
    {
        path        : 'notification',
        loadChildren: '../pages/notification/notification.module#NotificationModule'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'assignRole',
        loadChildren: './assign-role/assign-role.module#AssignRoleModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addAssignRole',
        loadChildren: './assign-role/add-assign-role/add-assign-role.module#AddAssignRoleModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editAssignRole/:id',
        loadChildren: './assign-role/edit-assign-role/edit-assign-role.module#EditAssignRoleModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'groupDetails/:id',
        loadChildren: './group-company/group-employee/group-employee.module#GroupEmployeeModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'companyParameter',
        loadChildren: './company-parameter/company-parameter.module#CompanyParametersModule'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'grade',
        loadChildren: './grade-category/grade-category.module#GradeCategoryModule'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'appraisalParameter',
        loadChildren: '../employee-user/appraisal-parameter/appraisal-parameter.module#AppraisalParameterModule',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'report',
        loadChildren: '../employee-user/report/report.module#ReportModule',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'jobtitle',
        loadChildren: './job-titles/job-titles.module#JobTitlesModuleCompany',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'addJobtitle',
        loadChildren: './job-titles/add-job-titles/add-job-titles.module#AddJobTitlesModuleCompany',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path        : 'editJobtitle/:id',
        loadChildren: './job-titles/edit-job-titles/edit-job-titles.module#EditJobTitlesModuleCompany'
        ,canActivate: [changePasswordCheckGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatDialogModule,
        DeleteDialogueModule,
        AppraiserGroupDailogModule,
        CompanyParameterDailogModule,
        AppraisalParameterDailogModule,
        AppraisalGroupSettingDialogModule,
        GradeCategoryDialogModule,
        RelativeGroupDialogModule
    ],
    declarations: []
})
export class CompanyUserModule
{
}
