import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-goal-preview-dailog',
  templateUrl: './goal-preview-dailog.component.html',
  styleUrls: ['./goal-preview-dailog.component.scss']
})
export class GoalPreviewDailogComponent implements OnInit {
   type:any;
  // message:String;
  
  constructor(private fb: FormBuilder,private pasonaService:PasonaServiceService,public dialogRef: MatDialogRef<GoalPreviewDailogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.type=data.data;
    
    //this.message=data.message;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  yes() {
    this.dialogRef.close(true);
  }
  // yesCompany()
  // {
  //   if(this.deleteForm.value.password!='')
  //   {
  //     this.dialogRef.close(this.deleteForm.value.password);
  //   }
  //   else
  //   {
  //     this.deleteForm.controls['password'].markAsDirty();
  //   }
  
  // }
}




