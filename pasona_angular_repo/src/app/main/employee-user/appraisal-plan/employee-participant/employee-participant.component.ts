import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AddAppraiserDialogComponent } from 'app/dialog/add-appraiser-dialog/add-appraiser-dialog.component';
import { SendAlertComponent } from 'app/dialog/send-alert/send-alert.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-employee-participant',
  templateUrl: './employee-participant.component.html',
  styleUrls: ['./employee-participant.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class EmployeeParticipantComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'name', 'status', 'action', 'alert'];
  displayedColumns1: string[] = ['sNo', 'name', 'status', 'alert'];
  selection: any;
  dataSource = new MatTableDataSource<any>();
  employeeData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  sub: any;
  id: number;
  ids: number;
  activeStep: any;
  resultsLength: 0;
  groupId: number;
  stateName: any;
  ratingConsolidator: any;

  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {
    this.stateName = this.pasonaService.getStateData();
    this.employeeData = [];
    this.userData = this.pasonaService.getUserData();
    this.roleModule = {};
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.ids = +params['ids'];
      this.groupId = +params['groupId']; // (+) converts string 'id' to a number
    });

    var roleData = this.pasonaService.getRoleModule(13);

    if (roleData) {
      this.roleModule = roleData;
    }
    var selectedTab = JSON.parse(localStorage.getItem('activateStep'));
    if (selectedTab) {
      if (selectedTab.type == 'objective') {
        this.activeStep = 0;
      }
      else if (selectedTab.type == 'midterm') {
        this.activeStep = 1;
      }
      else if (selectedTab.type == 'evalution') {
        this.activeStep = 2;
      }
    }
    this.selection = { pNumber: 0, pSize: 5, appraisalPlanDetailId: this.ids, type: '', term: this.activeStep };
  }

  ngOnInit() {
    this.getallEmployeeParticipant();
  }

  applyFilter() {
    this.paginator.firstPage();
    this.getallEmployeeParticipant();
    // filterValue=this.pasonaService.setEncrypt(filterValue);
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getallEmployeeParticipant() {
    this.employeeData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getAllEmployeeParticipant(this.selection.appraisalPlanDetailId, this.selection.type).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.ratingConsolidator = resp.RatingConsolidator;
        this.employeeData = resp.employeeDetails;
        this.resultsLength = resp.employeeDetails[0].empCount;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  backToEmployee() {
    this.router.navigate(['/employee/viewPlan/', this.id]);
  }

  addAppraiserPopup(val, empData, id, ch) {
    const dialogAp = this.dialog.open(AddAppraiserDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { data: val, empData: empData, id: id, choice: ch, groupId: this.groupId, appraisalPlanId: this.employeeData[0].appraisalPlanId, ratingConsolidator: this.ratingConsolidator }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.getallEmployeeParticipant();
      }
    });
  }

  sendMessagePopUp(val, msg, id, ch, data) {
    const dialogAp = this.dialog.open(SendAlertComponent, {
      width: '600px',
      disableClose: true,
      data: { data: val, id: id, pType: msg, choice: ch, empData: data }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        // this.getAllAppraisalPlanData();
      }
    });
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getallEmployeeParticipant();
  }

}


