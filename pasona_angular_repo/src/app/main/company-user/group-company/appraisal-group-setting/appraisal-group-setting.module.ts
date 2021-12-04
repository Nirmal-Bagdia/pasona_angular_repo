import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FuseSharedModule } from '@fuse/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AppraisalGroupSettingComponent } from './appraisal-group-setting.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { EllipsifyModule } from 'app/ellipsify-me.directive.module';
import { FuseWidgetModule } from '@fuse/components';
import { MatCheckboxModule, MatRadioModule,MatTabsModule } from '@angular/material';


const routes: Routes = [
    {
        path     : '',
        component: AppraisalGroupSettingComponent
    }
];

@NgModule({
    declarations: [
        AppraisalGroupSettingComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatStepperModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTabsModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        DecryptionPipesModule,
        EllipsifyModule,
        DragDropModule
    ]
})
export class AppraisalGroupSettingModuleCompany
{
}
