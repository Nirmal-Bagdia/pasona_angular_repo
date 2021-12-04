import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-department-company',
  templateUrl: './add-department-company.component.html',
  styleUrls: ['./add-department-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddDepartmentCompanyComponent implements OnInit {
  departmentForm: FormGroup;
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
    this.departmentForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      unitId: ['', Validators.required],
      departmentName: ['', [Validators.required, CustomValidator.alphaNumeric,Validators.maxLength(30)]],
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/department";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/department";
      this.departmentForm.patchValue({ unitId: this.userData.unitId });
      this.departmentForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/department";
    }
  }

  ngOnInit() {
    this.getAllCompanyData();
    if (this.userData) {
      this.getAllUnitDataByCompanyId(this.userData.companyId);
    }
  }

  get f() { return this.departmentForm.controls; };

  createDepartment() {
    if (this.departmentForm.valid) {
      console.log("this.departmentForm.value", this.departmentForm.value);
      this.departmentForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["departmentName"];
      encData=this.pasonaService.setEncryptObject(this.departmentForm.value,encArray);
      this.pasonaService.addDepartment(encData).subscribe(dataRes => {
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
      this.departmentForm.markAllAsTouched();
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
