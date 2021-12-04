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
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {
    
    this.goalsData = [];
    this.userData = this.pasonaService.getUserData();
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
        //this.goalsData = resp.companyObjective;
        this.goalsData=this.pasonaService.getdecryptArray(resp.companyObjective,['summary']);
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  viewGoals(id) {
    console.log("id", id);
    this.router.navigate(['/unit/viewCompanyGoals/', id]);
  }

}



