import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { EmployeeListDialogComponent } from 'app/dialog/employee-list-dialog/employee-list-dialog.component';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddParticipantComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  displayedColumns: string[] = ['sNo', 'departmentName'];
  displayedColumns3: string[] = ['sNo', 'groupName','confi'];
  displayedColumns1: string[] = ['sNo', 'empName', 'department', 'email', 'phone', 'designation'];
  displayedColumns2: string[] = ['sNo', 'sectionName', 'unit', 'department'];
  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  dataSource4 = new MatTableDataSource<any>();
  planForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  fileToUpload: any;
  imgURL: string | ArrayBuffer;
  unitData: any;
  userData: any;
  participantData: any[] = [];
  sub: any;
  id: number;
  moduleids: any[] = [];
  departmentData: any[] = [];
  sectionData: any[];
  stateName: any;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private dialog: MatDialog, private route: ActivatedRoute
  ) {
    this.stateName=this.pasonaService.getStateData();
    this._unsubscribeAll = new Subject();
    this.unitData = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.planForm = this.fb.group({
      companyId: [this.userData.companyId],
      unitId: [this.userData.unitId,],
      depId: ['',],
      empName: ['', []],  //CustomValidator.alphaNumeric
      sectionId: ['',],
    });

  }


  ngOnInit() {
    //this.getAllDepartmentData();
    this.getAllGroupData();
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  get f() { return this.planForm.controls; };

  addParticipant(ch) {
    if (this.moduleids.length != 0) {
      let data = {
        companyId: this.userData.companyId,
        unitId: this.userData.unitId,
        employeeId: this.userData.empCode,
        planId: this.id,
        depId: [],
        sectionId: [],
        groupId: [],
        empId: [],
      }
      if (ch == 's') {
        data.sectionId = this.moduleids;
      }
      else if (ch == 'g') {
        data.groupId = this.moduleids;
      }
      else if (ch == 'd') {
        data.depId = this.moduleids;
      }
      else {
        data.empId = this.moduleids;
      }
      this.pasonaService.startSpinner();
      this.pasonaService.addAppraisalPlanParticipant(data).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          if (dataRes.appraisalPlanDetails) {
            var data = [];
            if (dataRes.appraisalPlanDetails.department.length != 0) {
              for (let i = 0; i < dataRes.appraisalPlanDetails.department.length; i++) {
                data.push(dataRes.appraisalPlanDetails.department[i].departmentName);
              }
            }
            else if (dataRes.appraisalPlanDetails.section.length != 0) {
              for (let i = 0; i < dataRes.appraisalPlanDetails.section.length; i++) {
                data.push(dataRes.appraisalPlanDetails.section[i].sectionName);
              }
            }
            else if (dataRes.appraisalPlanDetails.group.length != 0) {
              for (let i = 0; i < dataRes.appraisalPlanDetails.group.length; i++) {
                data.push(dataRes.appraisalPlanDetails.group[i].groupName);
              }
            }
            else if (dataRes.appraisalPlanDetails.employees.length != 0) {
              this.faildEmployeePopup(dataRes.appraisalPlanDetails.employees, data.toString());
            }
            else {
              this.backToPartcipant();
            }
          }
          // 
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
      this.planForm.markAllAsTouched();
    }
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllUnitDataByCompanyId(id) {
    // this.pasonaService.showSpinner();
    this.pasonaService.getUnitByCompanyId(id).subscribe(resp => {
      //   this.pasonaService.hideSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
      }
    }, error => {
      //   this.pasonaService.hideSpinner();
    })
  }

  applyFilter(filterValue: string) {
    filterValue=this.pasonaService.setEncrypt(filterValue);
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    this.dataSource4.filter = filterValue.trim().toLowerCase();
  }

  getAllAppraisalPlanData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlan(this.userData.empCode).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.participantData = resp.appraisalPlanDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  public setSelected(data, event, ind) {
    console.log("checked", event.checked);
    if (event.checked == true) {
      this.participantData[ind].checked = true;
      this.moduleids.push(data.ids);
    }
    else {
      var indexVal = this.moduleids.findIndex(record => record == data.ids)
      this.moduleids.splice(indexVal, 1);
      this.participantData[ind].checked = false;
    }
    console.log("this.empIds", this.moduleids);
  }

  public selectAll(event) {
    if (event.checked == true) {
      this.participantData.forEach((element, ind) => {
        if(element.groupConfigStatus==1)
        {
          element.checked = true;
          this.moduleids.push(element.ids)
        }
      });
    }
    else {
      this.participantData.forEach(element => {
        element.checked = false;
      });
      this.moduleids = [];
    }
    console.log("this.empIds", this.moduleids);
  }

  backToPartcipant() {
    this.router.navigate(['/employee/viewPlan/', this.id]);
  }

  getAllDepartmentData() {
    this.participantData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentByUnitIdWithEmp(this.userData.unitId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.participantData = resp.departmentDetails;
        this.departmentData = resp.departmentDetails;
        this.participantData.forEach((element, ind) => {
          element['checked'] = false;
          element['ids'] = element.depId;
        });
        this.dataSource1 = new MatTableDataSource<any>(this.participantData);
        this.dataSource1.paginator = this.paginator.toArray()[0];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllGroupData() {
    this.participantData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getGroupByCompanyIdWithEmployee(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.participantData = resp.groupDetails;
        this.participantData.forEach((element, ind) => {
          element['checked'] = false;
          element['ids'] = element.groupId;
        });
        this.dataSource3 = new MatTableDataSource<any>(this.participantData);
        this.dataSource3.paginator = this.paginator.toArray()[0];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  departmentChange(val) {
    if (val) {
      this.getAllSectionDataByDepartmentId(val);
    }
    else {
      this.getAllSectionData();
    }
  }

  getAllSectionDataByDepartmentId(id) {
    this.sectionData = [];
    this.participantData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionByDepartmentIdWithEmployee(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData = resp.sectionDetails;
        this.participantData = resp.sectionDetails;
        this.participantData.forEach((element, ind) => {
          var indexVal = this.moduleids.findIndex(record => record == element.sectionId)
          if (indexVal != -1) {
            element['checked'] = true;
          }
          else {
            element['checked'] = false;
          }
          element['ids'] = element.sectionId;
        });
        this.dataSource2 = new MatTableDataSource<any>(this.participantData);
        this.dataSource2.paginator = this.paginator.toArray()[1];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllSectionData() {
    this.participantData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionByUnitIdWithEmployee(this.userData.unitId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.participantData = resp.sectionDetails;
        this.participantData.forEach((element, ind) => {
          var indexVal = this.moduleids.findIndex(record => record == element.sectionId)
          if (indexVal != -1) {
            element['checked'] = true;
          }
          else {
            element['checked'] = false;
          }
          element['ids'] = element.sectionId;
        });
        this.dataSource2 = new MatTableDataSource<any>(this.participantData);
        this.dataSource2.paginator = this.paginator.toArray()[1];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllEmployee() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllEmployeeWithFilterParticipant(this.planForm.value).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.participantData = resp.appraisalPlanDetails;
        this.participantData.forEach((element, ind) => {
          var indexVal = this.moduleids.findIndex(record => record == element.id)
          if (indexVal != -1) {
            element['checked'] = true;
          }
          else {
            element['checked'] = false;
          }
          element['ids'] = element.id;
        });
        this.dataSource4 = new MatTableDataSource<any>(this.participantData);
        this.dataSource4.paginator = this.paginator.toArray()[3];
      }
      else{
        this.dataSource4 = new MatTableDataSource<any>([]);
        this.dataSource4.paginator = this.paginator.toArray()[3];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  stepperChange(event) {
    if (event.selectedIndex == 0) {
      this.getAllDepartmentData();
    }
    else if (event.selectedIndex == 1) {
      this.getAllSectionData();
    }
    else if (event.selectedIndex == 2) {
      this.getAllGroupData();
    }
    else if (event.selectedIndex == 3) {
      this.getAllEmployee();
    }
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

  faildEmployeePopup(data, msg) {
    const dialogAp = this.dialog.open(EmployeeListDialogComponent, {
      width: '75vw',
      disableClose: true,
      data: { data: data, msg: msg }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
