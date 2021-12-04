import { FuseNavigation } from '@fuse/types';
import {pasonaModule} from './../share/pasona-module';

export const navigationAdmin: FuseNavigation[] = [

        {
            id       : 'applications',
            title    : pasonaModule.adminUser,
            translate: 'NAV.adminUser',
            type     : 'group',
            icon     : 'apps',
            children : [
                {
                    id       : 'dashboards',
                    title    : pasonaModule.dashboard,
                    translate: 'NAV.dashboard',
                    type     : 'item',
                    icon     : 'dashboard',
                    url  : '/admin/dashboard'
                },
                {
                    id       : 'Companies',
                    title    : pasonaModule.company.name,
                    translate: 'NAV.company.name',
                    type     : 'item',
                    icon     : 'business',
                    url      : '/admin/company'
                },
                // {
                //     id       : 'Settings',
                //     title    : 'Settings',
                //     translate: 'NAV.DASHBOARDS',
                //     type     : 'item',
                //     icon     : 'settings_applications',
                //     url      : '/apps/calendar'
                // }
            ]
        }
];
