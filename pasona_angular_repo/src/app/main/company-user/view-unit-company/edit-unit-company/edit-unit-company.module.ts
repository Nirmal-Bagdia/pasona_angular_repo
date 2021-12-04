import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FuseSharedModule } from '@fuse/shared.module';

import { EditUnitCompanyComponent } from './edit-unit-company.component';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { Ng2TelInputModule } from 'ng2-tel-input';

const routes: Routes = [
    {
        path     : '',
        component: EditUnitCompanyComponent
    }
];

@NgModule({
    declarations: [
        EditUnitCompanyComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        Ng2TelInputModule,
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
export class DetailsUnitModuleCompany
{
}
