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
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AssignRoleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'empName', 'email', 'roleName', 'action'];
  dataSource = new MatTableDataSource<any>();
  rolesData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  urlCurrentEdit: string;
  urlCurrentAdd: string;
  resultsLength: 0;
  selection: { pNumber: number; pSize: number; companyId: number; roleId: any; empCode: string; };
  rolesAllData: any[];
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.rolesData = [];
    this.rolesAllData = [];
    this.roleModule = {};

    this.userData = this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addAssignRole";
      this.urlCurrentEdit = "/company/editAssignRole";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addAssignRole";
      this.urlCurrentEdit = "/employee/editAssignRole";
    }
    var roleData = this.pasonaService.getRoleModule(12);
    if (roleData) {
      this.roleModule = roleData;
    }
    this.selection = { pNumber: 0, pSize: 5, companyId: this.userData.companyId, roleId: '', empCode: '' };
  }

  ngOnInit() {
    this.getAllAssignRole();
    this.getAllRoleData();
  }

  applyFilter(filterValue: string) {
    this.paginator.firstPage();
    this.getAllAssignRole();
  }

  getAllAssignRole() {
    this.rolesData=[];
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAssignRole(this.selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.rolesData = resp.employeeDetails.employeeDetails;
        this.resultsLength = resp.employeeDetails.empCount;
      }
      else
      {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteRolePopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Assign Role' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRole(this.deleteId);
      }
    });
  }

  deleteRole(id) {
    this.pasonaService.stopSpinner();
    this.pasonaService.deleteAssignRole(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.getAllAssignRole();
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

  editRoles(id) {
    this.router.navigate([this.urlCurrentEdit, id]);
  }

  getAllRoleData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllRole(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.rolesAllData = resp.rolesDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    console.log("ok", $event);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getAllAssignRole();
  }
}


