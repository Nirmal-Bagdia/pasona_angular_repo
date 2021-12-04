import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-appraiser-dialog',
  templateUrl: './add-appraiser-dialog.component.html',
  styleUrls: ['./add-appraiser-dialog.component.scss']
})
export class AddAppraiserDialogComponent implements OnInit {

  type: any;
  appraisalForm: any;
  userData: any;
  id: any;
  employeeData: any[] = [];
  appraisalParameterData: any[] = [];
  empData: any[] = [];

  public empMultiFilterCtrl: FormControl = new FormControl();
  public fAppraiserFilterCtrl: FormControl = new FormControl();
  public sAppraiserFilterCtrl: FormControl = new FormControl();
  public tAppraiserFilterCtrl: FormControl = new FormControl();
  public goalApproverFilterCtrl: FormControl = new FormControl();
  public ratingConsoFilterCtrl: FormControl = new FormControl();
  public finalApproverFilterCtrl: FormControl = new FormControl();



  /** list of banks filtered by search keyword */
  public filterdEmpMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filterdfAppraiser: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filterdsAppraiser: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filterdtAppraiser: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filterdgoalApprover: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filterdratingConso: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public filterdfinalApprover: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  appraiserCount: any;
  
  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<AddAppraiserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.type = data.data;
    this.id = data.id;
    this.userData = this.pasonaService.getUserData();
    this.appraisalForm = this.fb.group({
      // companyId: [this.userData.companyId, [Validators.required]],
      // unitId:[this.userData.unitId],
      // empId:[this.userData.empCode],'
      appraisalPlanId:[data.appraisalPlanId],
      empId: ['', Validators.required],
      goalApprover: ['', Validators.required],
      ratingConsolidator: ['', Validators.required],
      finalApprover: ['', Validators.required],
      firstAppraiser: ['', Validators.required],
      secondAppraiser: ['',Validators.required],
      thirdAppraiser: ['',Validators.required],
    });
    if (this.type == 'Edit') {
      //this.getAppraisalDataById();
      this.patchValueForm(data.empData);
    }
    if (data.choice == 'single') {
      data.empData.id = data.empData.empId;
      this.empData.push(data.empData);
      var empid = [];
      empid.push(data.empData.empId);
      this.appraisalForm.patchValue({ empId: empid });
      this.appraisalForm.get('empId').disable();
      console.log(this.appraisalForm.value.empId);
    }
    else {
      this.empData = data.empData;
      console.log("this.empData", this.empData);
    }
    console.log("empData", data);
if(data.ratingConsolidator)
{
  this.appraisalForm.patchValue({ratingConsolidator:data.ratingConsolidator});
  this.appraisalForm.get('ratingConsolidator').disable();
}
  }

  ngOnInit() {
    this.getAllEmployeeData();
    this.getAppraiserReqired();
    // load the initial bank list
    this.filterdEmpMulti.next(this.empData.slice());
    console.log("this.filterdEmpMulti", this.filterdEmpMulti);

    // listen for search field value changes
    this.empMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEmpMulti();
      });

    this.fAppraiserFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdfAppraiser = this.pasonaService.filterSearchSelectData(this.employeeData, this.fAppraiserFilterCtrl, this.filterdfAppraiser);
      });

    this.sAppraiserFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdsAppraiser = this.pasonaService.filterSearchSelectData(this.employeeData, this.sAppraiserFilterCtrl, this.filterdsAppraiser);
      });

    this.tAppraiserFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdtAppraiser = this.pasonaService.filterSearchSelectData(this.employeeData, this.tAppraiserFilterCtrl, this.filterdtAppraiser);
      });

    this.goalApproverFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdgoalApprover = this.pasonaService.filterSearchSelectData(this.employeeData, this.goalApproverFilterCtrl, this.filterdgoalApprover);
      });

    this.ratingConsoFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdratingConso = this.pasonaService.filterSearchSelectData(this.employeeData, this.ratingConsoFilterCtrl, this.filterdratingConso);
      });

    this.finalApproverFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdfinalApprover = this.pasonaService.filterSearchSelectData(this.employeeData, this.finalApproverFilterCtrl, this.filterdfinalApprover);
      });
  }
  get f() { return this.appraisalForm.controls; };


  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }
  getAppraiserReqired()
  {
    this.pasonaService.getAppraiserReqired(this.data.groupId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraiserCount=resp.appraiser;
        if(resp.appraiser==1)
        {
          this.appraisalForm.controls['secondAppraiser'].setValidators(null);
          this.appraisalForm.controls['secondAppraiser'].updateValueAndValidity();
          this.appraisalForm.controls['thirdAppraiser'].setValidators(null);
          this.appraisalForm.controls['thirdAppraiser'].updateValueAndValidity();
        }
        else if(resp.appraiser==2)
        {
          this.appraisalForm.controls['thirdAppraiser'].setValidators(null);
          this.appraisalForm.controls['thirdAppraiser'].updateValueAndValidity();
        }
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  addAppraiser() {
    if (this.appraisalForm.valid) {
      this.pasonaService.startSpinner();
      this.appraisalForm.get('empId').enable();
      this.appraisalForm.get('ratingConsolidator').enable();
      this.pasonaService.addAppraiser(this.appraisalForm.value).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
        else
        {
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    else {
      this.appraisalForm.markAllAsTouched();
    }
  }


  patchValueForm(formData) {
    this.appraisalForm.patchValue({
      firstAppraiser: +formData.firstAppraiser,
      secondAppraiser: +formData.secondAppraiser,
      thirdAppraiser: +formData.thirdAppraiser,
      goalApprover: +formData.goalApprover,
      ratingConsolidator: +formData.ratingConsolidator,
      finalApprover: +formData.finalApprover,
    });
  }

  getAppraisalDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAppraisalPlanById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.patchValueForm(dataRes.appraisalPlanDetails);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }


  getallAppraisalParameter() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalParameter(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraisalParameterData = resp.appraisalParameterDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllEmployeeData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByCompanyIdWithoutPagination(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.employeeData = resp.employeeDetails;
        this.filterdfAppraiser.next(this.employeeData.slice());
        this.filterdsAppraiser.next(this.employeeData.slice());
        this.filterdtAppraiser.next(this.employeeData.slice());
        this.filterdgoalApprover.next(this.employeeData.slice());
        this.filterdratingConso.next(this.employeeData.slice());
        this.filterdfinalApprover.next(this.employeeData.slice());
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean) {
    var empid = [];
    this.filterdEmpMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        if (selectAllValue) {
          for (var i = 0; i < val.length; i++) {
            empid.push(val[i].id);
          }
          this.appraisalForm.patchValue({ empId: empid });
        } else {
          this.appraisalForm.patchValue({ empId: [] });
        }
      });
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filterdEmpMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        //   this.multiSelect.compareWith = (a, b) => a && b && a.id == b.id;
      });
  }

  protected filterEmpMulti() {
    if (!this.empData) {
      return;
    }
    // get the search keyword
    let search = this.empMultiFilterCtrl.value;
    if (!search) {
      this.filterdEmpMulti.next(this.empData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filterdEmpMulti.next(
      this.empData.filter(emp => this.pasonaService.getDecrypt(emp.empCode).toLowerCase().indexOf(search) > -1)
    );
  }
}



