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
  resultsLength: 0;
  selection: any;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.appraisalPlanData = [];
    this.userData = this.pasonaService.getUserData();
    this.selection = { pNumber: 0, pSize: 5, companyId: this.userData.companyId, planName: '' };
  }

  ngOnInit() {
    this.getAllAppraisalPlanData();
  }

  applyFilter(filterValue: string) {
    //this.getAllAppraisalPlanData();
   // filterValue=this.pasonaService.setEncrypt(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllAppraisalPlanData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlanByCompanyId(this.selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
      //  this.appraisalPlanData = resp.appraisalPlanDetails;
        this.appraisalPlanData=this.pasonaService.getdecryptArray(resp.appraisalPlanDetails.content,['planName','objective']);
        this.resultsLength=resp.appraisalPlanDetails.totalElements;
      /*   this.dataSource = new MatTableDataSource<any>(this.appraisalPlanData);
        this.dataSource.paginator = this.paginator; */
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  viewEmployees(id,state) {
    this.pasonaService.setStateData(this.pasonaService.getDecrypt(state));
    this.router.navigate(['company/employees', id]);
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    console.log("ok", $event);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getAllAppraisalPlanData();
  }

}



