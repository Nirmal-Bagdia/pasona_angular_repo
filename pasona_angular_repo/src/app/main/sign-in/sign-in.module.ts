import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { SignInComponent } from './sign-in.component';
import { DecryptionPipesModule } from 'app/decryption.pipe.module';

const routes = [
    {
        path     : '',
        component: SignInComponent
    },
    {
        path     : 'login',
        component: SignInComponent
    }
];

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        DecryptionPipesModule,
        FuseSharedModule
    ]
})
export class SignInModule
{
}
