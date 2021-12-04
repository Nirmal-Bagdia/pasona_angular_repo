import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-final-approver-view',
  templateUrl: './final-approver-view.component.html',
  styleUrls: ['./final-approver-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class FinalApproverViewComponent implements OnInit {
  finalApproverForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  userData: any;
  sub: any;
  appraisalPlanId: number;
  groupConfig: any;
  stateName: any;
  ratingData: any[] = [];
  consolidateData: any[];
  selection:any;
  resultsLength:0;
  overAllSubmitStatus:number;
  endTermOverAllSubmitStatus:number;
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute, public dialog: MatDialog
  ) {
    this.consolidateData=[];
    this.stateName = this.pasonaService.getStateData();
    this._unsubscribeAll = new Subject();
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.appraisalPlanId = +params['ids']; // (+) converts string 'id' to a number
    });

    this.finalApproverForm = this.fb.group({
      companyId: [this.userData.companyId],
      empId: [this.userData.empCode],
      appraisalPlanId: [this.appraisalPlanId],
      ratingConsolidatorSheet: this.fb.array([])
    });
    this.selection={pNumber:0,pSize:25,companyId:this.userData.companyId,
    empId:this.userData.empCode,
    appraisalPlanId:this.appraisalPlanId};
  }


  ngOnInit() {
    this.getRatingTypeById();
    this.getFinalApproverSheet();
  }

  get f() { return this.finalApproverForm.controls; };

  arrayOne(n: number): any[] {
    return Array(n);
  }

  formReplica(formData) {
    var formReStructure = {
      companyId: formData.companyId,
      empId: formData.empId,
      appraisalPlanId: formData.appraisalPlanId,
      ratingConsolidatorSheet:this.pasonaService.setEncryptArray(formData.ratingConsolidatorSheet,['midTermFinalRemark','endTermFinalRemark']),
    }
    return formReStructure;
  }

  submitSheet() {
    console.log("form", this.finalApproverForm.value);
    if (this.finalApproverForm.valid) {
      this.pasonaService.startSpinner();
      let formData = this.formReplica(this.finalApproverForm.value);
      this.pasonaService.submitFinalApproverSheet(formData).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.backToAppraisees();
        }
        else {
          this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.finalApproverForm.markAllAsTouched();
    }
  }

  submitSheetEndterm() {
    console.log("form", this.finalApproverForm.value);
    if (this.finalApproverForm.valid) {
      this.pasonaService.startSpinner();
      let formData = this.formReplica(this.finalApproverForm.value);
      this.pasonaService.submitFinalApproverSheetEndTerm(formData).subscribe(dataRes => {
        this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.backToAppraisees();
        }
        else {
          this.pasonaService.openSnackBar(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.finalApproverForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getFinalApproverSheet() {
    this.pasonaService.startSpinner();
    this.pasonaService.getFinalSheetForFinalApprover(this.selection).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.overAllSubmitStatus=dataRes.overAllSubmitStatus;
        this.endTermOverAllSubmitStatus=dataRes.endTermOverAllSubmitStatus;
        this.consolidateData=dataRes.appraisalPlanDetails;
        this.resultsLength=dataRes.appraisalPlanDetails[0].totalPages;
          this.setConsolidatorSheet(this.consolidateData);
      }
      else {
        // this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  getRatingTypeById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getRatingTypeById(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.ratingData=[];
    if(resp.ratingDetails.ratingType=='numeric')
    {
      for(let i=1;i<=resp.ratingDetails.ratingTo;i++)
      {
        this.ratingData.push(i);
      }
    }
    else
    {
      for(let i=0;i<resp.ratingDetails.ratingTo;i++)
      {
        this.ratingData.push(resp.ratingDetails.alphaNumericList[i].name);
      }
    }
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  setConsolidatorSheet(data: any[]) {
    let control = <FormArray>this.finalApproverForm.controls.ratingConsolidatorSheet;
    data.forEach(x => {
      control.push(this.fb.group({
        empId: x.empId || '',
        midTermFinalRating:[x.midTermFinalRating || '',],
        midTermFinalRemark:x.midTermFinalRemark || '',
        endTermFinalRating:[x.endTermFinalRating || '',],
        endTermFinalRemark:x.endTermFinalRemark || '',
      }))
    })
    if(this.consolidateData[0].midTermProcessStatus==1 && this.consolidateData[0].endTermProcessStatus==0)
    {
      this.validateForm('midTermFinalRating');
    }
    else
    {
      this.validateForm('endTermFinalRating');
    }
  }

  validateForm(ch)
  {
      let defaultCompetencyControl = <FormArray>this.finalApproverForm.controls.ratingConsolidatorSheet;
      console.log("this.compe default",defaultCompetencyControl);
      for (var i = 0; i < defaultCompetencyControl.length; i++) {
        defaultCompetencyControl.at(i).get(ch).setValidators([Validators.required]);
        defaultCompetencyControl.at(i).get(ch).updateValueAndValidity();
        }
  }

  backToAppraisees() {
    this.router.navigate(['/employee/myAppraisees', this.appraisalPlanId])
  }

  getPaginatorData($event) {
    window.scroll(0, 0);
    console.log("ok", $event);
    this.selection.pSize=$event.pageSize;
    this.selection.pNumber=$event.pageIndex;
    this.getFinalApproverSheet();
}
} 

