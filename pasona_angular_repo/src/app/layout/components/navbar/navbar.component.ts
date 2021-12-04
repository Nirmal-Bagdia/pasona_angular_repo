import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { navigationAdmin } from 'app/navigation/navigation.admin';
import { navigationCompany } from 'app/navigation/navigation.company';
import { navigationUnit } from 'app/navigation/navigation.unit';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { navigationEmployee } from 'app/navigation/navigation.employee';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
    // Private
    _variant: string;
    navigation: any;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _fuseNavigationService: FuseNavigationService,
        private pasonaService:PasonaServiceService,
        private cd: ChangeDetectorRef,
        private _translateService: TranslateService,
    ) {

        // this.pasonaService.data.subscribe(data => {
        //     console.log("data",data);
        //     if(data)
        //     {
        //        // debugger;
        //     //data=data.toString();
        //    var dataUser= this.pasonaService.getUserData();
        //    console.log( _.isEqual(data, dataUser) );
      
        //    if(dataUser.userType==4 && data.role)
        //    {
        //    if (! _.isEqual(data.role.modules, dataUser.role.modules))
        //    {
        //     this.pasonaService.setUserData(data);
        //     this.navigation =  this.setModuleShowUser(); 
        //     this._fuseNavigationService.unregister('main');
        //     this._fuseNavigationService.register('main', this.navigation);
        //     this._fuseNavigationService.setCurrentNavigation('main');
        //    }
        //   }
        //   else if((dataUser.userType==4 && data.role) && !dataUser.role )
        //   {
        //     this.pasonaService.setUserData(data);
        //   }
        // }
        // })

        // Set the private defaults
        this._variant = 'vertical-style-1'; var userData = this.pasonaService.getUserData();
        console.log("userData", userData);
        if (userData) {
            var accessModule = [{
                id: "applications",
                title: "Employee",
                translate: "NAV.employeeUser",
                type: "group",
                icon: "apps",
                children:[]
            }];  
            if (userData.userType == '1') {
                this.navigation = navigationAdmin;
            }

            else if (userData.userType == '2') {
                this.navigation = navigationCompany;
                console.log("this.navigation", this.navigation);
                this.pasonaService.setRoleModule(accessModule);
            }
            else if (userData.userType == '3') {
                this.navigation = navigationUnit;
                this.pasonaService.setRoleModule(accessModule);
            }
            else if (userData.userType == '4') {
                this.navigation =  this.setModuleShowUser();
                //this.navigation = accessModule;
            }
        }
        if(userData)
        {
          this._translateService.use(userData.language);
          this.pasonaService.setLanguage(userData.language);
        }
        // Register the navigation to the service
        this._fuseNavigationService.unregister('main');
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Variant
     */
    get variant(): string {
        return this._variant;
    }

    @Input()
    set variant(value: string) {
        // Remove the old class name
        this._renderer.removeClass(this._elementRef.nativeElement, this.variant);

        // Store the variant value
        this._variant = value;

        // Add the new class name
        this._renderer.addClass(this._elementRef.nativeElement, value);
    }

   
      
    setModuleShowUser()
    {
        var userData = this.pasonaService.getUserData();
        var accessModule = [{
            id: "applications",
            title: "Employee",
            translate: "NAV.employeeUser",
            type: "group",
            icon: "apps",
            children:[]
        }];
        this.navigation = navigationEmployee;
        console.log("this.navigation", this.navigation);
        var roleModule = [], indexVal;
        if(userData.role)
        {
            roleModule=userData.role.modules;
            roleModule.push({moduleId:1,readOperation:true,writeOperation:false});
           // roleModule.push({moduleId: 7,readOperation:true,writeOperation:false});
           // roleModule.push({moduleId: 13,readOperation:true,writeOperation:true});
            console.log("roleModule", roleModule);
            var i = 0;
           
            this.navigation[0].children.forEach((element) => {
                indexVal = roleModule.findIndex(record => record.moduleId == element.moduleId);
                // console.log("indexVal", indexVal);
                // console.log("element.moduleId", element.moduleId);    
                if (indexVal != -1) {
                    //accessModule[0].childern.push(element);
                    accessModule[0].children.push(element);
                    console.log("check",accessModule[0].children);
                    if (roleModule[indexVal].writeOperation == true) {
                        console.log("i",i);
                        console.log("roleModule[indexVal].writeOperation",roleModule[indexVal].writeOperation);
                        accessModule[0].children[i].write = true;
                        console.log("accessModule[0].children[i].write",accessModule[0].children[i].write);
                        i++;
                    }
                    else{

                        accessModule[0].children[i].write = false;
                        i++;
                    }
                }
                // else{

                // }
            });
        }

        else if (!userData.role) {          
            this.navigation[0].children.forEach((element) => {
                roleModule = [{ moduleId: 8 ,write:false}, { moduleId: 9 ,write:false}, { moduleId: 10,write:true }, { moduleId: 1 }];
                indexVal = roleModule.findIndex(record => record.moduleId == element.moduleId);
                if (indexVal != -1) {
                    if(element.moduleId==10)
                    {
                        element.write=true;
                    }
                     else if(element.moduleId==9 && userData.isHod==1)
                    {
                        element.write=true;
                    }
                    else
                    {
                        element.write=false;
                    }
                    accessModule[0].children.push(element);
                }
            });

        }
        if(userData.isAppraiser==1)
        {
            indexVal=this.navigation[0].children.findIndex(record => record.moduleId == 14);
            if(indexVal!=-1)
            {
              var ind=  accessModule[0].children.findIndex(record => record.moduleId == 14)
                if(ind==-1)
                {
                    this.navigation[0].children[indexVal].write=true;
                    accessModule[0].children.push(this.navigation[0].children[indexVal]);
                }
              
            }
        }
        console.log("accessModule",accessModule);
        this.pasonaService.setRoleModule(accessModule);
        return accessModule;
    }
   

    
    
}
