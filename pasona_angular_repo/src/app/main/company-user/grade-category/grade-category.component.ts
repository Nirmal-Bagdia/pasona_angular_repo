import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';
import { GradeCategoryDialogComponent } from 'app/dialog/grade-category-dialog/grade-category-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-grade-category',
  templateUrl: './grade-category.component.html',
  styleUrls: ['./grade-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class GradeCategoryComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'name', 'action'];
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  gradeData: any[];
  deleteId: any;
  userData: any;
  roleModule: any;
  grade: number = 0;
  gradeCode: any[];
  searchData: any;
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute) {

    this.gradeData = [];
    this.gradeCode = [];
    this.userData = this.pasonaService.getUserData();
    this.roleModule = {};

    var roleData = this.pasonaService.getRoleModule(22);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (!this.roleModule.write)
        this.displayedColumns = ['sNo', 'name'];
      // console.log("roleData", roleData);
    }
    if (this.userData.userType == '2') {
      // this.urlCurrentAdd = "/company/addAssignRole";
      // this.urlCurrentEdit = "/company/editAssignRole";
      this.roleModule = { write: true };
    }
  }

  ngOnInit() {
    this.getAllGradeCategory();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  getAllGradeCategory() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGradeCategory(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeData = this.pasonaService.getdecryptArray(resp.gradeDetails, ['categoryName']);
        console.log("GradeData",this.gradeData);
        
        this.dataSource = new MatTableDataSource<any>(this.gradeData);
        this.dataSource.paginator = this.paginator.toArray()[0];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllGradeCode() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGradeCode(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeCode = this.pasonaService.getdecryptArray(resp.gradeDetails, ['gradeCodeName']);
        this.dataSource1 = new MatTableDataSource<any>(this.gradeCode);
        this.dataSource1.paginator = this.paginator.toArray()[1];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteGradePopUP(id, ch) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: ch }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        if (this.grade == 0)
          this.deleteGradeCategory(this.deleteId);
        else
          this.deleteGradeCode(this.deleteId);
      }
    });
  }

  deleteGradeCategory(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteGradeCategory(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeData.forEach((element, i) => {
          if (element.gradeId === id) {
            this.gradeData.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource = new MatTableDataSource<any>(this.gradeData);
        this.dataSource.paginator = this.paginator.toArray()[0];
      }
      else {
        this.pasonaService.infoMessage(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  deleteGradeCode(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.deleteGradeCode(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeCode.forEach((element, i) => {
          if (element.gradeCodeId === id) {
            this.gradeCode.splice(i, 1);
          }
        });
        this.pasonaService.openSnackBar(resp.message);
        this.dataSource1 = new MatTableDataSource<any>(this.gradeCode);
        this.dataSource1.paginator = this.paginator.toArray()[1];
      }
      else {
        this.pasonaService.infoMessage(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  addGradePopUP(val, id, type, data) {
    const dialogAp = this.dialog.open(GradeCategoryDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { type: val, id: id, pType: type, pData: data }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        if (this.grade == 0)
          this.getAllGradeCategory();
        else
          this.getAllGradeCode();
      }
    });
  }

  tabChange(ev: MatTabChangeEvent) {
    if (ev.index == 0) {
      this.searchData = '';
      this.grade = 0;
      this.getAllGradeCategory();
    }

    else {
      this.searchData = '';
      this.grade = 1;
      this.getAllGradeCode();
    }

  }

}




