import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentDailogComponent } from 'app/dialog/comment-dailog/comment-dailog.component';
import { FileReviewDialogComponent } from 'app/dialog/file-review-dialog/file-review-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-view-goals',
  templateUrl: './view-goals.component.html',
  styleUrls: ['./view-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ViewGoalsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //displayedColumns: string[] = ['sNo', 'from', 'to','comment', 'summary', 'date', 'action'];
  displayedColumns: string[] = ['sNo', 'from', 'to', 'summary', 'date', 'action'];
  dataSource = new MatTableDataSource<any>();
  goalsData: any[];
  deleteId: any;
  userData: any;
  empSetObjectiveStatus: number;
  commentCount: any;
  sub: any;
  appraisalPlanId: number;
  stateName: any;
  setObjective: boolean = false;
  midTermSelfReview: any;
  endTermSelfReview: any;
  addEndTermReviewStatus: any;
  addMidTermReviewStatus: any;

  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {
    this.stateName = this.pasonaService.getStateData();
    this.goalsData = [];
    this.empSetObjectiveStatus = 1;
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.appraisalPlanId = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.getAllGoalData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllGoalData() {
    this.pasonaService.startSpinner();
    var formData = new FormData();
    formData.append("empId", this.userData.empCode);
    formData.append("appraisalPlanId", this.appraisalPlanId.toString());
    this.pasonaService.getGoalsByEmpId(formData).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        //this.goalsData = resp.departmentDetails.empObjectives;
        this.setObjective = resp.objective;
        this.midTermSelfReview = resp.departmentDetails.midTermSelfReview;
        this.endTermSelfReview = resp.departmentDetails.endTermSelfReview;
        this.addEndTermReviewStatus = resp.departmentDetails.addEndTermReviewStatus;
        this.addMidTermReviewStatus = resp.departmentDetails.addMidTermReviewStatus;
        this.goalsData = this.pasonaService.getdecryptArray(resp.departmentDetails.empObjectives, ['summary']);
        this.empSetObjectiveStatus = resp.departmentDetails.addObjectiveStatus;
        //this.getCommentCountByEmpId(this.goalsData[this.goalsData.length-1].empObjId);
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
        this.dataSource.paginator = this.paginator;
      }
      else {
        this.setObjective = resp.objective;
        this.empSetObjectiveStatus = 0;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteGoalsPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Goal' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.deleteGoal(this.deleteId);
      }
    });
  }

  historyFileReview(empObjId) {
    const dialogAp = this.dialog.open(FileReviewDialogComponent, {
      width: '60vw',
      disableClose: true,
      data: { data: 'History Data', empObjId: empObjId }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {

      }
    });
  }



  commentPopUp(id) {
    const dialogAp = this.dialog.open(CommentDailogComponent, {
      width: '40vw',
      disableClose: true,
      data: { data: 'Goal', message: '', empObjId: id }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.goalsData[this.goalsData.length - 1]['commentCount'] = '';
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
        this.dataSource.paginator = this.paginator;
        //  this.deleteGoal(this.deleteId);
      }
    });
  }

  deleteGoal(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteGoalsByIdEmp(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.goalsData.forEach((element, i) => {
          if (element.empObjId == id) {
            this.goalsData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
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

  getCommentCountByEmpId(id) {
    this.pasonaService.getCommentCountByEmpId(id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        // this.commentCount=dataRes.commentDetails;
        this.goalsData[this.goalsData.length - 1]['commentCount'] = dataRes.commentDetails;
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
        this.dataSource.paginator = this.paginator;
        //this.pasonaService.openSnackBar(dataRes.message);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }
  editGoals(id) {
    console.log("id", id);
    this.router.navigate(['/employee/editGoals/', id, this.appraisalPlanId]);
  }

  viewObjective(id) {
    this.router.navigate(['/employee/goals/viewEmpGoals', id, this.appraisalPlanId]);
  }

  backToplan() {
    this.router.navigate(['/employee/empAppraisalPlans']);
  }
}





