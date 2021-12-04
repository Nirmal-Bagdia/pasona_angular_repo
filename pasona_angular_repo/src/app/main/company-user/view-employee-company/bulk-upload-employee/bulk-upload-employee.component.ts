import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-bulk-upload-employee',
  templateUrl: './bulk-upload-employee.component.html',
  styleUrls: ['./bulk-upload-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class BulkUploadEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  fileToUpload: any;
  imgURL: string | ArrayBuffer;
  countryData: any[];
  stateData: any[];
  cityData: any[];
  companyData: any;
  unitData: any;
  departmentData: any;
  sectionData: any;
  employeeData: any;
  userData: any;
  gradeData: string[];
  groupData: any[];
  nationalityData: any[];
  empTypeData: any[];
  minDate = new Date(1800, 1, 1);
  maxDate = new Date();
  urlCurrent: any;
  rolesData: any[] = [];
  
  @ViewChild('photoInput', { static: false }) myInputVariable: ElementRef;
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    var date = new Date();
    this.maxDate = new Date(date.getFullYear() - 10, date.getMonth(), date.getDate());
    this._unsubscribeAll = new Subject();
    this.countryData = [];
    this.stateData = [];
    this.cityData = [];
    this.companyData = [];
    this.unitData = [];
    this.departmentData = [];
    this.sectionData = [];
    this.employeeData = [];
    this.gradeData = ["A", "B", "C", "D"];
    this.groupData = [];
    this.nationalityData = [];
    this.empTypeData = [];
    this.userData = this.pasonaService.getUserData();
    this.employeeForm = this.fb.group({
      companyId: [this.userData.companyId,],
      unitId: [this.userData.unitId, ],
     // depId: ['', Validators.required],
      empId:[this.userData.empCode,],
     /*  sectionId: ['', Validators.required], */
      file: ['', Validators.required],
      type:[this.userData.userType,]
    });

    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/employee";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/employee";
      this.employeeForm.patchValue({ unitId: this.userData.unitId });
      this.employeeForm.get('unitId').disable();
      this.getAllDepartmentDataByUnitId(this.userData.unitId);
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/employee";
    }
  }

  ngOnInit() {
    this.getAllCompanyData();
    if (this.userData) {
      this.getAllUnitDataByCompanyId(this.userData.companyId);
    }
  }

  get f() { return this.employeeForm.controls; };

  preview(files) {
    console.log("files", files);
    this.fileToUpload = files[0];
    console.log("files", this.fileToUpload);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    console.log("mimeType=", mimeType);
    if (mimeType.match(/spreadsheetml\/*/) == null) {
      console.log("ddd", this.myInputVariable.nativeElement.files);
      this.myInputVariable.nativeElement.value = null;
      this.employeeForm.patchValue({ file: null });
      return;
    }

    // var reader = new FileReader();
    // // this.imagePath = files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    // }
  }

  createEmployee() {
    if (this.employeeForm.valid) {
      this.employeeForm.get('unitId').enable();
      var param = new FormData();
      param.append('unitId', this.employeeForm.value.unitId);
      param.append('empId', this.employeeForm.value.empId);
      param.append('companyId', this.employeeForm.value.companyId);
      param.append('type', this.employeeForm.value.type);
      param.append('files', this.fileToUpload);
      this.pasonaService.startSpinner();
      this.pasonaService.bulkUploadEmployee(param).subscribe(dataRes => {
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
      console.log("ddddd", this.employeeForm.value);
      this.employeeForm.markAllAsTouched();
    }
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllCountry() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCountry().subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.countryData = resp.countryDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllStateByCountry(id) {
    console.log("id", id);
    this.pasonaService.startSpinner();
    this.pasonaService.getAllStateByCountryId(id.value).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.stateData = resp.stateDetail;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllCityByStateId(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCityByState(id.value).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.cityData = resp.cityDeatails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
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
    // this.employeeForm.patchValue({sectionId:'',depId:'',unitId:''});
    this.pasonaService.getUnitByCompanyId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
        //  this.getAllEmployeeData();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllDepartmentDataByUnitId(id) {
    this.pasonaService.startSpinner();
    this.employeeForm.patchValue({ sectionId: '', depId: '' });
    this.sectionData = [];
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

  getAllSectionDataByDepartmentId(id) {
    this.employeeForm.patchValue({ sectionId: '' });
    this.sectionData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionByDepartmentId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData = resp.sectionDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllEmployeeData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.employeeData = resp.employeeDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllGrade() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCountry().subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeData = resp.countryDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllGroup() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGroupByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.groupData = resp.groupDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllNationality() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllNationality().subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.nationalityData = resp.nationalityDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllEmpType() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmpTypeByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.empTypeData = resp.EmploymentType;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllRoleData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllRole(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.rolesData = resp.rolesDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  fileDownload() {
    window.open('assets/bulkUploadFile.xlsx');
    // this.pasonaService.startSpinner();
    // this.pasonaService.bulkFileDownload().subscribe(dataRes => {
    //   this.pasonaService.stopSpinner();
    //   if (dataRes.status == '1') {
    //    window.open(dataRes.file);
    //   }
    //   else {
    //     this.pasonaService.openSnackBar(dataRes.message);
    //   }
    // }, error => {
    //   this.pasonaService.stopSpinner();
    //   this.pasonaService.openSnackBarError('Please connect to server!');
    // });
  }
}


