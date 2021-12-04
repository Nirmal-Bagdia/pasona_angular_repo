import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { DashboardCompanyComponent } from './dashboard-company.component';
import { MatProgressBarModule, MatTooltipModule } from '@angular/material';
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
        MatTooltipModule,
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
export class DashboardModuleCompany
{
}







