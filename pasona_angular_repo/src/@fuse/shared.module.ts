import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FlexLayoutModule,

        FuseDirectivesModule,
        FusePipesModule
    ]
})
export class FuseSharedModule
{
}
