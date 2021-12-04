import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppraisalParameterDailogComponent } from 'app/dialog/appraisal-parameter-dailog/appraisal-parameter-dailog.component';
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-appraisal-parameter',
  templateUrl: './appraisal-parameter.component.html',
  styleUrls: ['./appraisal-parameter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AppraisalParameterComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'name', 'parameter', 'assign', 'action'];
  dataSource = new MatTableDataSource<any>();
  appraisalParameterData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {
    
    this.appraisalParameterData = [];
    this.userData = this.pasonaService.getUserData();
    this.roleModule = {};

    var roleData = this.pasonaService.getRoleModule(15);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }
    if (this.userData.userType == '2') {
      this.roleModule = { write: true };
    }
  }

  ngOnInit() {
    this.getallAppraisalParameter();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getallAppraisalParameter() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalParameter(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        //this.appraisalParameterData = resp.appraisalParameterDetails;
        this.appraisalParameterData=this.pasonaService.getdecryptArray(resp.appraisalParameterDetails,['name']);
        this.dataSource = new MatTableDataSource<any>(this.appraisalParameterData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteAppraisalParameterPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Competency Parameter' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAppraisalParameter(this.deleteId);
      }
    });
  }

  deleteAppraisalParameter(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteAppraisalParameter(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraisalParameterData.forEach((element, i) => {
          if (element.appraisalParameterId === id) {
            this.appraisalParameterData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.appraisalParameterData);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.pasonaService.infoMessage(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  addAppraisalParameterPopUp(val, id, type, data) {
    const dialogAp = this.dialog.open(AppraisalParameterDailogComponent, {
      width: '600px',
      disableClose: true,
      data: { type: val, id: id, pType: type, pData: data }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.getallAppraisalParameter();
      }
    });
  }

}


