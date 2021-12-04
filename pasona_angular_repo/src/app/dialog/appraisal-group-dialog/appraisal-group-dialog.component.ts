import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-appraisal-group-dialog',
  templateUrl: './appraisal-group-dialog.component.html',
  styleUrls: ['./appraisal-group-dialog.component.scss']
})
export class AppraisalGroupDialogComponent implements OnInit {

  type: any;
  appraisalForm: any;
  userData: any;
  id: any;
  employeeData: any[] = [];
  departmentData: any[] = [];
  sectionData: any[] = [];
  groupEmpIds: any[] = [];
  tempIdStore: any[] = [];
  public empMultiFilterCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
  public filterdEmpMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  filterForm: FormGroup;
  unitData: any[] = [];

  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<AppraisalGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.type = data.data;
    this.id = data.id;
    this.groupEmpIds = [];
    if (data.groupEmpIds) {
      this.groupEmpIds = data.groupEmpIds;
    }

    this.unitData = [];
    this.userData = this.pasonaService.getUserData();
    this.filterForm = this.fb.group({
      companyId: [this.userData.companyId],
      unitId: ['',],
      depId: ['',],
      empName: ['', []],  //CustomValidator.alphaNumeric
      sectionId: ['',],
    });
    this.appraisalForm = this.fb.group({
      // companyId: [this.userData.companyId, [Validators.required]],
      // unitId:[this.userData.unitId],
      groupId: [this.id],
      empId: ['', Validators.required],

    });
    if (this.groupEmpIds.length != 0) {
      this.type = 'Edit';
      this.appraisalForm.patchValue({ empId: this.groupEmpIds });
      this.tempIdStore=[...this.groupEmpIds];
    }

    if (!this.userData.unitId) {
     // this.getAllUnitData();
     // this.getAllEmployee();
    }
    else {
      this.filterForm.patchValue({ unitId: this.userData.unitId });
      this.getAllUnitData();
      this.getAllEmployee();
      this.getAllDepartmentData();
    }

  }

  ngOnInit() {

    // load the initial bank list
    this.filterdEmpMulti.next(this.employeeData.slice());
    // console.log("this.filterdEmpMulti", this.filterdEmpMulti);

    // listen for search field value changes
    this.empMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEmpMulti();
      });
  }
  get f() { return this.appraisalForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }

  addEmployeeToGroup() {
    if (this.appraisalForm.valid) {
      this.pasonaService.startSpinner();
      this.appraisalForm.value.empId=this.tempIdStore;
      this.pasonaService.addEmployeeToGroup(this.appraisalForm.value).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    else {
      this.appraisalForm.markAllAsTouched();
    }
  }

  editEmployeeToGroup() {
    if (this.appraisalForm.valid) {
      var allEmpId = this.tempIdStore;
      var groupEmpIds = this.groupEmpIds;
      console.log("this.groupEmpIds", this.groupEmpIds, "this.tempIdStore", this.tempIdStore);
      var removeId = this.groupEmpIds.filter(function (obj) { return allEmpId.indexOf(obj) == -1; });
      console.log("removeId", removeId, "allEmpId", allEmpId, "this.groupEmpIds", this.groupEmpIds);
      var newId = allEmpId.filter(function (obj) { return groupEmpIds.indexOf(obj) == -1; });
      console.log("newId", newId);
      this.appraisalForm.value.empId = newId;
      this.appraisalForm.value['removeId'] = removeId;
       this.pasonaService.startSpinner();
       this.pasonaService.editEmployeeToGroup(this.appraisalForm.value).subscribe(resp => {
         this.pasonaService.stopSpinner();
         if (resp.status == '1') {
           this.pasonaService.openSnackBar(resp.message);
           this.yes();
         }
       }, error => {
         this.pasonaService.stopSpinner();
       })
    }
    else {
      this.appraisalForm.markAllAsTouched();
    }
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
        console.log("val", val);
        if (selectAllValue) {

          for (var i = 0; i < val.length; i++) {
            empid.push(val[i].id);
          }
          this.appraisalForm.patchValue({ empId: [...empid] });
          // this.appraisalForm.patchValue({empId:val});
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
    if (!this.employeeData) {
      return;
    }
    // get the search keyword
    let search = this.empMultiFilterCtrl.value;
    if (!search) {
      this.filterdEmpMulti.next(this.employeeData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the employee

    this.filterdEmpMulti.next(
      this.employeeData.filter(emp => this.pasonaService.getDecrypt(emp.empCode).toLowerCase().indexOf(search) > -1)
    );
  }


  getAllDepartmentData() {
    this.departmentData = [];
    this.sectionData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentByUnitIdWithEmp(this.filterForm.value.unitId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.departmentData = resp.departmentDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })

  }


  getAllSectionDataByDepartmentIdFilter(id) {
    this.sectionData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionByDepartmentId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData = resp.sectionDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  getAllSectionDataByDepartmentId(id) {
    this.sectionData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionByDepartmentIdWithEmployee(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData = resp.sectionDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllEmployee() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllEmployeeWithFilterParticipant(this.filterForm.value).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.employeeData = resp.appraisalPlanDetails;
        this.filterdEmpMulti.next(this.employeeData.slice());
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  getAllUnitData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  changeSlection(val) {
    if (this.tempIdStore.length == 0) {
      this.tempIdStore.push(val);
      this.appraisalForm.patchValue({ empId: this.tempIdStore });
    }
    else {
      let index = this.tempIdStore.indexOf(val);
      if (index == -1) {
        this.tempIdStore.push(val);
        this.appraisalForm.patchValue({ empId: this.tempIdStore });
      }
      else {
        this.tempIdStore.splice(index, 1);
        this.appraisalForm.patchValue({ empId: this.tempIdStore });
      }
    }
    console.log("this.tempIdStore", this.tempIdStore);
  }
}




