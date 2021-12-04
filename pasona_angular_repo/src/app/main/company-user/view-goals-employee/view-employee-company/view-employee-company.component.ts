import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

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
  appraisalPlanId: number;
  sub: any;
  stateName: any;
  selection:any;
  resultsLength:0;

  constructor(private pasonaService: PasonaServiceService, private route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
    this.employeeData = [];
    this.stateName=this.pasonaService.getStateData();
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
    this.appraisalPlanId=  +params['appId']; // (+) converts string 'id' to a number//appraisal plan id 
    });
    this.selection = { pNumber: 0, pSize: 5, companyId: this.userData.companyId,appraisalPlanId:this.appraisalPlanId, empName: '' };
  }

  ngOnInit() {
    this.getAllEmployeeData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllEmployeeData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByCompanyIdForObjecive(this.selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
      //  this.employeeData = resp.employeeDetails;
        this.employeeData=this.pasonaService.getdecryptArray(resp.employeeDetails,['empName','departmentName','email','designation']);
        this.resultsLength=resp.employeeDetails[0].totalPages;
        /*  this.dataSource = new MatTableDataSource<any>(this.employeeData);
        this.dataSource.paginator = this.paginator; */
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  viewEmployeeGoals(id) {
    this.router.navigate(['/company/employees', this.appraisalPlanId, 'empGoals', id]);
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    console.log("ok", $event);
    this.selection.pSize=$event.pageSize;
    this.selection.pNumber=$event.pageIndex;
    this.getAllEmployeeData();
}
}


