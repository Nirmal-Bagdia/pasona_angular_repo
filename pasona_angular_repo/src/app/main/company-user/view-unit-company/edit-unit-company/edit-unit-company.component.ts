import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-edit-unit-company',
  templateUrl: './edit-unit-company.component.html',
  styleUrls: ['./edit-unit-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class EditUnitCompanyComponent implements OnInit {
  unitForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  countryData: any[];
  stateData: any[];
  cityData: any[];
  companyData: any;
  sub: any;
  id: number;
  userData: any;
  roleModule: any;
  urlCurrent: string;
  mobileFlag: { dialCode: string; initialCountry: string; preferredCountries: ['jp', 'in']};
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    let flag=JSON.parse(sessionStorage.getItem('flagMobile'));
    this.mobileFlag={dialCode: "91",initialCountry: flag,preferredCountries: ['jp', 'in']};
    this._unsubscribeAll = new Subject();
    this.countryData = [];
    this.stateData = [];
    this.cityData = [];
    this.countryData = [];
    this.companyData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.unitForm = this.fb.group({
      unitName: ['', [Validators.required, CustomValidator.alphaNumeric,Validators.maxLength(30)]],
      address: ['', Validators.required],
      city: ['', [Validators.required]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      userName: ['', [Validators.required, CustomValidator.alphaNumeric1,Validators.maxLength(20),Validators.minLength(10)]],
      contactNo: ['', [Validators.required, CustomValidator.numberValidator, Validators.minLength(7), Validators.maxLength(14)]],
      admin: ['',],
      companyId: ['', [Validators.required]],
      unitId: [''],
      countryCode :['',],
      flagCode:['']
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/unit";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/unit";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/unit";
    }

    var roleData = this.pasonaService.getRoleModule(2);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.unitForm.disable();
      }
      console.log("roleData", roleData);
    }
  }

  ngOnInit() {
    this.getAllCountry();
    this.getAllCompanyData();
    this.getUnitDataById();
  }

  get f() { return this.unitForm.controls; };

  onCountryChange(countryCode) {
    console.log(countryCode)
    this.mobileFlag={dialCode:countryCode.dialCode,initialCountry: countryCode.iso2,preferredCountries: ['jp', 'in']};
   }

  editUnit() {
    if (this.unitForm.valid) {
      this.pasonaService.startSpinner();
      this.unitForm.value.email=this.unitForm.value.email.trim();
      var encData:any;
      var encArray=["unitName","email","userName","address","admin"];
      this.unitForm.value.countryCode=this.mobileFlag.dialCode;
      this.unitForm.value.flagCode=this.mobileFlag.initialCountry;
      encData=this.pasonaService.setEncryptObject(this.unitForm.value,encArray);
      this.pasonaService.editUnit(encData).subscribe(dataRes => {
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
      this.unitForm.markAllAsTouched();
    }
  }

  getUnitDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.getAllStateByCountry(dataRes.unitDetails.country);
        this.getAllCityByStateId(dataRes.unitDetails.state);
        var encDecData:any;
        var encArray=["unitName","email","userName","address","admin"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.unitDetails,encArray);
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
    this.unitForm.patchValue({ state: '', city: '' });
    this.cityData = [];
    this.stateData = [];
    this.pasonaService.getAllStateByCountryId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.stateData = resp.stateDetail;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllCityByStateId(id) {
    this.unitForm.patchValue({ city: '' });
    this.cityData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCityByState(id).subscribe(resp => {
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

  patchValueForm(formData) {
    this.unitForm.patchValue({
      unitName: formData.unitName,
      address: formData.address,
      city: + formData.city,
      state: + formData.state,
      email:formData.email,
      country: + formData.country,
      userName: formData.userName,
      password: formData.password,
      contactNo: formData.contactNo,
      admin: formData.admin,
      companyId: + formData.companyId,
      unitId: formData.unitId
    });
  }
}
