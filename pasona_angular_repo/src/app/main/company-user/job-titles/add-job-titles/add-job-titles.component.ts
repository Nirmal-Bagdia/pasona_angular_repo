import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { RoleModule } from '../../../shared/roleModule';
import { CustomValidator } from 'app/main/shared/validation';

@Component({
  selector: 'app-add-job-titles',
  templateUrl: './add-job-titles.component.html',
  styleUrls: ['./add-job-titles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddJobTitlesComponent implements OnInit {
  jobTitleForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  userData: any;
  urlCurrent: string;
  gradeData: any[];
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    this.gradeData=[];
    this._unsubscribeAll = new Subject();
    this.userData = this.pasonaService.getUserData();
    this.jobTitleForm = this.fb.group({
      companyId:[this.userData.companyId],
      precedingYearRating: ['', [Validators.required,Validators.maxLength(3)]], /* CustomValidator.alphaNumeric */
      minimumCapPoint: ['', [Validators.required,Validators.min(0),Validators.max(1000)]],
     // designationName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      designationFrom: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      designationTo: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(35)]],
      noOfYearsInPresentGrade: ['', [Validators.required,Validators.max(100),Validators.min(0)]],
    });

    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/jobtitle";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/jobtitle";
    }
  }

  ngOnInit() {
    this.getAllGradeCategory();
  }

  get f() { return this.jobTitleForm.controls; };

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
  
  addJobTitle() {
    if (this.jobTitleForm.valid) {
      this.pasonaService.startSpinner();
      var encData:any;
      var encArray=["designationFrom","designationTo"];
      encData=this.pasonaService.setEncryptObject(this.jobTitleForm.value,encArray);
      this.pasonaService.addJobTitles(encData).subscribe(dataRes => {
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

}


