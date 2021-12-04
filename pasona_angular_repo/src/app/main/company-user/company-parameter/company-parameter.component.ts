import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyParameterDialogComponent } from 'app/dialog/company-parameter-dialog/company-parameter-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-company-parameter',
  templateUrl: './company-parameter.component.html',
  styleUrls: ['./company-parameter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class CompanyParameterComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'name', 'parameter', 'assign', 'action'];
  dataSource = new MatTableDataSource<any>();
  companyParameterData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {
    
    this.companyParameterData = [];
    this.userData = this.pasonaService.getUserData();
    this.roleModule = {};

    var roleData = this.pasonaService.getRoleModule(20);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }
    if (this.userData.userType == '2') {
      // this.urlCurrentAdd = "/company/addAssignRole";
      // this.urlCurrentEdit = "/company/editAssignRole";
      this.roleModule = { write: true };
    }
  }

  ngOnInit() {
    this.getAllCompanyParameter();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllCompanyParameter() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCompanyParameter(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        //this.companyParameterData = resp.appraisalParameterDetails;
        this.companyParameterData=this.pasonaService.getdecryptArray(resp.appraisalParameterDetails,['name']);
        this.dataSource = new MatTableDataSource<any>(this.companyParameterData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteCompanyParameterPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Company Parameter' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompanyParameter(this.deleteId);
      }
    });
  }

  deleteCompanyParameter(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteCompanyParameter(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.companyParameterData.forEach((element, i) => {
          if (element.companyParameterId === id) {
            this.companyParameterData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.companyParameterData);
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

  addCompanyParameterPopUp(val, id, type, data) {
    const dialogAp = this.dialog.open(CompanyParameterDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { type: val, id: id, pType: type, pData: data }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCompanyParameter();
      }
    });
  }

}



