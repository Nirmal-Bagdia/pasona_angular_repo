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
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class JobTitlesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo','jobTitleFrom', 'jobTitleTo','presentGrade', 'capPoint', 'jobTime', 'action'];
  dataSource = new MatTableDataSource<any>();
  jobTitleData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  urlCurrentEdit: string;
  urlCurrentAdd: string;
  resultsLength: 0;
  selection: { pNumber: number; pSize: number; companyId: number; jobTitleName: string; };
  rolesAllData: any[];
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.jobTitleData = [];
    this.rolesAllData = [];
    this.roleModule = {};

    this.userData = this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addJobtitle";
      this.urlCurrentEdit = "/company/editJobtitle";
      this.roleModule = { write: true };
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addJobtitle";
      this.urlCurrentEdit = "/employee/editJobtitle";
    }
    var roleData = this.pasonaService.getRoleModule(16);
    console.log("roleData",roleData);
    if (roleData) {
      this.roleModule = roleData;
    }
    this.selection = { pNumber: 0, pSize: 5, companyId: this.userData.companyId, jobTitleName: '' };
  }

  ngOnInit() {
    this.getAllJobTitles();
  }

  applyFilter(filterValue: string) {
    // if(this.selection.jobTitleName)
    // {
    //   this.selection.jobTitleName=this.pasonaService.setEncrypt(this.selection.jobTitleName);
    // }
    this.paginator.firstPage();
    this.getAllJobTitles();
  }

  getAllJobTitles() {
    this.jobTitleData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getAllJobTitles(this.selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        var encArray=["designationFrom","designationTo"];
        this.jobTitleData =this.pasonaService.getdecryptArray(resp.jobTitleDetails.content,encArray);
        this.resultsLength = resp.jobTitleDetails.numberOfElements;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteJobTitlesPopup(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Job Title' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteJobTitle(this.deleteId);
      }
    });
  }

  deleteJobTitle(id) {
    this.pasonaService.stopSpinner();
    this.pasonaService.deleteJobTitles(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.getAllJobTitles();
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

  editJobtitle(id) {
    this.router.navigate([this.urlCurrentEdit, id]);
  }

 
  getPaginatorData($event) {
    window.scroll(0, 0);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getAllJobTitles();
  }
}



