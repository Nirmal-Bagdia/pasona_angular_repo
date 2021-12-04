import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-unit-company',
  templateUrl: './add-unit-company.component.html',
  styleUrls: ['./add-unit-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddUnitCompanyComponent implements OnInit {
  unitForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  countryData: any[];
  stateData: any[];
  cityData: any[];
  companyData: any;
  userData: any;
  urlCurrent: string;
  mobileFlag: { dialCode: string; initialCountry: string; preferredCountries: ['jp', 'in']};
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    this.mobileFlag={dialCode: "81",initialCountry: "jp",preferredCountries: ['jp', 'in']};
    this._unsubscribeAll = new Subject();
    this.countryData = [];
    this.stateData = [];
    this.cityData = [];
    this.countryData = [];
    this.companyData = [];
    this.userData = this.pasonaService.getUserData();
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
      companyId: [this.userData.companyId, [Validators.required]],
      countryCode :['',],
      flagCode:['']
    }, {
      validator: CustomValidator.passwordMatchValidator
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/unit";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/unit";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/unit";
    }
  }


  ngOnInit() {
    this.getAllCountry();
    this.getAllCompanyData();
  }

  onCountryChange(countryCode) {
    console.log(countryCode)
    this.mobileFlag={dialCode:countryCode.dialCode,initialCountry: countryCode.iso2,preferredCountries: ['jp', 'in']};
   }

  get f() { return this.unitForm.controls; };


  createUnit() {
    if (this.unitForm.valid) {
      this.pasonaService.startSpinner();
      this.unitForm.value.email=this.unitForm.value.email.trim();
      var encData:any;
      var encArray=["unitName","email","userName","address","admin"];
      this.unitForm.value.countryCode=this.mobileFlag.dialCode;
      this.unitForm.value.flagCode=this.mobileFlag.initialCountry;
      encData=this.pasonaService.setEncryptObject(this.unitForm.value,encArray);
      this.pasonaService.addUnit(encData).subscribe(dataRes => {
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
    this.stateData = [];
    this.cityData = [];
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
    this.unitForm.patchValue({ city: '' });
    this.cityData = [];
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
}
