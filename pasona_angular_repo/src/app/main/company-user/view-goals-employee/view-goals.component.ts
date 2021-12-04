import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-view-goals',
  templateUrl: './view-goals.component.html',
  styleUrls: ['./view-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ViewGoalsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo','from','to','summary','date','action'];
  dataSource = new MatTableDataSource<any>();
  goalsData:any[];
  deleteId: any;
  userData: any;
  sub: any;
  id: number;
  urlCurrent: string;
  appraisalPlanId: number;
  stateName: any;
  
  constructor(private pasonaService:PasonaServiceService,public dialog: MatDialog,public router: Router,private route: ActivatedRoute) {
    
    this.goalsData=[];
    this.userData=this.pasonaService.getUserData();
    this.stateName=this.pasonaService.getStateData();
    if(this.userData.userType=='2')
    {
      this.urlCurrent="company";
    }
    else{
      this.urlCurrent="unit";
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.appraisalPlanId=  +params['appId']; 
    });
   }
  
  ngOnInit() {
  this.getAllGoalData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllGoalData()
  {
    this.pasonaService.startSpinner();
    var formData = new FormData();
    formData.append("empId", this.id.toString());
    formData.append("appraisalPlanId", this.appraisalPlanId.toString());
    this.pasonaService.getGoalsByEmpId(formData).subscribe(resp => {
     this.pasonaService.stopSpinner();
      if (resp.status == '1') {
      //  this.goalsData = resp.departmentDetails.empObjectives;
        this.goalsData=this.pasonaService.getdecryptArray(resp.departmentDetails.empObjectives,['summary']);
        this.dataSource = new MatTableDataSource<any>(this.goalsData);
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
     this.pasonaService.stopSpinner();
    })    
  }

  editGoals(id)
  {
    console.log("id",id);
    this.router.navigate([`/${this.urlCurrent}/employees`,this.appraisalPlanId,'empGoals',this.id,'editEmpGoals',id]);
  }

  backToGoals()
  {
    this.router.navigate([`/${this.urlCurrent}/employees`,this.appraisalPlanId]);
  }
}







