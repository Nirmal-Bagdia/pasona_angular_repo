import { FuseNavigation } from '@fuse/types';
import { pasonaModule } from 'app/share/pasona-module';

export const navigationEmployee: FuseNavigation[] = [

    {
        id: 'applications',
        title: pasonaModule.employeeUser,
        translate: 'NAV.employeeUser',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: pasonaModule.dashboard,
                translate: 'NAV.dashboard',
                type: 'item',
                icon: 'dashboard',
                url: '/employee/dashboard',
                moduleId: 1,
                read: true,
                write: false
            },
            {
                id: 'Unit',
                title: pasonaModule.unit.name,
                translate: 'NAV.unit.name',
                type: 'item',
                icon: 'group_work',
                url: '/employee/unit',
                moduleId: 2,
                read: true,
                write: false
            },
            {
                id: 'Departments',
                title: pasonaModule.department.name,
                translate: 'NAV.department.name',
                type: 'item',
                icon: 'domain',
                url: '/employee/department',
                moduleId: 3,
                read: true,
                write: false
            },
            {
                id: 'Sections',
                title: pasonaModule.section.name,
                translate: 'NAV.section.name',
                type: 'item',
                icon: 'ballot',
                url: '/employee/section',
                moduleId: 4,
                read: true,
                write: false
            },
            {
                id       : 'companyParameter',
                title    : pasonaModule.companyParameter.name,
                translate: 'NAV.companyParameter.name',
                type     : 'item',
                icon     : 'insert_chart',
                url      : '/employee/companyParameter',
                moduleId : 20,
                read: true,
                write: false
            },
            {
                id       : 'appraisalParameter',
                title    : pasonaModule.appraisalParameter.name,
                translate: 'NAV.appraisalParameter.name',
                type     : 'item',
                icon     : 'insert_chart',
                url      : '/employee/appraisalParameter',
                moduleId : 15,
                read: true,
                write: false
            },
            {
                id       : 'configuration',
                title    : pasonaModule.configuration.name,
                translate: 'NAV.configuration.name',
                type     : 'item',
                icon     : 'settings_applications',
                url      : '/employee/configuration',
                moduleId : 21,
                read: true,
                write: false
            },
            {
                id: 'Group',
                title: pasonaModule.appraisalGroup.name,
                translate: 'NAV.appraisalGroup.name',
                type: 'item',
                icon: 'group',
                url: '/employee/group',
                moduleId: 5,
                read: true,
                write: false
            },
            {
                id: 'EmplomentType',
                title: pasonaModule.emptype.name,
                translate: 'NAV.emptype.name',
                type: 'item',
                icon: 'person_pin',
                url: '/employee/empType',
                moduleId: 6,
                read: true,
                write: false
            }, 
            {
                id: 'jobtitle',
                title: pasonaModule.jobTitle.name,
                translate: 'NAV.jobTitle.name',
                type: 'item',
                icon: 'work',
                url: '/employee/jobtitle',
                moduleId: 16,
                read: true,
                write: false
            },
            {
                id       : 'Roles',
                title    : pasonaModule.role.name,
                translate: 'NAV.role.name',
                type     : 'item',
                icon     : 'perm_data_setting',
                url      : '/employee/role',
                moduleId: 11,
                read: true,
                write: false
            },
            {
                id       : 'grade',
                title    : pasonaModule.grade.name,
                translate: 'NAV.grade.name',
                type     : 'item',
                icon     : 'category',
                url      : '/employee/grade',
                moduleId: 22,
                read: true,
                write: false
            },
            {
                id: 'Employees',
                title: pasonaModule.employee.name,
                translate: 'NAV.employee.name',
                type: 'item',
                icon: 'person',
                url: '/employee/employee',
                moduleId: 7,
                read: true,
                write: false
            },
            {
                id: 'comgoals',
                title: pasonaModule.companyObj.name,
                translate: 'NAV.companyObj.name',
                type: 'item',
                icon: 'goal',
                url: '/employee/companyGoals',
                moduleId: 8,
                read: true,
                write: false
            },
            {
                id: 'Departmentsgoal',
                title: pasonaModule.departmentObj.name,
                translate: 'NAV.departmentObj.name',
                type: 'item',
                icon: 'goal',
                url: '/employee/depGoals',
                moduleId: 9,
                read: true,
                write: false
            },
            {
                id: 'empgoals',
                title: pasonaModule.employeeObj.name,
                translate: 'NAV.employeeObj.name',
                type: 'item',
                icon: 'goal',
                url: '/employee/empAppraisalPlans',
                moduleId: 10,
                read: true,
                write: false
            },  
            {
                id       : 'aRoles',
                title    : pasonaModule.assignRole.name,
                translate: 'NAV.assignRole.name',
                type     : 'item',
                icon     : 'assignment_ind',
                url      : '/employee/assignRole',
                moduleId: 12,
                read: true,
                write: false
            },
          
            {
                id       : 'appraisalPlan',
                title    : pasonaModule.appraisalPlan.name,
                translate: 'NAV.appraisalPlan.name',
                type     : 'item',
                icon     : 'plan',
                url      : '/employee/appraisalPlan',
                moduleId : 13,
                read: true,
                write: false
            },
            {
                id       : 'myappraisees',
                title    : pasonaModule.myAppraisees.name,
                translate: 'NAV.myAppraisees.name',
                type     : 'item',
                icon     : 'supervised_user_circle',
                url      : '/employee/appraisalPlans',
                moduleId : 14,
                read: true,
                write: false
            },
            {
                id       : 'report',
                title    : pasonaModule.report.name,
                translate: 'NAV.report.name',
                type     : 'item',
                icon     : 'report',
                url      : '/employee/report',
                moduleId : 23,
                read: true,
                write: false
            },
        ]
    }
];
