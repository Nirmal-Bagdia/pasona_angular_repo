import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class EditCompanyComponent implements OnInit {
  companyForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  fileToUpload: any;
  imgURL: string | ArrayBuffer;
  sub: any;
  id: number;
  companyType: any;
  @ViewChild('photoInput', { static: false }) myInputVariable: ElementRef;
  cityData: any[];
  stateData: any;
  countryData: any;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    this.countryData = [];
    this.stateData = [];
    this.cityData = [];
    this.fileToUpload = "";
    this.companyType = [];
    this._unsubscribeAll = new Subject();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(200)]],
      registrationNo: ['', [Validators.required, CustomValidator.alphaNumeric1]],
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      userName: ['', [Validators.required, CustomValidator.alphaNumeric1, Validators.minLength(10), Validators.maxLength(20)]],
      website: ['', [CustomValidator.urlValidator]],
     // code: ['',],
      typeName: [{ disabled: true, value: '' }, [Validators.required, CustomValidator.alphaNumeric]],
      type: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      files: ['',],
      status: ['']
    });
  }

  ngOnInit() {
    this.getCompanyById(this.id);
    this.getAllCompanyType();
    this.getAllCountry();
  }

  get f() { return this.companyForm.controls; };

  preview(files) {
    this.imgURL = "";
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
    const img = new Image();
    img.src = window.URL.createObjectURL(files[0]);
    console.log("img", img);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      console.log("width", width);
      console.log("height", height);
      window.URL.revokeObjectURL(img.src);
      if (width > 150 && height > 150) {
        this.pasonaService.openSnackBar("photo should be 150 x 150 size");
        console.log("ddd", this.myInputVariable.nativeElement.files);
        this.myInputVariable.nativeElement.value = "";
        console.log("dd", this.myInputVariable.nativeElement.files);
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
                  console.log("ddd", this.myInputVariable.nativeElement.files);
                  this.myInputVariable.nativeElement.value = null;
                  console.log("dd", this.myInputVariable.nativeElement.files);
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
  updateCompany() {
    if (this.companyForm.valid) {
      var encDecData:any;
      this.companyForm.value.email = this.companyForm.value.email.trim();
      var encArray=["companyName","registrationNo","email","userName","website"];
      encDecData=this.pasonaService.setEncryptObject(this.companyForm.value,encArray);
      var params = new FormData();
      params.append('companyName', encDecData.companyName);
      params.append('registrationNo', encDecData.registrationNo);
      params.append('countryId', encDecData.country);
      params.append('stateId',encDecData.state);
      params.append('cityId', encDecData.city);
      // params.append('email', this.companyForm.value.email);
      //  params.append('userName', this.companyForm.value.password);
      params.append('website', encDecData.website);
      params.append('status', encDecData.status);
      params.append('type', encDecData.type);
      params.append('typeName', encDecData.typeName);
      // if(this.fileToUpload)
      // {
      params.append('files', this.fileToUpload);
      //  }

      params.append('companyId', this.id.toString());
      this.pasonaService.startSpinner();
      this.pasonaService.editCompany(params).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate(['/admin/company']);
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
      this.companyForm.markAllAsTouched();
    }
  }

  changeValidInput() {
    if (this.companyForm.value.website == '') {
      this.companyForm.controls['website'].setErrors(null);
    }
  }

  getCompanyById(id) {
    this.pasonaService.getCompanyById(id).subscribe(dataRes => {
      //   this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var encDecData:any;
        console.log("dataRes.companyDetails", dataRes.companyDetails);
        this.getAllStateByCountry(dataRes.companyDetails.countryId);
        this.getAllCityByStateId(dataRes.companyDetails.stateId);
        var encArray=["companyName","registrationNo","email","userName","website","typeName"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.companyDetails,encArray);
        this.patchValueForm(encDecData);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      // this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  patchValueForm(FormData) {
    this.companyForm.patchValue({
      companyName: FormData.companyName,
      registrationNo: FormData.registrationNo,
      email: FormData.email,
      userName: FormData.userName,
      website: FormData.website,
      //code: FormData.code,
      type: +FormData.type,
      country: +FormData.countryId,
      state: FormData.stateId,
      city: +FormData.cityId,
      status: FormData.status.toString()
    })
    this.imgURL = FormData.logo;
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
    this.pasonaService.startSpinner();
    this.companyForm.patchValue({ city: '' });
    this.cityData = [];
    this.pasonaService.getAllCityByState(id).subscribe(resp => {
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
