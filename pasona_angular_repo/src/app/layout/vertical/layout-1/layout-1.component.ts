import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    params: any;
    //showToolbar: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(private _fuseConfigService: FuseConfigService,private location: Location,private router: Router)
    {
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
                this.params = this.router.events.subscribe(val => {
                    if (this.location.path() != "") {
                        var route=this.location.path();
                        var ind=route.indexOf('login');
                        if(ind!=-1)
                        {
                            console.log("if",this.router.url);
                            this.fuseConfig.layout.navbar.hidden=true;
                            this.fuseConfig.layout.toolbar.position='below-fixed1'
                        }
                         else
                       {
                       this.fuseConfig.layout.navbar.hidden=false;
                         this.fuseConfig.layout.toolbar.position='below-fixed';
                    
                      }
                    //   this.location.path();
                      console.log("this.location.path();",this.location.path());
                      this.params.unsubscribe();
                    } else {
                    
                    }
                  });
               
                
            });
               
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
}
