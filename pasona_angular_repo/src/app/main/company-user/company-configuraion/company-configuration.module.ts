import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseSharedModule } from '@fuse/shared.module';
import { CompanyConfiguraionComponent } from './company-configuraion.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { EllipsifyModule } from 'app/ellipsify-me.directive.module';
import { MatCheckboxModule, MatRadioModule } from '@angular/material';
import { FuseWidgetModule } from '@fuse/components';
import { DragDropModule } from '@angular/cdk/drag-drop';


const routes: Routes = [
    {
        path     : '',
        component: CompanyConfiguraionComponent
    }
];

@NgModule({
    declarations: [
        CompanyConfiguraionComponent
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
        DecryptionPipesModule,
        EllipsifyModule,
        MatCheckboxModule,
        FuseWidgetModule,
        MatRadioModule,
        DragDropModule
    ]
})
export class CompanyConfiguraionModule
{
}
