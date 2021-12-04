import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditGroupComponent implements OnInit {
  groupForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  id: any;
  sub: any;
  userData: any;
  urlCurrent: string;
  roleModule: any;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.groupForm = this.fb.group({
      companyId: ['', [Validators.required]],
      //unitId: ['', Validators.required],CustomValidator.alphaNumeric
      groupName: ['', [Validators.required,Validators.maxLength(30)]],
      groupId: ['']
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/group";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/group";
      this.roleModule = { write: true };
     // this.groupForm.patchValue({ unitId: this.userData.unitId });
     // this.groupForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/group";
    }
    var roleData = this.pasonaService.getRoleModule(5);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.groupForm.disable();
      }
      console.log("roleData", roleData);
    }
  }

  ngOnInit() {
    this.getAllCompanyData();
    this.getGroupDataById();
  }

  get f() { return this.groupForm.controls; };

  editGroup() {
    if (this.groupForm.valid) {
      //this.groupForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["groupName"];
      encData=this.pasonaService.setEncryptObject(this.groupForm.value,encArray);
      this.pasonaService.editGroup(encData).subscribe(dataRes => {
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
      this.groupForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllCompanyData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getCompanyById(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.companyData.push(resp.companyDetails);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllUnitDataByCompanyId(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitByCompanyId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  patchValueForm(formData) {
    this.groupForm.patchValue({
      groupName: formData.groupName,
      companyId: + formData.companyId,
     // unitId: +formData.unitId,
      groupId: this.id
    });
  }

  getGroupDataById() {
    this.pasonaService.startSpinner();
    console.log("id", this.id);
    this.pasonaService.getGroupById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
       // this.getAllUnitDataByCompanyId(dataRes.groupDetails.companyId);    
        var encDecData:any;
       var encArray=["groupName"];
       encDecData=this.pasonaService.getDecryptObject(dataRes.groupDetails,encArray);
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

