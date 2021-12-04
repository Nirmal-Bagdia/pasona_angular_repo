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
  selector: 'app-view-goals',
  templateUrl: './view-goals.component.html',
  styleUrls: ['./view-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ViewGoalsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'from', 'to', 'summary', 'date', 'action'];
  dataSource = new MatTableDataSource<any>();
  goalsData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.goalsData = [];
    this.userData = this.pasonaService.getUserData();
    var roleData = this.pasonaService.getRoleModule(11);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }
    else
    {
      this.roleModule={write:true};
    }
  }

  ngOnInit() {
    this.getAllGoalData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllGoalData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGoalsByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.goalsData=this.pasonaService.getdecryptArray(resp.companyObjective,['summary']);
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
        this.dataSource.paginator = this.paginator;
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

  deleteGoal(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteGoalsById(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.goalsData.forEach((element, i) => {
          if (element.comObjId === id) {
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

  editGoals(id) {
    console.log("id", id);
    this.router.navigate(['/company/editGoals/', id]);
  }
  
}



