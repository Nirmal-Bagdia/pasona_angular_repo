import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-goals',
  templateUrl: './edit-goals.component.html',
  styleUrls: ['./edit-goals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditGoalsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  userData: any;
  yearData: any[];
  monthData: any[];
  sub: any;
  id: number;
  goalsData: any = {};
  objectiveList: any[];
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    
    this._unsubscribeAll = new Subject();
    this.objectiveList = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.yearData = this.pasonaService.getYear();
    this.monthData = this.pasonaService.getMonth();
    this.getGoalsDataById();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getGoalsDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentGoalsById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var goalData=dataRes.departmentObjective;
        goalData.summary=this.pasonaService.getDecrypt(goalData.summary);
        goalData.objectiveList=this.pasonaService.getdecryptArray(goalData.objectiveList,['objective']);
        this.goalsData = goalData;
        this.objectiveList = goalData.objectiveList;
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }
}
