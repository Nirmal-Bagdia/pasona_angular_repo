import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from './../../../shared/validation';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  fileToUpload: any;
  imgURL: string | ArrayBuffer;
  companyType: any;
  @ViewChild('photoInput', { static: false }) myInputVariable: ElementRef;
  countryData: any;
  stateData: any[];
  cityData: any[];
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {

    this.imgURL = "assets/images/company.png"
    this._unsubscribeAll = new Subject();
    this.companyType = [];
    this.cityData = [];
    this.stateData = [];
    this.countryData = [];
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(200)]],
      registrationNo: ['', [Validators.required, CustomValidator.alphaNumeric1]],
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      userName: ['', [Validators.required, CustomValidator.alphaNumeric1, Validators.minLength(10), Validators.maxLength(20)]],
      //  password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      // confirm: ['', [Validators.required]],
      website: ['', [CustomValidator.urlValidator]],//,CustomValidator.urlValidator
      //code: ['',],
      type: ['', Validators.required],
      files: ['',],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      typeName: [{ disabled: true, value: '' }, [Validators.required, CustomValidator.alphaNumeric]],
      status: ['1'],
   /*  }, {
      validator: CustomValidator.passwordMatchValidator */
    });
  }

  ngOnInit() {
    this.getAllCompanyType();
    this.getAllCountry();
  }

  get f() { return this.companyForm.controls; };

  preview(files) {
    this.imgURL = "";
    this.fileToUpload = files[0];
    console.log("files", this.fileToUpload);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    // this.imagePath = files;
    const img = new Image();
    img.src = window.URL.createObjectURL(files[0]);
    console.log("img", img);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      // console.log("width", width);
      // console.log("height", height);
      window.URL.revokeObjectURL(img.src);
      if (width > 150 && height > 150) {
        this.pasonaService.openSnackBar("photo should be 150 x 150 size");
        // console.log("ddd", this.myInputVariable.nativeElement.files);
        this.myInputVariable.nativeElement.value = null;
        // console.log("dd", this.myInputVariable.nativeElement.files);
      }
      else {
        this.imgURL = reader.result;
      }
    }
  }

  fileChangeEvent(files: any) {
    if (files[0]) {
        // Size Filter Bytes
        console.log(files[0]);
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 100;
        const max_width = 250;
        if (files[0].size > max_size) {
          this.pasonaService.openSnackBar(`Maximum size allowed is ${max_size / 1000} Mb`);
            return false;
        }
        if (!_.includes(allowed_types, files[0].type)) {
          this.pasonaService.openSnackBar("Only Images are allowed ( JPG | PNG )");
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
                console.log(img_height, img_width);
                if (img_height > max_height || img_width > max_width) {
                  this.fileToUpload='';
                  this.imgURL='';
                  this.pasonaService.openSnackBar("photo should be 250 x 100 size");
                  // console.log("ddd", this.myInputVariable.nativeElement.files);
                  this.myInputVariable.nativeElement.value = null;
                  // console.log("dd", this.myInputVariable.nativeElement.files);
                    return false;
                } else {
                  this.fileToUpload = files[0];
                  this.imgURL = e.target.result;
                }
            };
        };
        reader.readAsDataURL(files[0]);
    }
}

  createCompany() {
    if (this.companyForm.valid) {
      var encData:any;
      this.companyForm.value.email = this.companyForm.value.email.trim();
      var encArray=["companyName","registrationNo","email","userName","website"];//"typeName"
      encData=this.pasonaService.setEncryptObject(this.companyForm.value,encArray);
      console.log("this.companyForm.value enc check",this.companyForm.value);
      var params = new FormData();
      params.append('companyName', encData.companyName);
      params.append('registrationNo', encData.registrationNo);
      params.append('email', encData.email);
      params.append('userName', encData.userName);
      params.append('website', encData.website);
     // params.append('code', encData.code);
      params.append('type', encData.type);
      params.append('typeName', encData.typeName);
      params.append('countryId', encData.country);
      params.append('stateId', encData.state);
      params.append('cityId', encData.city);
      params.append('status', encData.status);
      params.append('files', this.fileToUpload);
      this.pasonaService.startSpinner();
      this.pasonaService.addCompany(params).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate(['/admin/company']);
        }
        else {
          this.pasonaService.infoMessage(dataRes.message);
          // this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.companyForm.markAllAsTouched();
    }
  }

  
  changeValidInput() {
    if (this.companyForm.value.website == '') {
      this.companyForm.controls['website'].setErrors(null);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllCompanyType() {
    this.pasonaService.getCompanyType().subscribe(dataRes => {
      //   this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.companyType = dataRes.companyType;
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      // this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  getAllCountry() {
    // this.pasonaService.showSpinner();
    this.pasonaService.getAllCountry().subscribe(resp => {
      //   this.pasonaService.hideSpinner();
      if (resp.status == '1') {
        this.countryData = resp.countryDetails;
      }
    }, error => {
      //   this.pasonaService.hideSpinner();
    })
  }

  getAllStateByCountry(id) {
    console.log("id", id);
    this.pasonaService.startSpinner();
    this.companyForm.patchValue({ state: '', city: '' });
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
    this.companyForm.patchValue({ city: '' });
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

  setValidators() {
    console.log(this.companyForm.value);
    if (this.companyForm.value.type == 11) {
      this.companyForm.get('typeName').enable();
    } else {
      this.companyForm.get('typeName').disable();
    }
  }

}
