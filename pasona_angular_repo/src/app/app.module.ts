import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './main/guard/guard';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { ErrorService } from './error.service';
import { InfoDialogueModule } from './dialog/info-dialog/info-dialog.module';
import { APP_DATE_FORMATS, AppDateAdapter } from './date.adapter';
import { DateAdapter, MAT_DATE_FORMATS, MatButtonModule } from '@angular/material';
import { DecryptionPipesModule } from './decryption.pipe.module';
import { ForgotPassDialogComponentModule } from './dialog/forgot-pass-dialog/forgot-pass-dialog.module';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: 'red',
    bgsPosition: POSITION.bottomCenter,
    bgsSize: 40,
   // fgsColor: "#CC0000",
    bgsType: SPINNER.rectangleBounce,
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 5, // progress bar thickness
  };

const appRoutes: Routes = [
    // {
    //     path        : 'apps',
    //     loadChildren: './main/apps/apps.module#AppsModule'
    // },D:\Pasona-Latest\Pasona\src\app\main\sign-in
    
    {
        path        : '',
        loadChildren: './main/sign-in/sign-in.module#SignInModule'
    },
    
    {
        path        : 'login/:id',
        loadChildren: './main/sign-in/sign-in.module#SignInModule',
    },
    {
        path        : 'admin',
        loadChildren: './main/admin/admin.module#AdminModule',
        canActivate: [AuthGuard],data: {roles: ['1']}
    },
    {
        path        : 'employee',
        loadChildren: './main/employee-user/employee-user.module#EmployeeUserModule',
        canActivate: [AuthGuard],data: {roles: ['4']}
    },
    {
        path        : 'company',
        loadChildren: './main/company-user/company-user.module#CompanyUserModule',
        canActivate: [AuthGuard],data: {roles: ['2']}
    },
    {
        path        : 'unit',
        loadChildren: './main/unit-user/unit-user.module#UnitUserModule',
        canActivate: [AuthGuard],data: {roles: ['3']}
    },
    
    // {
    //     path        : 'pages',
    //     loadChildren: './main/pages/pages.module#PagesModule'
    // },
    // {
    //     path        : 'ui',
    //     loadChildren: './main/ui/ui.module#UIModule'
    // },
    // {
    //     path        : 'documentation',
    //     loadChildren: './main/documentation/documentation.module#DocumentationModule'
    // },
    // {
    //     path        : 'angular-material-elements',
    //     loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    // },
    {
        path      : '**',
        redirectTo: './main/sign-in/sign-in.module#SignInModule'
    }
];

@NgModule({
    declarations: [
        AppComponent,
      //  DecryptionPipe
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DecryptionPipesModule,
        RouterModule.forRoot(appRoutes,{useHash:true }),
        TranslateModule.forRoot(),
        MatMomentDateModule,
        MatIconModule,
        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatSnackBarModule  ,
        InfoDialogueModule,
        ForgotPassDialogComponentModule,
        LayoutModule,
        AppStoreModule,
        MatButtonModule,
    ],
    bootstrap   : [
        AppComponent
    ],
    providers:[DatePipe,MatSnackBar,{
        provide: ErrorHandler,
        useClass: ErrorService,
       }, /* {provide: DateAdapter, useClass: AppDateAdapter },{
             provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
         } */],
     
       exports:[MatIconModule,/* DecryptionPipe */],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule
{
}
