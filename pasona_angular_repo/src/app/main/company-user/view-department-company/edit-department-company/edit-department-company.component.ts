import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-edit-department-company',
  templateUrl: './edit-department-company.component.html',
  styleUrls: ['./edit-department-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditDepartmentCompanyComponent implements OnInit {
  departmentForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  fileToUpload: any;
  imgURL: string | ArrayBuffer;
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
    
    this.roleModule = {};
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.departmentForm = this.fb.group({
      companyId: ['', [Validators.required]],
      unitId: ['', Validators.required],
      departmentName: ['', [Validators.required, CustomValidator.alphaNumeric,Validators.maxLength(30)]],
      depId: ['']
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/department";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/department";
      this.roleModule = { write: true };
      this.departmentForm.patchValue({ unitId: this.userData.unitId });
      this.departmentForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/department";
    }

    var roleData = this.pasonaService.getRoleModule(3);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.departmentForm.disable();
      }
      console.log("roleData", roleData);
    }
  }


  ngOnInit() {
    this.getAllCompanyData();
    this.getDepartmentDataById();
  }

  get f() { return this.departmentForm.controls; };

  editDepartment() {
    if (this.departmentForm.valid) {
      this.departmentForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["departmentName"];
      encData=this.pasonaService.setEncryptObject(this.departmentForm.value,encArray);
      this.pasonaService.editDepartment(encData).subscribe(dataRes => {
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

  patchValueForm(formData) {
    this.departmentForm.patchValue({
      departmentName: formData.departmentName,
      companyId: + formData.companyId,
      unitId: +formData.unitId,
      depId: formData.depId
    });
  }

  getDepartmentDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.getAllUnitDataByCompanyId(dataRes.departmentDetails.companyId);
        var encDecData:any;
        var encArray=["departmentName"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.departmentDetails,encArray);
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
