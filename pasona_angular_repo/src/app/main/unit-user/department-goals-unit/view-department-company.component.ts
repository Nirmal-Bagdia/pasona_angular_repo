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
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {   
    this.departmentData = [];
    this.userData = this.pasonaService.getUserData();
  }

  ngOnInit() {
    this.getAllDepartmentData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllDepartmentData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentByCompanyIdForObjeciveForUnit(this.userData.unitId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
       // this.departmentData = resp.departmentObjective;
        this.departmentData=this.pasonaService.getdecryptArray(resp.departmentObjective,['departmentName','unitName']);
        this.dataSource = new MatTableDataSource<any>(this.departmentData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  editDepartment(id) {
    this.router.navigate(['/unit/editDepartment/', id]);
  }

  viewGoals(id) {
    this.router.navigate(['/unit/viewDep/viewDepGoals', id]);
  }

}


