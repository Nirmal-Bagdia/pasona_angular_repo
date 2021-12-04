import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogueModule } from 'app/delete-dialog/delete-dialog.module';
import { AppraisalPlanDailogModule } from 'app/dialog/add-appraisal-plan-dailog/add-appraisal-plan-dailog.module';
import { RoleGuard } from '../guard/role.guard';
import { EmployeeDailogModule } from 'app/dialog/employee-list-dialog/employee-list-dialog.module';
import { CommentDailogModule } from 'app/dialog/comment-dailog/comment-dialog.module';
import { GoalPreviewDailogModule } from 'app/dialog/goal-preview-dailog/goal-preview-dailog.module';
import { AppraisalParameterDailogModule } from 'app/dialog/appraisal-parameter-dailog/appraisal-parameter-dailog.module';
import { AddAppraiserDailogModule } from 'app/dialog/add-appraiser-dialog/add-appraiser-dialog.module';
import { NotesDailogModule } from 'app/dialog/notes-dialog/notes-dialog.module';
import { MessageDailogModule } from 'app/dialog/message-dialog/message-dialog.module';
import { FileReviewDailogModule } from 'app/dialog/file-review-dialog/file-review-dialog.module';
import { changePasswordCheckGuard } from '../guard/changePasswordCheck.guard';
import { SendAlertDailogModule } from 'app/dialog/send-alert/send-alert.module';
import { AppraiserGroupDailogModule } from 'app/dialog/appraisal-group-dialog/appraisal-group-dialog.module';
import { DateFormDailogModule } from 'app/dialog/date-form-dialog/date-form-dialog.module';
import { CommentRatingDailogModule } from 'app/dialog/comment-rating-dialog/comment-rating-dialog.module';
import { CompanyParameterDailogModule } from 'app/dialog/company-parameter-dialog/company-parameter-dialog.module';
import { AppraisalGroupSettingDialogModule } from 'app/dialog/appraisal-group-setting-dialog/appraisal-group-setting-dialog.module';
import { GradeCategoryDialogModule } from 'app/dialog/grade-category-dialog/grade-category-dialog.module';
import { RelativeGroupDialogModule } from 'app/dialog/relative-group-dialog/relative-group-dialog.module';

const routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard-employee/dashboard.module#DashboardModuleEmployee',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'unit',
        loadChildren: '../company-user/view-unit-company/view-unit-company.module#UnitModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [2, false] }
    },
    {
        path: 'addUnit',
        loadChildren: '../company-user/view-unit-company/add-unit-company/add-unit-company.module#AddUnitModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [2, true] }
    },
    {
        path: 'editUnit/:id',
        loadChildren: '../company-user/view-unit-company/edit-unit-company/edit-unit-company.module#DetailsUnitModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [2, false] }
    },
    {
        path: 'department',
        loadChildren: '../company-user/view-department-company/view-department-company.module#DepartmentModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [3, false] }
    },
    {
        path: 'addDepartment',
        loadChildren: '../company-user/view-department-company/add-department-company/add-department-company.module#AddDepartmentModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [3, true] }
    },
    {
        path: 'editDepartment/:id',
        loadChildren: '../company-user/view-department-company/edit-department-company/edit-department-company.module#EditDepartmentModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [3, false] }
    },
    {
        path: 'section',
        loadChildren: '../company-user/view-section-company/view-section-company.module#SectionModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [4, false] }
    },
    {
        path: 'addSection',
        loadChildren: '../company-user/view-section-company/add-section-company/add-section-company.module#AddSectionModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [4, true] }
    },
    {
        path: 'editSection/:id',
        loadChildren: '../company-user/view-section-company/edit-section-company/edit-section-company.module#EditSectionModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [4, false] }
    },
    {
        path: 'employee',
        loadChildren: '../company-user/view-employee-company/view-employee-company.module#EmployeeModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [7, false] }
    },
    {
        path: 'addEmployee',
        loadChildren: '../company-user/view-employee-company/add-employee-company/add-employee-company.module#AddEmployeeModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [7, true] }
    },
    {
        path: 'bulkUploadEmployee',
        loadChildren: '../company-user/view-employee-company/bulk-upload-employee/bulk-upload-employee.module#BulkUploadEmployeeModuleCompany'
        , canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [7, true] }
    },
    {
        path: 'editEmployee/:id',
        loadChildren: '../company-user/view-employee-company/edit-employee-company/edit-employee-company.module#EditEmployeeModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [7, false] }
    },
    {
        path: 'group',
        loadChildren: '../company-user/group-company/group.module#GroupModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [5, false] }
    },
    {
        path: 'addGroup',
        loadChildren: '../company-user/group-company/add-group/add-group.module#AddGroupModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [5, true] }
    },
    {
        path: 'editGroup/:id',
        loadChildren: '../company-user/group-company/edit-group/edit-group.module#EditGroupModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [5, false] }
    },
    {
        path: 'groupDetails/:id',
        loadChildren: '../company-user/group-company/group-employee/group-employee.module#GroupEmployeeModuleCompany'
        , canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [5, false] }
    },
    {
        path        : 'groupSetting/:id',
        loadChildren: '../company-user/group-company/appraisal-group-setting/appraisal-group-setting.module#AppraisalGroupSettingModuleCompany'
        , canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [5, false] }
    },
    {
        path: 'empType',
        loadChildren: '../company-user/view-emptype-company/view-emptype.module#EmpTypeModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [6, false] }
    },
    {
        path: 'addempType',
        loadChildren: '../company-user/view-emptype-company/add-emptype/add-emptype.module#AddEmpTypeModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [6, true] }
    },
    {
        path: 'editempType/:id',
        loadChildren: '../company-user/view-emptype-company/edit-emptype/edit-emptype.module#EditEmpTypeModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [6, false] }
    },
    {
        path: 'role',
        loadChildren: '../company-user/role-mgnt/role-mgnt.module#RoleMgntModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [11, false] }
    },
    {
        path: 'addRole',
        loadChildren: '../company-user/role-mgnt/add-role/add-role.module#AddRoleModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [11, true] }
    },
    {
        path: 'editRole/:id',
        loadChildren: '../company-user/role-mgnt/edit-role/edit-role.module#EditRoleModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [11, false] }
    },
    {
        path: 'empGoals/:id',
        loadChildren: './view-goals/view-goals.module#GoalsModuleEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard, changePasswordCheckGuard], data: { roles: [10, false] }
    },
    {
        path: 'addGoals/:id',
        loadChildren: './view-goals/add-goals/add-goals.module#AddGoalsModuleEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [10, true] }
    },
    {
        path: 'editGoals/:id/:ids',
        loadChildren: './view-goals/edit-goals/edit-goals.module#EditGoalsModuleEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [10, false] }
    },
    {
        path: 'companyGoals',
        loadChildren: './view-goals-company-emp/view-goals.module#GoalsModuleCompanyEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [8, false] }
    },
    {
        path: 'viewCompanyGoals/:id',
        loadChildren: './view-goals-company-emp/edit-goals/edit-goals.module#GoalsEditModuleCompanyEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [8, false] }
    },
    {
        path: 'addCompanyGoals',
        loadChildren: '../company-user/view-goals-company/add-goals/add-goals.module#AddGoalsModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [8, true] }
    },
    {
        path: 'editCompanyGoals/:id',
        loadChildren: '../company-user/view-goals-company/edit-goals/edit-goals.module#GoalsEditModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [8, true] }
    },
    {
        path: 'changePassword',
        loadChildren: '../pages/change-password/change-password.module#ChangePasswordModule'
    },
    {
        path: 'notification',
        loadChildren: '../pages/notification/notification.module#NotificationModule',
        canActivate: [changePasswordCheckGuard]
    },
    {
        path: 'depGoals',
        loadChildren: './view-goals-department/view-goals.module#GoalsModuleDepartment',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [9, false] }
    },
    {
        path: 'viewDepGoals/:id',
        loadChildren: './view-goals-department/view-department-goals/edit-goals.module#ViewDepartmentGoalEmp',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [9, false] }
    },
    {
        path: 'addDepGoals',
        loadChildren: './view-goals-department/add-goals/add-goals.module#AddGoalsModuleDepartment',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [9, true] }
    },
    {
        path: 'editDepGoals/:id',
        loadChildren: './view-goals-department/edit-goals/edit-goals.module#GoalsEditModuleDepartment',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [9, true] }
    },
    {
        path: 'assignRole',
        loadChildren: '../company-user/assign-role/assign-role.module#AssignRoleModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [12, false] }
    },
    {
        path: 'addAssignRole',
        loadChildren: '../company-user/assign-role/add-assign-role/add-assign-role.module#AddAssignRoleModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [12, true] }
    },
    {
        path: 'editAssignRole/:id',
        loadChildren: '../company-user/assign-role/edit-assign-role/edit-assign-role.module#EditAssignRoleModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [12, false] }
    },
    {
        path        : 'jobtitle',
        loadChildren: '../company-user/job-titles/job-titles.module#JobTitlesModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [16, false] }
    },
    {
        path        : 'report',
        loadChildren: './report/report.module#ReportModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [23, false] }
    },
    {
        path        : 'addJobtitle',
        loadChildren: '../company-user/job-titles/add-job-titles/add-job-titles.module#AddJobTitlesModuleCompany',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [16, true] }
    },
    {
        path        : 'editJobtitle/:id',
        loadChildren: '../company-user/job-titles/edit-job-titles/edit-job-titles.module#EditJobTitlesModuleCompany'
        ,  canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [16, false] }
    },
    {
        path: 'appraisalPlan',
        loadChildren: './appraisal-plan/appraisal-plan.module#AppraisalPlanModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [13, true] }
    },
    {
        path: 'viewPlan/:id',
        loadChildren: './appraisal-plan/view-plan/view-plan.module#ViewPlanEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [13, true] }
    },
    {
        path: 'viewPlan/:id/addParticipant',
        loadChildren: './appraisal-plan/add-participant/add-participant.module#AddParticipantEmployee',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [13, true] }
    },
    {
        path: 'viewPlan/:id/employees/:ids/:groupId',
        loadChildren: './appraisal-plan/employee-participant/employee-participant.module#EmployeeParticipantModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [13, true] }
    },
    
    
    {
        path: 'myAppraisees/:id',
        loadChildren: './my-appraisees/my-appraisees.module#MyAppraiseesModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [14, true] }
    },
    {
        path: 'appraisalPlans',
        loadChildren: './my-appraisees/appraisal-plan/appraisal-plan.module#AppraisalPlanAppraiserModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [14, true] }
    },
    {
        path: 'empAppraisalPlans',
        loadChildren: './view-goals/appraisal-plan/appraisal-plan.module#AppraisalPlanAppraiseeModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [10, false] }
    },
    {
        path: 'appraisalParameter',
        loadChildren: './appraisal-parameter/appraisal-parameter.module#AppraisalParameterModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [15, false] }
    },
    {
        path        : 'companyParameter',
        loadChildren: '../company-user/company-parameter/company-parameter.module#CompanyParametersModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [20, false] }
    },
    {
        path        : 'configuration',
        loadChildren: '../company-user/company-configuraion/company-configuration.module#CompanyConfiguraionModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [21, false] }
    },
    {
        path        : 'grade',
        loadChildren: '../company-user/grade-category/grade-category.module#GradeCategoryModule'
        , canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [22, false] }
    },
    {
        path: 'myAppraisees/:id/consolidateSheet/:ids',
        loadChildren: './my-appraisees/raring-consolidator-view/raring-consolidator-view.module#RaringConsolidatorViewModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [14, false] }
    },
    {
        path: 'myAppraisees/:id/finalApprover/:ids',
        loadChildren: './my-appraisees/final-approver-view/final-approver-view.module#FinalApproverViewModule',
        canActivate: [RoleGuard, changePasswordCheckGuard], data: { roles: [14, false] }
    },
    {
        path: 'myAppraisees/:id/viewEmpGoals/:ids/:id',
        loadChildren: '../company-user/view-goals-employee/edit-goals/edit-goals.module#EditGoalsModuleEmployeeCompany'
    },
    {
        path: 'goals/viewEmpGoals/:ids/:id',
        loadChildren: '../company-user/view-goals-employee/edit-goals/edit-goals.module#EditGoalsModuleEmployeeCompany'
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
        DeleteDialogueModule,
        EmployeeDailogModule,
        AppraisalPlanDailogModule,
        CommentDailogModule,
        GoalPreviewDailogModule,
        AppraisalParameterDailogModule,
        AddAppraiserDailogModule,
        NotesDailogModule,
        MessageDailogModule,
        FileReviewDailogModule,
        SendAlertDailogModule,
        AppraiserGroupDailogModule,
        DateFormDailogModule,
        CommentRatingDailogModule,
        CompanyParameterDailogModule,
        AppraisalGroupSettingDialogModule,
        GradeCategoryDialogModule,
        RelativeGroupDialogModule
    ],
    declarations: []
})
export class EmployeeUserModule {
}
