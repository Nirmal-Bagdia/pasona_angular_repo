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
  selector: 'app-view-emptype',
  templateUrl: './view-emptype.component.html',
  styleUrls: ['./view-emptype.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ViewEmptypeComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo','groupName','action'];
  dataSource = new MatTableDataSource<any>();
  empTypeData:any[];
  deleteId: any;
  userData: any;
  urlCurrentAdd: string;
  urlCurrentEdit: string;
  roleModule: any;
  
  constructor(private pasonaService:PasonaServiceService,public dialog: MatDialog,public router: Router) {
    
    this.empTypeData=[];
    this.roleModule={};
    this.userData=this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addempType";
      this.urlCurrentEdit = "/company/editempType";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addempType";
      this.urlCurrentEdit = "/unit/editempType";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addempType";
      this.urlCurrentEdit = "/employee/editempType";
    }
    var roleData=this.pasonaService.getRoleModule(6);
    console.log("roleData",roleData);
    if(roleData)
    {
      this.roleModule=roleData;
      console.log("roleData",roleData);
    }
   }

  ngOnInit() {
  this.getAllEmpTypeData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllEmpTypeData()
  {
   this.pasonaService.startSpinner();
   if(this.userData.userType == '2' || this.userData.userType == '4')
   {
    this.pasonaService.getEmpTypeByCompanyId(this.userData.companyId).subscribe(resp => {
    this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.empTypeData=this.pasonaService.getdecryptArray(resp.EmploymentType,['employmentType']);
        this.dataSource = new MatTableDataSource<any>(this.empTypeData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
     this.pasonaService.stopSpinner();
    })    
  }
  else if(this.userData.userType == '3')
  {
    this.pasonaService.getEmpTypeByUnitId(this.userData.unitId).subscribe(resp => {
      this.pasonaService.stopSpinner();
         if (resp.status == '1') {
           this.empTypeData = resp.EmploymentType;
           this.dataSource = new MatTableDataSource<any>(this.empTypeData);
           this.dataSource.paginator = this.paginator;
         }
       }, error => {
        this.pasonaService.stopSpinner();
       })    
  }
  }

  deleteEmpTypePopUP(id) {
    this.deleteId=id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Employement Type' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.deleteEmpType(this.deleteId);
      }
    });
  }

  deleteEmpType(id)  
  {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteEmpTypeById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.empTypeData.forEach((element, i) => {
          if (element.id === id) {
            this.empTypeData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.empTypeData);
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
  
  editEmptype(id)
  {
    this.router.navigate([this.urlCurrentEdit, id]);
  }
  
}



