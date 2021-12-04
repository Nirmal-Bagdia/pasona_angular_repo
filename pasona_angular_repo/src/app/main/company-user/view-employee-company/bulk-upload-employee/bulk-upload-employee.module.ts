import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { BulkUploadEmployeeComponent } from './bulk-upload-employee.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';

const routes: Routes = [
    {
        path     : '',
        component: BulkUploadEmployeeComponent
    }
];

@NgModule({
    declarations: [
        BulkUploadEmployeeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        FuseSharedModule,
        DecryptionPipesModule,
        MatRadioModule
    ]
})
export class BulkUploadEmployeeModuleCompany
{
}
