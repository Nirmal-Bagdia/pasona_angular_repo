
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-comment-rating-dialog',
  templateUrl: './comment-rating-dialog.component.html',
  styleUrls: ['./comment-rating-dialog.component.scss']
})
export class CommentRatingDialogComponent implements OnInit {

type:any;
  userData: any;
  id: any;
 
  displayedColumns: string[] = ['sno', 'appraiserName', 'type' ,'term','rating','comment'];
  displayedColumns1: string[] = ['sno', 'appraiserName', 'type' ,'term','rating','para','comment'];
  dataSource=[];
  
  constructor(private fb: FormBuilder,private pasonaService:PasonaServiceService,public dialogRef: MatDialogRef<CommentRatingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
   // data: { type: type, id: empid ,empObjId:empObjId,message:`Do you want to accept ${name} objective ?`}
    
   this.type=data.type;
    this.id=data.id;
    this.userData=this.pasonaService.getUserData();
  }

  ngOnInit() {
    console.log("type",this.type)
    if(this.type==1)
    {
      this.viewRatingHistoryObj();
    }
    else if(this.type==2)
    {
     this.viewRatingHistoryCompany();
    }
    else if(this.type==3)
    {
      this.viewRatingHistoryCompetency();
    }
    else if (this.type==4)
    {
      this.viewRatingHistoryPCompetency();
    }

  }

 

  onNoClick(): void {
    this.dialogRef.close();
  }
  yes() {
    this.dialogRef.close(true);
  }
 

 

  viewRatingHistoryObj()
  {
    
    if(this.dataSource.length==0)
    {
      var param={
        "subObjectiveId":this.data.subObjectiveId,
        "appraisalPlanId":this.data.appraisalPlanId,
        "appraiseeId":this.data.empId,
        "appraiserId":this.userData.empCode,
      }
    this.pasonaService.startSpinner();
    this.pasonaService.viewRatingHistory(param).subscribe(resp => {
      this.pasonaService.stopSpinner();
       if (resp.status == '1') {
        this.dataSource=resp.midTermEvaluationDetails;
       }
     }, error => {
      this.pasonaService.stopSpinner();
     }) 
    }
  }

  viewRatingHistoryCompany()
  {
    
    if(this.dataSource.length==0)
    {
      var param={
        "subObjectiveId":this.data.subObjectiveId,
        "appraisalPlanId":this.data.appraisalPlanId,
        "appraiseeId":this.data.empId,
        "appraiserId":this.userData.empCode,
      }
    this.pasonaService.startSpinner();
    this.pasonaService.viewRatingHistoryCompany(param).subscribe(resp => {
      this.pasonaService.stopSpinner();
       if (resp.status == '1') {
        this.dataSource=resp.midTermEvaluationDetails;
       }
     }, error => {
      this.pasonaService.stopSpinner();
     }) 
    }
  }

  viewRatingHistoryCompetency()
  {
    
    if(this.dataSource.length==0)
    {
      var param={
        "subObjectiveId":this.data.subObjectiveId,
        "appraisalPlanId":this.data.appraisalPlanId,
        "appraiseeId":this.data.empId,
        "appraiserId":this.userData.empCode,
      }
    this.pasonaService.startSpinner();
    this.pasonaService.viewRatingHistoryCompetency(param).subscribe(resp => {
      this.pasonaService.stopSpinner();
       if (resp.status == '1') {
        this.dataSource=resp.midTermEvaluationDetails;
       }
     }, error => {
      this.pasonaService.stopSpinner();
     }) 
    }
  }
 
  viewRatingHistoryPCompetency()
  {
    
    if(this.dataSource.length==0)
    {
      var param={
        "subObjectiveId":this.data.subObjectiveId,
        "appraisalPlanId":this.data.appraisalPlanId,
        "appraiseeId":this.data.empId,
        "appraiserId":this.userData.empCode,
      }
    this.pasonaService.startSpinner();
    this.pasonaService.viewRatingHistoryPcompetency(param).subscribe(resp => {
      this.pasonaService.stopSpinner();
       if (resp.status == '1') {
        this.dataSource=resp.midTermEvaluationDetails;
       }
     }, error => {
      this.pasonaService.stopSpinner();
     }) 
    }
  }
 
}




