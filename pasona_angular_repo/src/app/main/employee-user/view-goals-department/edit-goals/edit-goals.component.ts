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

  goalsForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  userData: any;
  yearData: any[];
  monthData: any[];
  sub: any;
  id: number;
  removeIds: any[];
  activeIndex: number;
  
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {
    
    this._unsubscribeAll = new Subject();
    this.companyData = [];
    this.unitData = [];
    this.removeIds = [];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    console.log("id", this.id);
    this.goalsForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      depId: [this.userData.userData.depId, [Validators.required]],
      unitId: [this.userData.unitId],
      summary: ['', [Validators.required, Validators.maxLength(500)]],
      fromMonth: ['', [Validators.required]],
      fromYear: ['', [Validators.required]],
      toMonth: ['', [Validators.required]],
      toYear: ['', [Validators.required]],
      depObjId: [''],
      removeId: [''],
      objectiveList: this.fb.array([this.fb.group({ objective: ['', [Validators.required, Validators.maxLength(500)]],weightage:['',Validators.required], id: ['', Validators.required] })]),
    });

  }

  get objectiveLists() {
    return this.goalsForm.get('objectiveList') as FormArray;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  addObjective() {
    this.objectiveLists.push(this.fb.group({ objective: ['', [Validators.required, Validators.maxLength(500)]],weightage:['',Validators.required], id: ['',] }));
  }

  deleteObjective(index, id) {
    if (id) {
      this.removeIds.push(id);
    }
    this.objectiveLists.removeAt(index);
    this.activeIndex = NaN;
  }

  deleteObj(index, value, id) {
    if (value) {
      this.activeIndex = index;
      setTimeout(() => {
        this.activeIndex = NaN;
      }, 6000);
    }
    else {
      this.deleteObjective(index, id);
    }
  }

  ngOnInit() {
    this.yearData = this.pasonaService.getYear();
    this.monthData = this.pasonaService.getMonth();
    this.getGoalsDataById();
  }
  get f() { return this.goalsForm.controls; };

  updateGoals() {
    console.log("form", this.goalsForm.value, this.goalsForm.valid);
    if (this.goalsForm.valid) {
      this.goalsForm.patchValue({ removeId: this.removeIds });
      var goalForm={
        companyId:this.goalsForm.value.companyId,
        depId: this.goalsForm.value.depId,
        unitId: this.goalsForm.value.unitId,
        summary:this.pasonaService.setEncrypt(this.goalsForm.value.summary) ,
        fromMonth:this.goalsForm.value.fromMonth ,
        fromYear: this.goalsForm.value.fromYear,
        toMonth: this.goalsForm.value.toMonth,
        toYear:this.goalsForm.value.toYear ,
        depObjId:this.goalsForm.value.depObjId ,
        removeId: this.goalsForm.value.removeId,
        objectiveList: this.pasonaService.setEncryptArray(this.goalsForm.value.objectiveList,['objective']),
      }
      this.pasonaService.startSpinner();
      this.pasonaService.editDepartmentGoals(goalForm).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate(['/employee/depGoals']);
        }
        else {
          this.pasonaService.infoMessage(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.goalsForm.markAllAsTouched();
    }
  }
 

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getAllCompanyData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getCompanyById(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.companyData.push(resp.companyDetails);
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllUnitDataByCompanyId(id) {
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitByCompanyId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  errorChecking(val) {
    var fromMonth = parseInt(this.goalsForm.value.fromMonth);
    var toMonth = parseInt(this.goalsForm.value.toMonth);
    var fromYear = parseInt(this.goalsForm.value.fromYear);
    var toYear = parseInt(this.goalsForm.value.toYear);
    console.log(fromMonth, toMonth, toYear, fromYear);
    if (fromYear == toYear && fromMonth > toMonth) {
      if (val == 'fm') {
        this.goalsForm.patchValue({ fromMonth: '' });
        this.pasonaService.openSnackBar('From Month should be less than To Month');
      }
      else {
        this.goalsForm.patchValue({ toMonth: '' });
        this.pasonaService.openSnackBar('To Month should be greater than From Month');
      }

    }
    else if (fromYear > toYear) {
      if (val == 'fy') {
        this.goalsForm.patchValue({ fromYear: '' });
        this.pasonaService.openSnackBar('From Year should be less than To Year');
      }
      else {
        this.goalsForm.patchValue({ toYear: '' });
        this.pasonaService.openSnackBar('To Year should be greater than From Year');
      }

    }

  }

  patchValueForm(formData) {
    this.goalsForm.patchValue({
      depId: +formData.depId,
      summary: formData.summary,
      fromMonth: formData.fromMonth,
      fromYear: +formData.fromYear,
      toMonth: formData.toMonth,
      toYear: +formData.toYear,
      depObjId: formData.depObjId
    });
  }

  patchObjective(formData) {
    for (var i = 1; i < formData.objectiveList.length; i++) {
      if (formData.objectiveList.length != i && this.goalsForm.value.objectiveList.length != formData.objectiveList.length) {
        this.addObjective();
      }
    }
    if (formData.objectiveList.length != 0) {
      //this.dataAvailable=true;
      this.goalsForm.patchValue({ objectiveList: formData.objectiveList });
    }
  }
  getGoalsDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentGoalsById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var goalData=dataRes.departmentObjective;
        goalData.summary=this.pasonaService.getDecrypt(goalData.summary);
        goalData.objectiveList=this.pasonaService.getdecryptArray(goalData.objectiveList,['objective']);
        this.patchValueForm(goalData);
        this.patchObjective(goalData);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  errorCheckingWeightage(index) {
    var sum = 0;
    for (var i = 0; i < this.objectiveLists.length; i++) {
      sum += this.objectiveLists.at(i).get('weightage').value;
      if (sum > 100) {
        this.pasonaService.openSnackBar('Total Objective Weightage should be less or equal to 100');
        this.objectiveLists.at(i).get('weightage').patchValue('', { emitModelToViewChange: true });
      }
    }
  }
}
