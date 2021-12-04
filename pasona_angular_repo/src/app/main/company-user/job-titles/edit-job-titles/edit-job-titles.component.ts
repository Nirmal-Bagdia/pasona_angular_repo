import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { RoleModule } from '../../../shared/roleModule';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-edit-job-titles',
  templateUrl: './edit-job-titles.component.html',
  styleUrls: ['./edit-job-titles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditJobTitlesComponent implements OnInit {
  jobTitleForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  userData: any;
  urlCurrent: string;
  roleModule: any;
  sub: any;
  id: number;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, public route: ActivatedRoute
  ) {
    
    this.roleModule = {};
    this._unsubscribeAll = new Subject();
    this.userData = this.pasonaService.getUserData();
    this.jobTitleForm = this.fb.group({
      companyId:[this.userData.companyId],
      jobTitleId:['',],
      precedingYearRating: ['', [Validators.required,Validators.maxLength(3)]],/*  CustomValidator.alphaNumeric */
      minimumCapPoint: ['', [Validators.required,Validators.min(0),Validators.max(1000)]],
     // designationName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      designationFrom: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      designationTo: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      noOfYearsInPresentGrade: ['', [Validators.required,Validators.max(100),Validators.min(0)]],
    });


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    }); 
    
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/jobtitle";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/jobtitle";
    }

    var roleData = this.pasonaService.getRoleModule(16);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        this.jobTitleForm.disable();
      }
      console.log("roleData", roleData);
    }
  }

  ngOnInit() {
    this.getJobTitleDataById();
  }

  get f() { return this.jobTitleForm.controls; };


  editJobTitle() {
    if (this.jobTitleForm.valid) {
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["designationFrom","designationTo"];
      encData=this.pasonaService.setEncryptObject(this.jobTitleForm.value,encArray);
      this.pasonaService.editJobTitles(encData).subscribe(dataRes => {
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
      this.jobTitleForm.markAllAsTouched();
    }
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  patchValueForm(formData) {
    this.jobTitleForm.patchValue({
      jobTitleId: +formData.jobTitleId,
      companyId: +formData.companyId,
      designationFrom: formData.designationFrom,
      designationTo: formData.designationTo,
      minimumCapPoint:formData.minimumCapPoint,
      noOfYearsInPresentGrade:formData.noOfYearsInPresentGrade,
      precedingYearRating:formData.precedingYearRating,
    });
  }

  getJobTitleDataById() {
    this.pasonaService.startSpinner();
    console.log("id", this.id);
    this.pasonaService.getJobTitlesById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var encDecData:any;
        var encArray=["designationFrom","designationTo"];
        encDecData=this.pasonaService.getDecryptObject(dataRes.jobTitleDetails,encArray);
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
