import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-view-employee-company',
  templateUrl: './view-employee-company.component.html',
  styleUrls: ['./view-employee-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class ViewEmployeeCompanyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'empName', 'department', 'email', 'phone', 'designation', 'action'];
  // displayedColumns: string[] = ['sNo', 'empId','empName','company','unit','department','section','dateOfJoining','phone','designation','action'];
  dataSource = new MatTableDataSource<any>();
  employeeData: any[];
  deleteId: any;
  userData: any;
  urlCurrentEdit: string;
  urlCurrentAdd: string;
  urlCurrentBulk: string;
  roleModule: any;
  resultsLength: 0;
  selection: { pNumber: number; pSize: number; companyId: any; unitId: any; empName: string };
  
  myControl = new FormControl();
  empOptions:any[];
  filteredOptions: Observable<string[]>;
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.employeeData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.selection = { pNumber: 0, pSize: 10, companyId: this.userData.companyId, unitId: this.userData.unitId, empName: '' };
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addEmployee";
      this.urlCurrentEdit = "/company/editEmployee";
      this.urlCurrentBulk = "/company/bulkUploadEmployee";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addEmployee";
      this.urlCurrentBulk = "/unit/bulkUploadEmployee";
      this.urlCurrentEdit = "/unit/editEmployee";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addEmployee";
      this.urlCurrentBulk = "/employee/bulkUploadEmployee";
      this.urlCurrentEdit = "/employee/editEmployee";
    }
    var roleData = this.pasonaService.getRoleModule(7);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }

  }

  ngOnInit() {
    this.getAllEmployeeData();
    this.getAllEmployeeDataFilter();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   // return this.empOptions.filter(option => option.toLowerCase().includes(filterValue));
    return  this.empOptions.filter(emp => this.pasonaService.getDecrypt(emp.empName).toLowerCase().indexOf(filterValue) > -1)
  }

  getAllEmployeeDataFilter() {
    // this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByCompanyIdWithoutPagination(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.empOptions = resp.employeeDetails;
        this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
        console.log("empOPs",this.empOptions)
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  applyFilter(filterValue: string) {
    this.paginator.firstPage();
   // this.selection.empName=this.pasonaService.setEncrypt(this.selection.empName);
    this.getAllEmployeeData();
  }

  getAllEmployeeData() {
    this.employeeData = [];
    this.pasonaService.startSpinner();
    if (this.userData.userType == '2' || this.userData.userType == '4') {
      this.selection.empName=this.pasonaService.setEncrypt(this.myControl.value);
      this.pasonaService.getEmployeeByCompanyId(this.selection).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.employeeData = resp.employeeDetails;
          if(resp.employeeDetails.length!=0)
          this.resultsLength = resp.employeeDetails[0].empCount;
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    if (this.userData.userType == '3') {
      this.employeeData = [];
      this.pasonaService.getEmployeeByUnitId(this.selection).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.employeeData = resp.employeeDetails;
          this.resultsLength = resp.employeeDetails[0].empCount;
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
  }

  deleteEmployeePopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Employee' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee(this.deleteId);
      }
    });
  }

  deleteEmployee(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteEmployeeById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.getAllEmployeeData();
        this.pasonaService.openSnackBar(resp.message);
      }
      else {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  editEmployee(id,flag) {
    sessionStorage.setItem('flagMobile',JSON.stringify(flag));
    this.router.navigate([this.urlCurrentEdit, id]);
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    console.log("ok", $event);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getAllEmployeeData();
  }
}


