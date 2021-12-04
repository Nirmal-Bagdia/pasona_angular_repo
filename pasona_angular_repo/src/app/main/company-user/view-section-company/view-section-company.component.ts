
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
  selector: 'app-view-section-company',
  templateUrl: './view-section-company.component.html',
  styleUrls: ['./view-section-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ViewSectionCompanyComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'sectionName','unit','department','action'];
  dataSource = new MatTableDataSource<any>();
  sectionData:any[];
  deleteId: any;
  userData: any;
  urlCurrentAdd: string;
  urlCurrentEdit: string;
  roleModule: any;
  
  constructor(private pasonaService:PasonaServiceService,public dialog: MatDialog,public router: Router) {
    
    this.sectionData=[];
    this.roleModule={};
    this.userData=this.pasonaService.getUserData();
    if (this.userData.userType == '2') {
      this.urlCurrentAdd = "/company/addSection";
      this.urlCurrentEdit = "/company/editSection";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '3') {
      this.urlCurrentAdd = "/unit/addSection";
      this.urlCurrentEdit = "/unit/editSection";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '4') {
      this.urlCurrentAdd = "/employee/addSection";
      this.urlCurrentEdit = "/employee/editSection";
    }
    var roleData=this.pasonaService.getRoleModule(4);
    console.log("roleData",roleData);
    if(roleData)
    {
      this.roleModule=roleData;
      console.log("roleData",roleData);
    }
   }

  ngOnInit() {
  this.getAllSectionData();
  }
 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllSectionData()
  {
    this.pasonaService.startSpinner();
    if(this.userData.userType == '2' || this.userData.userType == '4')
   { this.pasonaService.getSectionByCompanyId(this.userData.companyId).subscribe(resp => {
    this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData=this.pasonaService.getdecryptArray(resp.sectionDetails,['sectionName']);
        this.dataSource = new MatTableDataSource<any>(this.sectionData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
     this.pasonaService.stopSpinner();
    }) }
    else if(this.userData.userType == '3')
    {
      this.pasonaService.getSectionByUnitId(this.userData.unitId).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.sectionData=this.pasonaService.getdecryptArray(resp.sectionDetails,['sectionName']);
          this.dataSource = new MatTableDataSource<any>(this.sectionData);
          this.dataSource.paginator = this.paginator;
        }
      }, error => {
       this.pasonaService.stopSpinner();
      })    
    }   
  }

  deleteSectionPopUp(id) {
    this.deleteId=id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Section' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.deleteSection(this.deleteId);
      }
    });
  }

  deleteSection(id)
  {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteSectionById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData.forEach((element, i) => {
          if (element.sectionId === id) {
            this.sectionData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.sectionData);
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
  
  editSection(id)
  {
    this.router.navigate([this.urlCurrentEdit, id]);
  }
  
}



