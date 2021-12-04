

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-edit-employee-company',
  templateUrl: './edit-employee-company.component.html',
  styleUrls: ['./edit-employee-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditEmployeeCompanyComponent implements OnInit {

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
  sub: any;
  id: number;
  userData: any;
  gradeData: string[];
  groupData: any[];
  nationalityData: any[];
  empTypeData: any[];
  minDate = new Date(1800, 1, 1);
  maxDate = new Date();
  urlCurrent: any;
  roleModule: any;
  rolesData: any[] = [];
  jobTitleData: any[];
  mobileFlag: { dialCode: string; initialCountry: string;preferredCountries: ['jp', 'in'] };
  gradeCode: any[];
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    let flag=JSON.parse(sessionStorage.getItem('flagMobile'));
    this.mobileFlag={dialCode: "81",initialCountry: flag,preferredCountries: ['jp', 'in']};
    this.jobTitleData = [];
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
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    this.employeeForm = this.fb.group({
      companyId: ['', [Validators.required]],
      unitId: ['', Validators.required],
      depId: ['', Validators.required],
      sectionId: ['', Validators.required],
      empName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), Validators.maxLength(35)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      empCode: ['', [Validators.required, Validators.maxLength(10)]],
      jobTitleId: ['',],
      contactNo: ['', [Validators.required, CustomValidator.numberValidator, Validators.minLength(7), Validators.maxLength(14)]],
      designation: ['', [Validators.required, CustomValidator.alphaNumeric, Validators.maxLength(30)]],
      dateOfJoining: ['', Validators.required],
      //salary: ['', [Validators.required, CustomValidator.numberValidator]],
      address: ['',],
      id: [''],
      dateOfBirth: ['', Validators.required],
      grade: [''],
      nationality: [''],
      employmentType: [''],
      groupId: [''],
      isHod: ['',],
      isMd:['0',],
      isUnitHead: ['',],
      gradeCode: ['', ],
      //gradeCode: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(5)]],
      employeeCategory: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(30)]],
      precedingYearAppraisalRatingN1: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(3)]],
      precedingYearAppraisalRatingN2: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(3)]],
      precedingYearAppraisalRatingN3: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(3)]],
      precedingYearAppraisalRatingN4: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(3)]],
      highestQualification: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(20)]],
      secondHighestQualification: ['', [CustomValidator.alphaNumeric1, Validators.maxLength(20)]],
      experienceYears: ['', [CustomValidator.NumericAndFloating]],
      roleId: [],
      dateOfLastPromotion: [],
      userName:['',],
     // userName: ['', [Validators.required, CustomValidator.alphaNumeric1, Validators.maxLength(20), Validators.minLength(10)]],
      countryCode :['',],
      flagCode:['']
    });

    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/employee";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/employee";
      this.roleModule = { write: true };
      this.employeeForm.patchValue({ unitId: this.userData.unitId });
      this.employeeForm.get('unitId').disable();
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/employee";
    }

    var roleData = this.pasonaService.getRoleModule(7);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.employeeForm.disable();
      }
      console.log("roleData", roleData);
    }
  }


  ngOnInit() {
    this.getAllCompanyData();
    this.getEmployeeDataById();
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
  updateEmployee() {
    if (this.employeeForm.valid) {
    console.log("this.employeeForm.value",this.employeeForm.value);
      this.employeeForm.get('unitId').enable();
      this.pasonaService.startSpinner();
      this.employeeForm.value.email = this.employeeForm.value.email.trim();
      var encData:any;
      this.employeeForm.value.countryCode=this.mobileFlag.dialCode;
      this.employeeForm.value.flagCode=this.mobileFlag.initialCountry;
      var encArray= ["empName","gender","email","designation","address","employeeCategory","precedingYearAppraisalRatingN2","precedingYearAppraisalRatingN3","precedingYearAppraisalRatingN4","highestQualification","secondHighestQualification","userName"];
       encData=this.pasonaService.setEncryptObject(this.employeeForm.value,encArray);
       console.log("this.employeeForm.value",encData);
      this.pasonaService.editEmployee(encData).subscribe(dataRes => {
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

  patchValueForm(formData) {
    this.employeeForm.patchValue({
      companyId: +formData.companyId,
      unitId: + formData.unitId,
      depId: +formData.depId,
      sectionId: +formData.sectionId,
      empName: formData.empName,
      gender: formData.gender,
      email: formData.email,
      firstAppraiser: +formData.firstAppraiser,
      secondAppraiser: +formData.secondAppraiser,
      thirdAppraiser: +formData.thirdAppraiser,
      contactNo: formData.contactNo,
      password: formData.password,
      designation: formData.designation,
      dateOfJoining: formData.dateOfJoining,
      empCode:formData.empCode,
      //salary: formData.salary,
      address: formData.address,
      id: formData.id,
      dateOfBirth: formData.dateOfBirth,
      grade: Number(formData.grade),
      nationality: formData.nationality,
      employmentType: + formData.employmentType,
      groupId: +formData.groupId,
      isHod: formData.isHod.toString(),
      isMd:formData.isMd.toString(),
      isUnitHead: formData.isUnitHead.toString(),
      jobTitleId: +formData.jobTitleId,
      roleId: formData.roleId,
      dateOfLastPromotion: formData.dateOfLastPromotion,
      userName: formData.userName,
      gradeCode:  Number(formData.gradeCode),
      employeeCategory: formData.employeeCategory,
      precedingYearAppraisalRatingN1: formData.precedingYearAppraisalRatingN1,
      precedingYearAppraisalRatingN2: formData.precedingYearAppraisalRatingN2,
      precedingYearAppraisalRatingN3: formData.precedingYearAppraisalRatingN3,
      precedingYearAppraisalRatingN4: formData.precedingYearAppraisalRatingN4,
      highestQualification: formData.highestQualification,
      secondHighestQualification: formData.secondHighestQualification,
      experienceYears: formData.experienceYears,
    });
  }

  getEmployeeDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.getAllUnitDataByCompanyId(dataRes.employeeDetails.companyId);
        this.getAllDepartmentDataByUnitId(dataRes.employeeDetails.unitId);
        this.getAllSectionDataByDepartmentId(dataRes.employeeDetails.depId);
        var encDecData:any;
        var encArray= ["empName","gender","email","designation","address","empCode","employeeCategory","precedingYearAppraisalRatingN2","precedingYearAppraisalRatingN3","precedingYearAppraisalRatingN4","highestQualification","secondHighestQualification","userName"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.employeeDetails,encArray);
        this.mobileFlag={dialCode:encDecData.countryCode,initialCountry: encDecData.flagCode,preferredCountries: ['jp', 'in']};
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
}
