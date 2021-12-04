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
  selector: 'app-view-employee-company',
  templateUrl: './view-employee-company.component.html',
  styleUrls: ['./view-employee-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class ViewEmployeeCompanyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'empName', 'department', 'email', 'phone', 'designation', 'action'];
  // displayedColumns: string[] = ['sNo', 'empId','empName','company','unit','department','section','dateOfJoining','phone','designation','action'];
  dataSource = new MatTableDataSource<any>();
  employeeData: any[];
  deleteId: any;
  userData: any;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.employeeData = [];
    this.userData = this.pasonaService.getUserData();

  }

  ngOnInit() {
    this.getAllEmployeeData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllEmployeeData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByCompanyIdForObjeciveForUnit(this.userData.unitId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
       // this.employeeData = resp.employeeDetails;
        this.employeeData=this.pasonaService.getdecryptArray(resp.employeeDetails,['empName','departmentName','designation','email']);
        this.dataSource = new MatTableDataSource<any>(this.employeeData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  editEmployee(id) {
    this.router.navigate(['/unit/editEmployee/', id]);
  }

  viewEmployeeGoals(id) {
    this.router.navigate(['/unit/employees/empGoals', id]);
  }

}


