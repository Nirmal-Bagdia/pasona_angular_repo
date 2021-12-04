import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class NotificationComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  userData: any;
  notificationData: any[] = [];
  
  totalElements: number;
  totalPages: number;
  resultsLength: 0;
  selection: { pNumber: number; pSize: number; empId: any; companyId: any; uniId: any; type: any; };
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    
    this.notificationData = [];
    this._unsubscribeAll = new Subject();
    this.userData = this.pasonaService.getUserData();
    
    this.selection = { pNumber: 0, pSize: 5, empId: this.userData.empCode,companyId:this.userData.companyId,uniId:this.userData.unitId, type:this.userData.userType };
  }


  ngOnInit() {
    if(this.userData.userType!=1)
    this.getNotificationByEmpId();
  }

  getNotificationByEmpId() {
    var statusArray = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getNotificationByEmpId(this.selection).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        // this.notificationData = dataRes.notificationDetails.content;
        this.notificationData = dataRes.notificationDetails;
        this.resultsLength = this.notificationData[0].totalElements;
        this.totalPages = this.notificationData[0].totalPages;
        for (let i = 0; i < this.notificationData.length; i++) {
          if (this.notificationData[i].status == 0) {
            statusArray.push(this.notificationData[i].notificationId);
          }
        }
        if (statusArray.length != 0) {
          this.viewNotification(statusArray);
        }
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

  viewNotification(statusArray) {
    this.pasonaService.changeNotificationStatus(statusArray).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
       var count =this.pasonaService.notificationCount.value-statusArray.length;
       count=count< 0 ? 0 : count ; 
        this.pasonaService.updatedNotification(count);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    this.selection.pSize = $event.pageSize;
    this.selection.pNumber = $event.pageIndex;
    this.getNotificationByEmpId();
  }
  /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
