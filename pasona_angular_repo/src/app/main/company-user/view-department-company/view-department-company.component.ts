

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-view-department-company',
  templateUrl: './view-department-company.component.html',
  styleUrls: ['./view-department-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ViewDepartmentCompanyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'departmentName', 'unit', 'action'];
  dataSource = new MatTableDataSource<any>();
  departmentData: any[];
  deleteId: any;
  userData: any;
  urlCurrentAdd: string;
  urlCurrentEdit: string;
  roleModule: any;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.departmentData = [];
    this.roleModule={};
    this.userData = this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addDepartment";
      this.urlCurrentEdit = "/company/editDepartment";
      this.roleModule={write:true};

    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addDepartment";
      this.urlCurrentEdit = "/unit/editDepartment";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addDepartment";
      this.urlCurrentEdit = "/employee/editDepartment";
    }
    var roleData=this.pasonaService.getRoleModule(3);
    console.log("roleData",roleData);
    if(roleData)
    {
      this.roleModule=roleData;
      console.log("roleData",roleData);
    }
  }

  ngOnInit() {
    this.getAllDepartmentData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllDepartmentData() {
    this.pasonaService.startSpinner();
    if (this.userData.userType == '2' || this.userData.userType == '4') {
      this.pasonaService.getDepartmentByCompanyId(this.userData.companyId).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.departmentData=this.pasonaService.getdecryptArray(resp.departmentDetails,['departmentName']);
          this.dataSource = new MatTableDataSource<any>(this.departmentData);
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else if (this.userData.userType == '3') {
      this.pasonaService.getDepartmentByUnitId(this.userData.unitId).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.departmentData=this.pasonaService.getdecryptArray(resp.departmentDetails,['departmentName']);
          this.dataSource = new MatTableDataSource<any>(this.departmentData);
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }

  deleteDepartmentPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Department' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.deleteDepartment(this.deleteId);
      }
    });
  }

  deleteDepartment(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteDepartmentById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.departmentData.forEach((element, i) => {
          if (element.depId === id) {
            this.departmentData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.departmentData);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  editDepartment(id) {
    this.router.navigate([this.urlCurrentEdit, id]);
  }
}


