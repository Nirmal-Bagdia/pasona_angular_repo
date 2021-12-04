import { FuseNavigation } from '@fuse/types';
import { pasonaModule } from 'app/share/pasona-module';

export const navigationCompany: FuseNavigation[] = [
        {
            id       : 'applications',
            title    : pasonaModule.companyUser,
            translate: 'NAV.companyUser',
            type     : 'group',
            icon     : 'apps',
            children : [
                {
                    id       : 'dashboards',
                    title    : pasonaModule.dashboard,
                    translate: 'NAV.dashboard',
                    type     : 'item',
                    icon     : 'dashboard',
                    url  : '/company/dashboard'
                },
                {
                    id       : 'Unit',
                    title    : pasonaModule.unit.name,
                    translate: 'NAV.unit.name',
                    type     : 'item',
                    icon     : 'group_work',
                    url      : '/company/unit'
                },
                {
                    id       : 'Departments',
                    title    : pasonaModule.department.name,
                    translate: 'NAV.department.name',
                    type     : 'item',
                    icon     : 'domain',
                    url      : '/company/department'
                },
                {
                    id       : 'Sections',
                    title    : pasonaModule.section.name,
                    translate: 'NAV.section.name',
                    type     : 'item',
                    icon     : 'ballot',
                    url      : '/company/section'
                },
                {
                    id       : 'companyParameter',
                    title    : pasonaModule.companyParameter.name,
                    translate: 'NAV.companyParameter.name',
                    type     : 'item',
                    icon     : 'insert_chart',
                    url      : '/company/companyParameter'
                },
                {
                    id       : 'appraisalParameter',
                    title    : pasonaModule.appraisalParameter.name,
                    translate: 'NAV.appraisalParameter.name',
                    type     : 'item',
                    icon     : 'insert_chart',
                    url      : '/company/appraisalParameter'
                },
                {
                    id       : 'configuration',
                    title    : pasonaModule.configuration.name,
                    translate: 'NAV.configuration.name',
                    type     : 'item',
                    icon     : 'settings_applications',
                    url      : '/company/configuration'
                },
                {
                    id       : 'Group',
                    title    : pasonaModule.appraisalGroup.name,
                    translate: 'NAV.appraisalGroup.name',
                    type     : 'item',
                    icon     : 'group',
                    url      : '/company/group'
                },
                {
                    id       : 'EmplomentType',
                    title    : pasonaModule.emptype.name,
                    translate: 'NAV.emptype.name',
                    type     : 'item',
                    icon     : 'person_pin',
                    url      : '/company/empType'
                },
                {
                    id: 'jobtitle',
                    title: pasonaModule.jobTitle.name,
                    translate: 'NAV.jobTitle.name',
                    type: 'item',
                    icon: 'work',
                    url: '/company/jobtitle',
                },
                {
                    id       : 'Roles',
                    title    : pasonaModule.role.name,
                    translate: 'NAV.role.name',
                    type     : 'item',
                    icon     : 'perm_data_setting',
                    url      : '/company/role'
                },
                {
                    id       : 'grade',
                    title    : pasonaModule.grade.name,
                    translate: 'NAV.grade.name',
                    type     : 'item',
                    icon     : 'category',
                    url      : '/company/grade'
                },
                {
                    id       : 'Employees',
                    title    : pasonaModule.employee.name,
                    translate: 'NAV.employee.name',
                    type     : 'item',
                    icon     : 'person',
                    url      : '/company/employee'
                },
                {
                    id       : 'report',
                    title    : pasonaModule.report.name,
                    translate: 'NAV.report.name',
                    type     : 'item',
                    icon     : 'report',
                    url      : '/company/report',
                },
                {
                    id       : 'companygoals',
                    title    : pasonaModule.companyObj.name,
                    translate: 'NAV.companyObj.name',
                    type     : 'item',
                    icon     : 'goal',
                    url      : '/company/goals'
                },
                {
                    id       : 'depgoals',
                    title    : pasonaModule.departmentObj.name,
                    translate: 'NAV.departmentObj.name',
                    type     : 'item',
                    icon     : 'goal',
                    url      : '/company/viewDep'
                },
                {
                    id       : 'empgoals',
                    title    : pasonaModule.employeeObj.name,
                    translate: 'NAV.employeeObj.name',
                    type     : 'item',
                    icon     : 'goal',
                    url      : '/company/appraisalPlan'
                },
              
                {
                    id       : 'aRoles',
                    title    : pasonaModule.assignRole.name,
                    translate: 'NAV.assignRole.name',
                    type     : 'item',
                    icon     : 'assignment_ind',
                    url      : '/company/assignRole'
                },
                // {
                //     id       : 'Settings',
                //     title    : 'Settings',
                //     translate: 'NAV.DASHBOARDS',
                //     type     : 'item',
                //     icon     : 'settings_applications',
                //     url      : '/apps/DASHBOARDS'
                // }
            ]
        }
];
