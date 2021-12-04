import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';
import { MatTooltipModule } from '@angular/material';
import { EllipsifyModule } from 'app/ellipsify-me.directive.module';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        DecryptionPipesModule,
        EllipsifyModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
