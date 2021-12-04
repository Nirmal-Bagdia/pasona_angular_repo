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
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ViewCompanyComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'cName', 'cEmail', 'cType', 'status', 'creationDate', 'action'];
  dataSource = new MatTableDataSource<any>();
  companyData: any[];
  deleteId: any;
  selection: { pNumber: number, pSize: number, companyName: string };
  resultsLength: 0;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {

    this.companyData = [];
    this.selection = { pNumber: 0, pSize: 5, companyName: '' };
  }

  ngOnInit() {
    this.getAllCompanyData();
  }

  applyFilter(filterValue: string) {
    this.paginator.firstPage();
 //   this.selection.companyName=this.pasonaService.setEncrypt(this.selection.companyName);
    this.getAllCompanyData();
  }

  getAllCompanyData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllCompany(this.selection).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.companyData = resp.companyDetails.content;
        this.resultsLength = resp.companyDetails.totalElements;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  deleteCompanyPopUp(id) {
    this.deleteId = id;
    const dialogAp = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      disableClose: true,
      data: { data: 'Company' }
    });

    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompany(this.deleteId, result);
      }
    });
  }

  deleteCompany(id, password) {
    this.pasonaService.startSpinner();
    password=this.pasonaService.setEncrypt(password);
    this.pasonaService.deleteCompanyById(id, password).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.pasonaService.openSnackBar(resp.message);
        this.getAllCompanyData();
      }
      else {
        this.pasonaService.openSnackBar(resp.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  editCompany(id) {
    this.router.navigate(['/admin/editCompany/', id]);
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getAllCompanyData();
  }
}
