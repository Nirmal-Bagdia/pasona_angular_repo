import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-emptype',
  templateUrl: './edit-emptype.component.html',
  styleUrls: ['./edit-emptype.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class EditEmptypeComponent implements OnInit {
  empTypeForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  unitData: any;
  id: any;
  sub: any;
  userData: any;
  urlCurrent: string;
  roleModule: any;
  companyData: any[];
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.empTypeForm = this.fb.group({
      companyId: ['', [Validators.required]],
      employmentType: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), Validators.maxLength(30)]],
      id: ['']
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/empType";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/empType";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/empType";
    }

    var roleData = this.pasonaService.getRoleModule(6);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.empTypeForm.disable();
      }
      console.log("roleData", roleData);
    }
  }


  ngOnInit() {
    this.getAllCompanyData();
    this.getEmpTypeById();
  }

  get f() { return this.empTypeForm.controls; };

  editEmpType() {
    if (this.empTypeForm.valid) {
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["employmentType"];
      encData=this.pasonaService.setEncryptObject(this.empTypeForm.value,encArray);
      this.pasonaService.editEmpType(encData).subscribe(dataRes => {
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
      this.empTypeForm.markAllAsTouched();
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
    this.empTypeForm.patchValue({
      employmentType: formData.employmentType,
      companyId: + formData.companyId,
      id: this.id
    });
  }

  getEmpTypeById() {
    this.pasonaService.startSpinner();
    console.log("id", this.id);
    this.pasonaService.getEmpTypeById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {        
      var encDecData:any;
      var encArray=["employmentType"];
      encDecData=this.pasonaService.getDecryptObject(dataRes.EmploymentType,encArray);
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

