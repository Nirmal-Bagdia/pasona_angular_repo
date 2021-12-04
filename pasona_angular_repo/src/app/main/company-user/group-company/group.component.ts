
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { AppraisalGroupSettingDialogComponent } from 'app/dialog/appraisal-group-setting-dialog/appraisal-group-setting-dialog.component';
import { RelativeGroupDialogComponent } from 'app/dialog/relative-group-dialog/relative-group-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class GroupComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'groupName', 'action'];
  dataSource = new MatTableDataSource<any>();
  groupData: any[];
  deleteId: any;
  userData: any;
  urlCurrentAdd: string;
  urlCurrentEdit: string;
  roleModule: any;
  urlCurrentDetails: string;
  urlCurrentSetting: string;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.groupData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();

    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addGroup";
      this.urlCurrentEdit = "/company/editGroup";
      this.urlCurrentDetails = "/company/groupDetails";
      this.urlCurrentSetting = "/company/groupSetting";
      this.roleModule = { write: true };

    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addGroup";
      this.urlCurrentEdit = "/unit/editGroup";
      this.urlCurrentDetails = "/unit/groupDetails";
      this.urlCurrentSetting = "/unit/groupSetting";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addGroup";
      this.urlCurrentEdit = "/employee/editGroup";
      this.urlCurrentDetails = "/employee/groupDetails";
      this.urlCurrentSetting = "/employee/groupSetting";
    }
    var roleData = this.pasonaService.getRoleModule(5);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }

  }

  ngOnInit() {
    this.getAllGroupData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllGroupData() {
    this.pasonaService.startSpinner();
    if (this.userData.userType == '2' || this.userData.userType == '4') {
      this.pasonaService.getGroupByCompanyId(this.userData.companyId).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.groupData=this.pasonaService.getdecryptArray(resp.groupDetails,['groupName','unitName']);
          this.dataSource = new MatTableDataSource<any>(this.groupData);
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    else if (this.userData.userType == '3') {
      this.pasonaService.getGroupByUnitId(this.userData.unitId).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.groupData = resp.groupDetails;
          this.dataSource = new MatTableDataSource<any>(this.groupData);
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
  }

  deleteGroupPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Group' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGroup(this.deleteId);
      }
    });
  }

  relativeGroupSettingPopUp()
  {
    const dialogAp = this.dialog.open(RelativeGroupDialogComponent, {
      width: '80wh',
      disableClose: true,
      data: { data: 'Group' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  groupSettingPopUp(id,groupName) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(AppraisalGroupSettingDialogComponent, {
      width: '80wh',
      disableClose: true,
      data: {groupName:groupName,groupId:id}
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
       
      }
    });
  }

  deleteGroup(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteGroupById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.groupData.forEach((element, i) => {
          if (element.groupId === id) {
            this.groupData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.groupData);
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

  editGroup(id) {
    this.router.navigate([this.urlCurrentEdit, id]);
  }

  groupSetting(id,state) {
    this.pasonaService.setStateData(state);
    this.router.navigate([this.urlCurrentSetting, id]);
  }



  groupDetails(id,state) {
    this.pasonaService.setStateData(state);
    this.router.navigate([this.urlCurrentDetails, id]);
  }

}


