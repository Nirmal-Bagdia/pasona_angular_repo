
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-edit-section-company',
  templateUrl: './edit-section-company.component.html',
  styleUrls: ['./edit-section-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditSectionCompanyComponent implements OnInit {

  sectionForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  departmentData: any;
  sub: any;
  id: number;
  userData: any;
  urlCurrent: string;
  roleModule: any;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.departmentData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.sectionForm = this.fb.group({
      companyId: ['', [Validators.required]],
      unitId: ['', Validators.required],
      depId: ['', Validators.required],
      sectionName: ['', [Validators.required, CustomValidator.alphaNumeric,Validators.maxLength(30)]],
      sectionId: ['']
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/section";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/section";
      this.roleModule = { write: true };
      this.sectionForm.patchValue({ unitId: this.userData.unitId });
      this.sectionForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/section";
    }

    var roleData = this.pasonaService.getRoleModule(3);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.sectionForm.disable();
      }
      console.log("roleData", roleData);
    }
  }


  ngOnInit() {
    this.getAllCompanyData();
    this.getSectionDataById();
  }

  get f() { return this.sectionForm.controls; };

  editSection() {
    if (this.sectionForm.valid) {
      this.sectionForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      var encData:any ;
      var encArray=["sectionName"];
      encData=this.pasonaService.setEncryptObject(this.sectionForm.value,encArray);
      this.pasonaService.editSection(encData).subscribe(dataRes => {
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

  patchValueForm(formData) {
    this.sectionForm.patchValue({
      sectionName: formData.sectionName,
      companyId: + formData.companyId,
      unitId: +formData.unitId,
      depId: +formData.depId,
      sectionId: formData.sectionId
    });
  }

  getSectionDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.getAllUnitDataByCompanyId(dataRes.sectionDetails.companyId);
        this.getAllDepartmentDataByUnitId(dataRes.sectionDetails.unitId);
        var encDecData:any;
        var encArray=["sectionName"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.sectionDetails,encArray);
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
