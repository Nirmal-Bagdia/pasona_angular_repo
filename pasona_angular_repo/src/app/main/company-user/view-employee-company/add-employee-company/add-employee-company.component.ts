import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-employee-company',
  templateUrl: './add-employee-company.component.html',
  styleUrls: ['./add-employee-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddEmployeeCompanyComponent implements OnInit {
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
  jobTitleData: any[];
  mobileFlag: { dialCode: string; initialCountry: string;preferredCountries: ['jp', 'in'] };
  gradeCode: any[];
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    this.mobileFlag={dialCode: "81",initialCountry: "jp",preferredCountries: ['jp', 'in']};
    this.jobTitleData=[];
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
    this.gradeData = [];
    this.gradeCode=[];
    this.groupData = [];
    this.nationalityData = [];
    this.empTypeData = [];
    this.userData = this.pasonaService.getUserData();
    this.employeeForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      unitId: ['', Validators.required],
      depId: ['', Validators.required],
      sectionId: ['', Validators.required],
      empName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      jobTitleId: ['',],
      contactNo: ['', [Validators.required, CustomValidator.numberValidator, Validators.minLength(7), Validators.maxLength(14)]],
      designation: ['', [Validators.required,Validators.maxLength(30)]],
      dateOfJoining: ['', Validators.required],
      address: ['', ],
      dateOfBirth: ['', Validators.required],
      empCode: ['', [Validators.required, Validators.maxLength(10)]],
      grade: [''],
      nationality: [''],
      employmentType: [''],
      groupId: [''],
      isHod: ['0',],
      isUnitHead: ['0',],
      isMd:['0',],
      gradeCode: ['', ],
      //gradeCode: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(5)]],
      employeeCategory: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(30)]],
      precedingYearAppraisalRatingN1: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(3)]],
      precedingYearAppraisalRatingN2: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(3)]],
      precedingYearAppraisalRatingN3: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(3)]],
      precedingYearAppraisalRatingN4: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(3)]],
      highestQualification: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(20)]],
      secondHighestQualification: ['', [CustomValidator.alphaNumeric1,Validators.maxLength(20)]],
      experienceYears: ['', [CustomValidator.NumericAndFloating]],
      roleId: [1,],
      dateOfLastPromotion: [],
      userName:['',],
      //userName: ['', [Validators.required, CustomValidator.alphaNumeric1, Validators.maxLength(20),Validators.minLength(10)]],
      countryCode :['',],
      flagCode:['']
    }, {
      validator: CustomValidator.passwordMatchValidator

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
    // this.getAllCountry();
    console.log("company id",this.userData.companyId);
    
    this.getAllCompanyData();
    //  this.getAllEmployeeData();
    if (this.userData) {
      this.getAllUnitDataByCompanyId(this.userData.companyId);
    }
    this.getAllNationality();
    this.getAllEmpType();
    this.getAllGroup();
    this.getAllRoleData();
    //this.getAllJobTitles();
    this.getAllGradeCategory();
    this.getAllGradeCode();
  }

  get f() { return this.employeeForm.controls; };

  onCountryChange(countryCode) {
    console.log(countryCode)
    this.mobileFlag={dialCode:countryCode.dialCode,initialCountry: countryCode.iso2,preferredCountries: ['jp', 'in']};
   }

  preview(files) {
    this.fileToUpload = files[0];
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  getAllGradeCategory() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGradeCategory(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeData=resp.gradeDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllGradeCode() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGradeCode(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeCode=resp.gradeDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  createEmployee() {
    if (this.employeeForm.valid) {
      this.employeeForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      this.employeeForm.value.email=this.employeeForm.value.email.trim();   
      var encData:any;
      this.employeeForm.value.countryCode=this.mobileFlag.dialCode;
      this.employeeForm.value.flagCode=this.mobileFlag.initialCountry;
      var encArray= ["empName","gender","email","designation","address","empCode","employeeCategory","precedingYearAppraisalRatingN2","precedingYearAppraisalRatingN3","precedingYearAppraisalRatingN4","highestQualification","secondHighestQualification","userName"];
       encData=this.pasonaService.setEncryptObject(this.employeeForm.value,encArray);
      this.pasonaService.addEmployee(encData).subscribe(dataRes => {
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

  getAllJobTitles() {
    this.jobTitleData = [];
    this.pasonaService.startSpinner();
    var selection = { pNumber: 0, pSize: 1000, companyId: this.userData.companyId, jobTitleName: '' };
    this.pasonaService.getAllJobTitles(selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.jobTitleData = resp.jobTitleDetails.content;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  fileDownload() {

  }
}

