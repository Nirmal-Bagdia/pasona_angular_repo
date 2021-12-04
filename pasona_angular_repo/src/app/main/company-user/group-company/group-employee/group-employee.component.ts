import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppraisalGroupDialogComponent } from 'app/dialog/appraisal-group-dialog/appraisal-group-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-group-employee',
  templateUrl: './group-employee.component.html',
  styleUrls: ['./group-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class GroupEmployeeComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'empName','department','email',/* 'phone', */'designation','action'];
 // displayedColumns: string[] = ['sNo', 'empId','empName','company','unit','department','section','dateOfJoining','phone','designation','action'];
  dataSource = new MatTableDataSource<any>();
  employeeData:any[];
  deleteId: any;
  userData: any;
  urlCurrentEdit: string;
  urlCurrentAdd: string;
  urlCurrentBulk:string;
  roleModule: any;
  resultsLength:0;
  selection: { pNumber: number; pSize: number; companyId: any; unitId: any;empName:string };
  urlCurrent: string;
  sub: any;
  id: number;
  groupData: any[]=[];
  groupEmpIds: any[]=[];
  stateName: any;
  
  constructor(private pasonaService:PasonaServiceService,private route: ActivatedRoute,public dialog: MatDialog,public router: Router) {
    this.stateName = this.pasonaService.getStateData();
    this.employeeData=[];
    this.roleModule={};
    this.userData=this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.selection={pNumber:0,pSize:10,companyId:this.userData.companyId,unitId:this.userData.unitId,empName:''};
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/group";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '3') {
      this.urlCurrent = "/unit/group";
      this.roleModule={write:true};
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/group";
    }
    var roleData=this.pasonaService.getRoleModule(5);
    console.log("roleData",roleData);
    if(roleData)
    {
      this.roleModule=roleData;
      console.log("roleData",roleData);
    }
 
   }

  ngOnInit() {
  this.getGroupEmployeeDataById();
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getGroupEmployeeDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGroupEmployeeDataById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.groupData=this.pasonaService.getdecryptArray(dataRes.groupDetails,['empName','departmentName','email','designation']);
        this.groupEmpIds = dataRes.EmplyeeIds;
        this.dataSource = new MatTableDataSource<any>(this.groupData);
        this.dataSource.paginator = this.paginator; 
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  deleteEmployeePopUp(id) {
    this.deleteId=id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Employee' }
    });

    dialogAp.afterClosed().subscribe(result => {
      console.log('The dialog for Pasona delete was closed', result);
      if (result) {
        this.deleteEmployee(this.deleteId);
      }
    });
  }


  deleteEmployee(id) {
   var data={
    removeId:[id],
    empId:[],
    groupId:this.id
   }
      this.pasonaService.startSpinner();
      this.pasonaService.editEmployeeToGroup(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar('Group Employee Deleted');
          this.getGroupEmployeeDataById();
        }
        else
        {
          this.pasonaService.openSnackBar(resp.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
  




//   getPaginatorData($event) {
//     window.scroll(0, 0);
//     console.log("ok", $event);
//     this.selection.pSize=$event.pageSize;
//     this.selection.pNumber=$event.pageIndex;
//     this.getAllEmployeeData();
// }

AppraiserGroupPopup(val,groupId) {
  const dialogAp = this.dialog.open(AppraisalGroupDialogComponent, {
    width: '600px',
    disableClose: true,
    data: { data: val, id: groupId,groupEmpIds:this.groupEmpIds}
  });

  dialogAp.afterClosed().subscribe(result => {
    if (result) {
      this.getGroupEmployeeDataById();
    }
  });
}
}



