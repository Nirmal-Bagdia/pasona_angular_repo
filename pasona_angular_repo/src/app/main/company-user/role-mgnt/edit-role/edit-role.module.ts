import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { EditRoleComponent } from './edit-role.component';
import { MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';

const routes: Routes = [
    {
        path     : '',
        component: EditRoleComponent
    }
];

@NgModule({
    declarations: [
        EditRoleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatCheckboxModule,
        FuseSharedModule,
        ReactiveFormsModule,
        FormsModule,
        DecryptionPipesModule
    ]
})
export class EditRoleModuleCompany
{
}
