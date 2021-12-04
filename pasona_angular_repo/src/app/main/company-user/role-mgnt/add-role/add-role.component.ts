import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { RoleModule } from '../../../shared/roleModule';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddRoleComponent implements OnInit {
  roleForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  moduleData: any[];
  userData: any;
  moduleids: any[];
  errorShow: boolean;
  urlCurrent: string;
  selectAllModule: boolean;
  selectAllWriteOpt: boolean;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    this.moduleids = [];
    this.errorShow = false;
    this._unsubscribeAll = new Subject();
    this.moduleData = [];
    this.moduleData = RoleModule;
    this.moduleData.forEach((element) => {
      if (element.moduleId == 8 || element.moduleId == 9 || element.moduleId == 10) {
        element.checked == true;
        if (element.moduleId == 10) {
          element.writeOperation = true;
        }
      }
      else if (element.moduleId == 14) {
        element.writeOperation = true;
      }
      else {
        element.checked = false;
        element.writeOperation = false;

      }

    });
    console.log("this.moduleData", this.moduleData);
    this.userData = this.pasonaService.getUserData();
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.maxLength(30)]], /* CustomValidator.alphaNumeric */
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/role";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/role";
    }
  }

  ngOnInit() {

  }

  get f() { return this.roleForm.controls; };

  createRole() {
    console.log("form", this.roleForm.valid);
    if (this.roleForm.valid && this.errorShow == false) {
      var modules = [];
      this.moduleData.forEach((element) => {
        console.log("element.checked", element.checked);
        if (element.checked) {
          modules.push(element);
        }
      });
      console.log("modules", modules);
      var encData:any;
      var encArray=["roleName"];
      encData=this.pasonaService.setEncryptObject(this.roleForm.value,encArray);
      var data = {
        "roleName": encData.roleName,
        "companyId": this.userData.companyId,
        "modules": modules
      }
      console.log("data", data);
      this.pasonaService.startSpinner();
      this.pasonaService.addRole(data).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate([this.urlCurrent]);
        }
        else {
          this.pasonaService.infoMessage(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      console.log("modules", modules);
      this.errorShow = true;
      this.roleForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public setSelected(data, event, ind) {
    if (event.checked == true) {
      this.errorShow = false;
      this.moduleData[ind].checked = true;
      this.moduleids.push(data.moduleId);
    }
    else {
      var indexVal = this.moduleids.findIndex(record => record == data.moduleId)
      this.moduleids.splice(indexVal, 1);
      this.moduleData[ind].checked = false;
      this.moduleData[ind].writeOperation = false;

    }
    if (this.moduleids.length == 0) {
      this.errorShow = true;
    }

    else if (this.moduleids.length == this.moduleData.length - 3) {
      this.selectAllModule = true;
    }
    else {
      this.selectAllModule = false;
    }
    console.log("this.empIds", this.moduleids.length, "  ", this.moduleData.length);
  }

  setSelectedWrite(data, event, ind) {
    if (data.moduleId == 9 || data.moduleId == 8) {
      if (event.checked == true) {
        this.errorShow = false;
        this.moduleids.push(data.moduleId);
      }
      else {
        var indexVal = this.moduleids.findIndex(record => record == data.moduleId)
        this.moduleids.splice(indexVal, 1);
      }
      if (this.moduleids.length == 0) {
        this.errorShow = true;
      }
    }
  }

  public selectAll(event) {
    if (event.checked == true) {
      this.errorShow = false;
      this.moduleData.forEach((element, ind) => {
        element.checked = true;
        element.writeOperation = true;
        if (element.moduleId == 8 || element.moduleId == 9 || element.moduleId == 10) { }
        else {
          this.moduleids.push(element.moduleId);
        }
      });
    }
    else {
      this.errorShow = true;
      this.moduleData.forEach(element => {
        element.checked = false;
        if (element.moduleId == 8 || element.moduleId == 9 || element.moduleId == 10) {
          element.checked = true;
        }
        if (element.moduleId == 10 || element.moduleId == 14) {
          element.writeOperation = true;
        }
        else {
          element.writeOperation = false;
        }
      });
      this.selectAllWriteOpt = false;
      this.moduleids = [];
    }
    console.log("this.empIds", this.moduleids);
  }

  // selectAllWrite(event)
  // {
  //   if (event.checked == true) {
  //     this.moduleData.forEach((element, ind) => {
  //       element.writeOperation = true;
  //     });
  //   }
  //   else {
  //     this.moduleData.forEach(element => {
  //       if(element.moduleId==10 || element.moduleId==14)
  //       {
  //         element.writeOperation = true;
  //       }
  //       else
  //       {
  //         element.writeOperation = false;
  //       }

  //     });
  //   }
  // }
}

