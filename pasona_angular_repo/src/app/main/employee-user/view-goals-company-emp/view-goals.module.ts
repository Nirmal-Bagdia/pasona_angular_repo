import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FuseSharedModule } from '@fuse/shared.module';

import { ViewGoalsComponent } from './view-goals.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';


const routes: Routes = [
    {
        path     : '',
        component: ViewGoalsComponent
    }
];

@NgModule({
    declarations: [
        ViewGoalsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatDialogModule,
        FuseSharedModule,
        DecryptionPipesModule
    ]
})
export class GoalsModuleCompanyEmployee
{
}
