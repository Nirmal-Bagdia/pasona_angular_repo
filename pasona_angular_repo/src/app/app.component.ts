import { Component, Inject, OnDestroy, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationJapanese } from 'app/navigation/i18n/jp';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { WebSocketServiceService } from './share/web-socket-service.service';
import { WebSocketAPI } from './WebSocketAPI';
import { PasonaServiceService } from './share/pasona-service.service';
import { Router, NavigationStart } from '@angular/router';
export let browserRefresh=false;

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    webSocketAPI: WebSocketAPI;
    greeting: any;
    name: string;
    subscription: Subscription;
    
    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private router: Router,
       // private webSocketService: WebSocketServiceService
       public pasonaService :PasonaServiceService
    )
    {
        this.matIconRegistry.addSvgIcon(
            "goal",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/goal.svg")
          );
          this.matIconRegistry.addSvgIcon(
            "plan",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/plan.svg")
          );

        // Add languages
        this._translateService.addLangs(['en', 'jp']);
        let userData = this.pasonaService.getUserData();
        // Set the default language
        this._translateService.setDefaultLang('en');
        if(userData)
        {
          this._translateService.use(userData.language);
        }
         this.pasonaService.setLanguage('en');
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationJapanese);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;

                // Boxed
                if ( this.fuseConfig.layout.width === 'boxed' )
                {
                    this.document.body.classList.add('boxed');
                }
                else
                {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for ( let i = 0; i < this.document.body.classList.length; i++ )
                {
                    const className = this.document.body.classList[i];

                    if ( className.startsWith('theme-') )
                    {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });

            //this.webSocketAPI = new WebSocketAPI(new AppComponent());
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

  /*   @HostListener('window:beforeunload')
  async ngOnDestroy() {
    await sessionStorage.removeItem('pasonaUserDetails');
  } */

  /*   @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
              browserRefresh = !this.router.navigated;
              if(!browserRefresh)
              sessionStorage.removeItem('pasonaUserDetails');
            }
          });        
}
 */
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    connect(){
        this.webSocketAPI._connect();
      }
    
      disconnect(){
        this.webSocketAPI._disconnect();
      }
    
      sendMessage(){
        this.webSocketAPI._send(this.name);
      }
    
      handleMessage(message){
        this.greeting = message;
      }
}
