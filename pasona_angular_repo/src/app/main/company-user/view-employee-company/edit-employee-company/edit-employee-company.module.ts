import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { EditEmployeeCompanyComponent } from './edit-employee-company.component';
import { MatDatepickerModule, MatRadioModule } from '@angular/material';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { Ng2TelInputModule } from 'ng2-tel-input';

const routes: Routes = [
    {
        path     : '',
        component: EditEmployeeCompanyComponent
    }
];

@NgModule({
    declarations: [
        EditEmployeeCompanyComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        DecryptionPipesModule,
        MatButtonModule,
        Ng2TelInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        FuseSharedModule,
        MatRadioModule
    ]
})
export class EditEmployeeModuleCompany
{
}
