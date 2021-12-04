import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddGroupComponent implements OnInit {
  groupForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  userData: any;
  urlCurrent: string;
  
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.userData = this.pasonaService.getUserData();
    this.groupForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
     // unitId: ['', Validators.required],CustomValidator.alphaNumeric
      groupName: ['', [Validators.required,Validators.maxLength(30)]],
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/group";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/group";
      //this.groupForm.patchValue({ unitId: this.userData.unitId });
      //this.groupForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/group";
    }
  }

  ngOnInit() {
    this.getAllCompanyData();
    //this.getAllUnitDataByCompanyId(this.userData.companyId);
  }

  get f() { return this.groupForm.controls; };

  createGroup() {
    if (this.groupForm.valid) {
     // this.groupForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["groupName"];
      encData=this.pasonaService.setEncryptObject(this.groupForm.value,encArray);
      this.pasonaService.addGroup(encData).subscribe(dataRes => {
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
}
