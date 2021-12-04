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
  selector: 'app-role-mgnt',
  templateUrl: './role-mgnt.component.html',
  styleUrls: ['./role-mgnt.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RoleMgntComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'roleName', 'dateofcreation', 'action'];
  dataSource = new MatTableDataSource<any>();
  rolesData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  urlCurrentAdd: string;
  urlCurrentEdit: string;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.rolesData = [];
    this.userData = this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addRole";
      this.urlCurrentEdit = "/company/editRole";
      this.roleModule = { write: true };

    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addRole";
      this.urlCurrentEdit = "/unit/editRole";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addRole";
      this.urlCurrentEdit = "/employee/editRole";
    }
    var roleData = this.pasonaService.getRoleModule(11);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }
  }

  ngOnInit() {
    this.getAllRoleData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllRoleData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllRole(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.rolesData=this.pasonaService.getdecryptArray(resp.rolesDetails,['roleName']);
        this.dataSource = new MatTableDataSource<any>(this.rolesData);
        this.dataSource.paginator = this.paginator;
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
      data: { data: 'Role' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.deleteRole(this.deleteId);
      }
    });
  }

  deleteRole(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteRole(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.rolesData.forEach((element, i) => {
          if (element.roleId === id) {
            this.rolesData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.rolesData);
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

  editRoles(id) {
    this.router.navigate([this.urlCurrentEdit, id]);
  }
}


