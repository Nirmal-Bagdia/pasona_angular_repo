import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleModule } from '../../../shared/roleModule';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class EditRoleComponent implements OnInit {
  roleForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  moduleData: any[];
  userData: any;
  moduleids: any[];
  errorShow: boolean;
  sub: any;
  id: number;
  pSelectedModule: any[];
  roleModule: any;
  urlCurrent: string;
  selectAllModule: boolean;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    
    this.roleModule = {};
    this.moduleids = [];
    this.errorShow = false;
    this._unsubscribeAll = new Subject();
    this.moduleData = RoleModule;
    this.moduleData.forEach((element) => {
      if (element.moduleId == 8 || element.moduleId == 9 || element.moduleId == 10) {
        element.checked == true;
        if (element.moduleId == 10) {
          element.writeOperation = true;
        }
      }
      else {
        element.checked = false;
        element.writeOperation = false;
      }
    });
    this.pSelectedModule = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.maxLength(30)]],  /* CustomValidator.alphaNumeric */
      roleId: []
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/role";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/role";
    }

    var roleData = this.pasonaService.getRoleModule(11);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.roleForm.disable();
      }
      console.log("roleData", roleData);
    }
  }

  ngOnInit() {
    this.getRoleDataById();
  }

  get f() { return this.roleForm.controls; };

  updateRole() {
    if (this.roleForm.valid && this.errorShow == false) {
      var modules = [], indexVal, ind, removeId = [];
      this.moduleData.forEach((element) => {
        console.log("element.checked", removeId);
        if (element.checked) {
          modules.push(element);
        }
      });

      modules.forEach((element) => {
        indexVal = this.pSelectedModule.findIndex(record => record.moduleId == element.moduleId);
        console.log("indexVal", indexVal);
        console.log("element.moduleId", element.moduleId);
        if (indexVal != -1) {
          console.log("this.pSelectedModule", this.pSelectedModule);
          element['id'] = this.pSelectedModule[indexVal].id;
          element['roleId'] = this.roleForm.value.roleId;
          this.pSelectedModule.splice(indexVal, 1);
          console.log("this.pSelectedModule", this.pSelectedModule);
        }
      });
      this.pSelectedModule.forEach((element) => {
        removeId.push(element.id);
      });

      console.log("modules", modules);
      var encData:any;
      var encArray=["roleName"];
      encData=this.pasonaService.setEncryptObject(this.roleForm.value,encArray);
      var data = {
        "roleName": encData.roleName,
        "companyId": this.userData.companyId,
        "roleId": this.roleForm.value.roleId,
        "removeId": removeId,
        "modules": modules
      }
      console.log("data", data);
      this.pasonaService.startSpinner();
      this.pasonaService.editRole(data).subscribe(dataRes => {
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

    console.log("checked", event.checked);
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
  /*   public setSelected(data, event, ind) {
      console.log("checked", event.checked);
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
      console.log("this.empIds", this.moduleids);
    } */

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

  /* public selectAll(event) {
    if (event.checked == true) {
      this.errorShow = false;
      this.moduleData.forEach((element, ind) => {
        element.checked = true;
        this.moduleids.push(element.moduleId)
      });
    }
    else {
      this.errorShow = true;
      this.moduleData.forEach(element => {
        element.checked = false;
        element.writeOperation = false;
      });
      this.moduleids = [];
    }
    console.log("this.empIds", this.moduleids);
  } */

  public selectAll(event) {
    if (event.checked == true) {
      this.errorShow = false;
      this.moduleData.forEach((element, ind) => {
        element.checked = true;
        element.writeOperation = true;
        if (element.moduleId == 8 || element.moduleId == 9 || element.moduleId == 10) {

        }
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
      this.moduleids = [];
    }
    console.log("this.empIds", this.moduleids);
  }
  patchValueForm(formData) {
    this.roleForm.patchValue({
      roleName: formData.roleName,
      companyId: + formData.companyId,
      roleId: formData.roleId
    });
    var indexVal;
    formData.modules.forEach((element) => {
      indexVal = this.moduleData.findIndex(record => record.moduleId == element.moduleId);
      console.log("indexVal", indexVal);
      this.pSelectedModule.push(element);
      this.moduleids.push(element.moduleId);
      if (indexVal != -1) {
        this.moduleData[indexVal].checked = true;
        console.log("element.writeOperation", element.writeOperation);
        if (element.writeOperation == true) {
          this.moduleData[indexVal].writeOperation = true;
        }
      }
    });
  }

  getRoleDataById() {
    this.pasonaService.startSpinner();
    console.log("id", this.id);
    this.pasonaService.getRoleById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var encDecData:any;
        var encArray=["roleName"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.rolesDetails,encArray);
        this.patchValueForm(encDecData);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }
}


