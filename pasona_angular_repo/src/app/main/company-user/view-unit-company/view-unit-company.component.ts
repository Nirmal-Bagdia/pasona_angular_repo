
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-view-unit-company',
  templateUrl: './view-unit-company.component.html',
  styleUrls: ['./view-unit-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ViewUnitCompanyComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'uName','username','phoneNo','admin','action'];
  //displayedColumns: string[] = ['sNo', 'uId', 'uName','address','country','state','city','username','phoneNo','admin','action'];
  dataSource = new MatTableDataSource<any>();
  unitData:any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  urlCurrentAdd: string;
  urlCurrentEdit: string;
  
  constructor(private pasonaService:PasonaServiceService,public dialog: MatDialog,public router: Router) {
    
    this.unitData=[];
    this.roleModule={};
    this.userData=this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addUnit";
      this.urlCurrentEdit = "/company/editUnit";
      this.roleModule={write:true};

    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addUnit";
      this.urlCurrentEdit = "/unit/editUnit";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addUnit";
      this.urlCurrentEdit = "/employee/editUnit";
    }

    var roleData=this.pasonaService.getRoleModule(2);
    console.log("roleData",roleData);
    if(roleData)
    {
      this.roleModule=roleData;
      console.log("roleData",roleData);
    }
   }

  ngOnInit() {
  this.getAllUnitData();
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUnitData()
  {
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData=this.pasonaService.getdecryptArray(resp.unitDetails,['unitName','userName','admin']);
        this.dataSource = new MatTableDataSource<any>(this.unitData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })    
  }

  deleteUnitPopUp(id) {
    this.deleteId=id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Unit' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUnit(this.deleteId);
      }
    });
  }

  deleteUnit(id)
  {
   this.pasonaService.startSpinner();
    this.pasonaService.deleteUnitById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData.forEach((element, i) => {
          if (element.unitId === id) {
            this.unitData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.unitData);
        this.dataSource.paginator = this.paginator;
      }
      else
      {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
     this.pasonaService.stopSpinner();
   this.pasonaService.openSnackBarError('Please connect to server!');
    })    
  }
  
  editUnit(id,flag)
  {
    sessionStorage.setItem('flagMobile',JSON.stringify(flag));
    this.router.navigate([this.urlCurrentEdit,id]);
  }

}

