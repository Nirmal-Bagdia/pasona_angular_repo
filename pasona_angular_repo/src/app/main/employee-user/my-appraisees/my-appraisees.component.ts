import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FileReviewDialogComponent } from 'app/dialog/file-review-dialog/file-review-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-my-appraisees',
  templateUrl: './my-appraisees.component.html',
  styleUrls: ['./my-appraisees.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class MyAppraiseesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'name', 'department', 'section', 'group', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  employeeData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;


  sub: any;
  id: number;
  ids: number;
  stateName: any;
  consolidationStatus: number;
  finalApproverStatus: number;

  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {
    this.stateName = this.pasonaService.getStateData();
    this.employeeData = [];
    this.userData = this.pasonaService.getUserData();
    this.roleModule = {};
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.ids = +params['ids']; // (+) converts string 'id' to a number
    });
    var roleData = this.pasonaService.getRoleModule(13);
    if (roleData) {
      this.roleModule = roleData;
    }
  }

  ngOnInit() {
    this.getAllAppraisees();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllAppraisees() {
    this.pasonaService.startSpinner();
    var data = {
      empId: this.userData.empCode,
      appraisalPlanId: this.id
    }
    this.pasonaService.getAllAppraiseesAccordingToPlan(data).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.consolidationStatus = resp.consolidationStatus;
        this.finalApproverStatus = resp.finalApproverStatus;
        this.employeeData = this.pasonaService.getdecryptArray(resp.appraisalPlanDetails, ['empName', 'departmentName', 'sectionName', 'groupName']);
        this.dataSource = new MatTableDataSource<any>(this.employeeData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  historyFileReview(empObjId) {
    const dialogAp = this.dialog.open(FileReviewDialogComponent, {
      width: '60vw',
      disableClose: true,
      data: { data: 'History Data', empObjId: empObjId }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  backToEmployee() {
    this.router.navigate(['/employee/appraisalPlans']);
  }

  viewObjective(id) {
    this.router.navigate(['/employee/myAppraisees', this.id, 'viewEmpGoals', id, this.id]);
  }

  consolidateSheetView() {
    this.router.navigate(['/employee/myAppraisees', this.id, 'consolidateSheet', this.id]);
  }

  finalApproverView() {
    this.router.navigate(['/employee/myAppraisees', this.id, 'finalApprover', this.id]);
  }

}


