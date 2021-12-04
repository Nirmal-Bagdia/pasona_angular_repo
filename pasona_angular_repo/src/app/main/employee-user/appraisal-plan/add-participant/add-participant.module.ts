import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddParticipantComponent } from './add-participant.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatCheckboxModule } from '@angular/material';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { EllipsifyModule } from 'app/ellipsify-me.directive.module';

const routes: Routes = [
    {
        path     : '',
        component: AddParticipantComponent
    }
];

@NgModule({
    declarations: [
        AddParticipantComponent
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
        MatProgressBarModule,
        FuseSharedModule,
        MatCheckboxModule,
        DecryptionPipesModule,
        EllipsifyModule
    ]
})
export class AddParticipantEmployee
{
}
