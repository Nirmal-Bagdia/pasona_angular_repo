import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emptype',
  templateUrl: './add-emptype.component.html',
  styleUrls: ['./add-emptype.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddEmptypeComponent implements OnInit {
  empTypeForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  userData: any;
  urlCurrent: string;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.userData = this.pasonaService.getUserData();
    this.empTypeForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      employmentType: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'), Validators.maxLength(30)]],
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/empType";
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/empType";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/empType";
    }
  }

  ngOnInit() {
    this.getAllCompanyData();
  }

  get f() { return this.empTypeForm.controls; };

  createEmpType() {
    if (this.empTypeForm.valid) {
      this.pasonaService.startSpinner();    
      var encData:any;
      var encArray=["employmentType"];
      encData=this.pasonaService.setEncryptObject(this.empTypeForm.value,encArray);
      this.pasonaService.addEmpType(encData).subscribe(dataRes => {
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
}
