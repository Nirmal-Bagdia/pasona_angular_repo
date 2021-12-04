import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-section-company',
  templateUrl: './add-section-company.component.html',
  styleUrls: ['./add-section-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddSectionCompanyComponent implements OnInit {
  sectionForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  departmentData: any;
  userData: any;
  urlCurrent: string;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.departmentData = [];
    this.userData = this.pasonaService.getUserData();
    this.sectionForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      unitId: ['', Validators.required],
      depId: ['', Validators.required],
      sectionName: ['', [Validators.required, CustomValidator.alphaNumeric,Validators.maxLength(30)]],
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/section";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/section";
      this.sectionForm.patchValue({ unitId: this.userData.unitId });
      this.sectionForm.get('unitId').disable();
      this.getAllDepartmentDataByUnitId(this.userData.unitId);
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/section";
    }
  }

  ngOnInit() {
    this.getAllCompanyData();
    if (this.userData) {
      this.getAllUnitDataByCompanyId(this.userData.companyId);
    }
  }

  get f() { return this.sectionForm.controls; };

  createSection() {
    if (this.sectionForm.valid) {
      this.sectionForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["sectionName"];
      encData=this.pasonaService.setEncryptObject(this.sectionForm.value,encArray);
      this.pasonaService.addSection(encData).subscribe(dataRes => {
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
      this.sectionForm.markAllAsTouched();
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

  getAllDepartmentDataByUnitId(id) {
    this.pasonaService.startSpinner();
    this.sectionForm.patchValue({ depId: '' });
    this.departmentData = [];
    this.pasonaService.getDepartmentByUnitId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.departmentData = resp.departmentDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
}
