import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Component({
  selector: 'app-employee-list-dialog',
  templateUrl: './employee-list-dialog.component.html',
  styleUrls: ['./employee-list-dialog.component.scss']
})

export class EmployeeListDialogComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'empName', 'department', 'section', 'group', 'email'];
  // displayedColumns: string[] = ['sNo', 'empId','empName','company','unit','department','section','dateOfJoining','phone','designation','action'];
  dataSource = new MatTableDataSource<any>();
  msg: string;
  
  constructor(private fb: FormBuilder,private pasonaService:PasonaServiceService, public dialogRef: MatDialogRef<EmployeeListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.dataSource = new MatTableDataSource<any>(data.data);
    this.dataSource.paginator = this.paginator;
    this.msg = data.msg;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }

}


