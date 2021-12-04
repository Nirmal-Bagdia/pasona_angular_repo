import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardCompanyComponent } from './dashboard-company.component';
import { MatProgressBarModule, MatDividerModule, MatMenuModule, MatTableModule, MatTabsModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';

const routes: Routes = [
    {
        path     : '',
        component: DashboardCompanyComponent
    }
];

@NgModule({
    declarations: [
        DashboardCompanyComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatProgressBarModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule,
        DecryptionPipesModule
    ]
})
export class DashboardModuleUnit
{
}

