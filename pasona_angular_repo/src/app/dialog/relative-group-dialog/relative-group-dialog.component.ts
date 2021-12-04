import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
@Component({
  selector: 'app-relative-group-dialog',
  templateUrl: './relative-group-dialog.component.html',
  styleUrls: ['./relative-group-dialog.component.scss']
})
export class RelativeGroupDialogComponent implements OnInit {
  type: any;
  userData: any;
  groupData: any[];
  groupIds: any[];
  groupForm: FormGroup;
  employeeData: any[] = [];
  protected _onDestroy = new Subject<void>();
  public ratingConsoFilterCtrl: FormControl = new FormControl();
  public filterdratingConso: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  tempGroupId: any[]=[];

  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<RelativeGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.type;
    this.groupData = [];
    this.groupIds = [];
    this.userData = this.pasonaService.getUserData();
    this.groupForm = this.fb.group({
      groups: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.getAllGroupData();
    this.getAllEmployeeData();
   
    this.ratingConsoFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterdratingConso = this.pasonaService.filterSearchSelectData(this.employeeData, this.ratingConsoFilterCtrl, this.filterdratingConso);
      });
  }

  groups(): FormArray {
    return this.groupForm.get("groups") as FormArray
  }

  newGroup(): FormGroup {
    return this.fb.group({
      groupId: [''],
      relativeGroupId: ['',],
      ratingConsolidator: ['']
    })
  }

  addGroups() {
    this.groups().push(this.newGroup());
  }
  removeGroup(empIndex: number) {
    this.groups().removeAt(empIndex);
  }

  onNoClick(): void {
    this.dialogRef.close(true);
  }

  yes() {
    this.dialogRef.close(true);
  }

  getAllEmployeeData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByCompanyIdWithoutPagination(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.employeeData = resp.employeeDetails;
        this.filterdratingConso.next(this.employeeData.slice());
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllGroupData() {
    this.pasonaService.startSpinner();
    //  if (this.userData.userType == '2' || this.userData.userType == '4') {
    this.pasonaService.getRelativeGroupByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
    
      if (resp.status == '1') {
        this.groupData = this.pasonaService.getdecryptArray(resp.groupDetails, ['groupName']);
        this.groupData.forEach((element, index) => {
          this.addGroups();
          this.groups().at(index).patchValue({ groupId: element.groupId });
          this.groupIds.push('');
          this.tempGroupId.push(element.groupId);
        });
        console.log("form", this.groupForm.value)
        this.getAllSaveRelativeGroupData();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
    //  }
  }

  getAllSaveRelativeGroupData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllSavedRelativeGroupsByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        let groups=resp.groupDetails.groups;
        groups.forEach((element, index) => {
          this.groups().at(index).patchValue({groupId:element.groupId,relativeGroupId:element.relativeGroupId,ratingConsolidator:element.ratingConsolidator});
          let ind= this.tempGroupId.indexOf(element.groupId);
          this.groupIds[ind]=element.groupId;
          element.relativeGroupId.forEach((element, index) => {
            let ind1= this.tempGroupId.indexOf(element);
            this.groupIds[ind1]=element;
          });
        });
        console.log("element",this.groupForm.value.groups)
        console.log("form", this.groupIds);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  submitRelativeGroup() {
    console.log(this.groupForm.value)
    
    if(this.groupForm.valid){
      for (let i = 0; i < this.groupIds.length; i++) {
        if (!this.groupIds[i]) {
          this.pasonaService.infoMessage('Please select all relative groups');
          return;
        }
      }
    let params = {
      companyId: this.userData.companyId,
      groups: [],
    }
    for (let j = 0; j < this.groupForm.value.groups.length; j++) {
      if (this.groupForm.value.groups[j].relativeGroupId!="" || this.groupForm.value.groups[j].relativeGroupId.length!=0)
        params.groups.push(this.groupForm.value.groups[j]);
    }
     console.log(params);
    this.pasonaService.submitRelativeGroup(params).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.yes();
        this.pasonaService.openSnackBar(resp.message);
      }
      else
      {
        this.pasonaService.infoMessage(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  else
  {
    this.groupForm.markAllAsTouched();
  }
  }

  idsStore(ch, id, parentId, index, pointIndex) {
    if (ch) {
      this.groupIds[index] = id;
      this.groupIds[pointIndex] = parentId;
    }
    else if (!ch && this.groups().at(pointIndex).value.relativeGroupId.length == 0) {
      this.groupIds[pointIndex] = '';
      this.groupIds[index] = '';
    }
    else {
      this.groupIds[index] = '';
    }

  }

  validateConsolidator(val, ind) {
    console.log(val, ind);
    if (val.length) {
      this.groups().at(ind).get('ratingConsolidator').setValidators([Validators.required]);
      this.groups().at(ind).get('ratingConsolidator').updateValueAndValidity();
    }
    else {
      this.groups().at(ind).get('ratingConsolidator').setValidators(null);
      this.groups().at(ind).get('ratingConsolidator').updateValueAndValidity();
    }
  }

}




