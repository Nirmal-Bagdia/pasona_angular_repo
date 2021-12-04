import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { AddAppraisalPlanDailogComponent } from 'app/dialog/add-appraisal-plan-dailog/add-appraisal-plan-dailog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-appraisal-plan',
  templateUrl: './appraisal-plan.component.html',
  styleUrls: ['./appraisal-plan.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AppraisalPlanComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'appraisalPlan', 'objective', 'creation', 'end', 'action'];
  dataSource = new MatTableDataSource<any>();
  appraisalPlanData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  resultsLength: 0;
  selection: any;

  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {

    this.appraisalPlanData = [];
    this.userData = this.pasonaService.getUserData();
    this.roleModule = {};
    var roleData = this.pasonaService.getRoleModule(13);
    if (roleData) {
      this.roleModule = roleData;
    }
    this.selection = { pNumber: 0, pSize: 5, planName: '', empId: this.userData.empCode };
  }

  ngOnInit() {
    this.getAllAppraisalPlanData();
    localStorage.removeItem('activateStep');
  }

  applyFilter(filterValue: string) {
    this.paginator.firstPage();
    // this.selection.planName=this.pasonaService.setEncrypt(this.selection.planName);
    this.getAllAppraisalPlanData();
  }

  getAllAppraisalPlanData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlan(this.selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraisalPlanData = resp.appraisalPlanDetails.content;
        this.resultsLength = resp.appraisalPlanDetails.totalElements;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteAppraisalPlanPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Appraisal Plan' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAppraisalPlan(this.deleteId);
      }
    });
  }

  playPausePopup(id, type) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { data: 'Appraisal Plan', message: 'Are You Sure You Want To ' + type + ' Appraisal Plan ' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.playPause(id, type);
      }
    });
  }

  playPause(id, type) {
    this.pasonaService.startSpinner();
    this.pasonaService.playPauseAppraisalPlan(id, type).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraisalPlanData.forEach((element, i) => {
          if (element.appraisalPlanId === id) {
            this.appraisalPlanData[i].status = resp.appraisalPlanDetails.status;
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.appraisalPlanData);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  deleteAppraisalPlan(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteAppraisalPlan(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.getAllAppraisalPlanData();
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

  addAppraisalPlanPopUp(val, id) {
    const dialogAp = this.dialog.open(AddAppraisalPlanDailogComponent, {
      width: '600px',
      disableClose: true,
      data: { data: val, id: id }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.getAllAppraisalPlanData();
      }
    });
  }


  viewPlan(id, state) {
    this.pasonaService.setStateData(this.pasonaService.getDecrypt(state));
    this.router.navigate(['/employee/viewPlan/', id]);
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getAllAppraisalPlanData();
  }

}


