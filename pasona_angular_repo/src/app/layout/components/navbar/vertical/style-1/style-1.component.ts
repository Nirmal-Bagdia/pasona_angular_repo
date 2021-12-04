import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
    selector     : 'navbar-vertical-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;
    companyName: any;
    logo: string;
    @ViewChild('myCanvas', { static: false }) canvas: ElementRef;
    canvasEl: any;ctx: CanvasRenderingContext2D;
    imageObj: HTMLImageElement;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private pasonaService:PasonaServiceService
    )
    {
        this.companyName="pride";
        this.logo = "assets/images/pasona_logo.png";
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        var userdata=this.pasonaService.getUserData();
        if(userdata)
        {
            if(userdata.userType!='1')
            {
             this.companyName=this.pasonaService.getDecrypt(userdata.companyName);
             this.logo=userdata.logo;
             this.imageObj = new Image();    
             this.imageObj.src = this.logo;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective, {static: true})
    set directive(theDirective: FusePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        this._fusePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this._fuseSidebarService.getSidebar('navbar') )
                    {
                        this._fuseSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });
    }
    ngAfterViewInit()
    {
      //  setTimeout(e => this.convertImgToDataURLviaCanvas(this.logo,64,275), 5000);
      this.convertImgToDataURLviaCanvas(this.logo,64,280);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void
    {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }

    
    convertImgToDataURLviaCanvas(url,height,width) {
      //  var imageObj = new Image();
        if(this.canvas)
        {
            this.canvasEl = this.canvas.nativeElement;
            this.ctx = this.canvasEl.getContext('2d');
            this.canvasEl.width = width;
            this.canvasEl.height = height;
            //this.draw(this.imageObj,height,width)
          // imageObj.src = url;
         setTimeout(e => this.draw(this.imageObj,height,width), 2000);
        }
   
      }

     draw(imageObj,height,width)
     {
         console.log("inside draw img");
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.drawImage(imageObj,0, 0, width, height);
       // this.ctx.drawImage(imageObj, 0, 0);
      /*   var c=this.canvas.nativeElement.toDataURL();
        console.log("c",c); */
     }
}
