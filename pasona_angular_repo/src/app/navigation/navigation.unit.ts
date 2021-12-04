import { FuseNavigation } from '@fuse/types';
import { pasonaModule } from 'app/share/pasona-module';

export const navigationUnit: FuseNavigation[] = [

    {
        id       : 'applications',
        title    : pasonaModule.unitUser,
        translate: 'NAV.unitUser',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : pasonaModule.dashboard,
                translate: 'NAV.dashboard',
                type     : 'item',
                icon     : 'dashboard',
                url  : '/unit/dashboard'
            },
            {
                id       : 'Departments',
                title    : pasonaModule.department.name,
                translate: 'NAV.department.name',
                type     : 'item',
                icon     : 'domain',
                url      : '/unit/department'
            },
            {
                id       : 'Sections',
                title    : pasonaModule.section.name,
                translate: 'NAV.section.name',
                type     : 'item',
                icon     : 'ballot',
                url      : '/unit/section'
            },
            {
                id       : 'Employees',
                title    : pasonaModule.employee.name,
                translate: 'NAV.employee.name',
                type     : 'item',
                icon     : 'person',
                url      : '/unit/employee'
            },
            {
                id       : 'comgoals',
                title    : pasonaModule.companyObj.name,
                translate: 'NAV.companyObj.name',
                type     : 'item',
                icon     : 'goal',
                url      : '/unit/companyGoals'
            },
            {
                id       : 'Departentgoals',
                title    : pasonaModule.departmentObj.name,
                translate: 'NAV.departmentObj.name',
                type     : 'item',
                icon     : 'goal',
                url      : '/unit/viewDep'
            },
            {
                id       : 'empgoals',
                title    : pasonaModule.employeeObj.name,
                translate: 'NAV.employeeObj.name',
                type     : 'item',
                icon     : 'goal',
                url      : '/unit/employees'
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
