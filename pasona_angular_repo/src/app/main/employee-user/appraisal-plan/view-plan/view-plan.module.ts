import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { ViewPlanComponent } from './view-plan.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatDatepickerModule, MAT_DATE_LOCALE, MatTabsModule } from '@angular/material';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { EllipsifyModule } from 'app/ellipsify-me.directive.module';

const routes: Routes = [
    {
        path     : '',
        component: ViewPlanComponent
    }
];

@NgModule({
    declarations: [
        ViewPlanComponent
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
        MatDatepickerModule,
        DecryptionPipesModule,
        EllipsifyModule,
        MatTabsModule
    ],
    providers:[{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
    
})
export class ViewPlanEmployee
{
}
