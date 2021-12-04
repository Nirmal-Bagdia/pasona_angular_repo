import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FuseSharedModule } from '@fuse/shared.module';

import { AddGoalsComponent } from './add-goals.component';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';

const routes: Routes = [
    {
        path     : '',
        component: AddGoalsComponent
    }
];

@NgModule({
    declarations: [
        AddGoalsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        DecryptionPipesModule,
        FuseSharedModule,
    ]
})
export class AddGoalsModuleDepartment
{
}
