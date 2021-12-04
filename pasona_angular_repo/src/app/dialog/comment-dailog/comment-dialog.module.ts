import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule,MatInputModule,
     MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule,
     MatCardModule,
     MatPaginatorModule,
     MatSortModule,
     MatTooltipModule} from '@angular/material';
     import {MatDialogModule} from '@angular/material/dialog';
    
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { CommentDailogComponent } from './comment-dailog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';

const routes: Routes = [
    {
        path     : '',
        component: CommentDailogComponent,
    }
];

@NgModule({
    declarations: [
        CommentDailogComponent
    ],
    entryComponents: [CommentDailogComponent],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        CdkTableModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        NgxChartsModule,
        FuseSharedModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        FuseWidgetModule,
        MatCardModule,
        ReactiveFormsModule,
        DecryptionPipesModule
    ],
    providers   : [
      
    ],
    exports:[]
})
export class CommentDailogModule
{
}