import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-raring-consolidator-view',
  templateUrl: './raring-consolidator-view.component.html',
  styleUrls: ['./raring-consolidator-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RaringConsolidatorViewComponent implements OnInit {

  consolidateForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  userData: any;
  sub: any;
  appraisalPlanId: number;
  groupConfig: any;
  stateName: any;
  ratingData: any[] = [];
  consolidateData: any[];
  submitForm:boolean=false;
  submitFormEndTerm: boolean=false;
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute, public dialog: MatDialog
  ) {
    this.stateName = this.pasonaService.getStateData();
    this._unsubscribeAll = new Subject();
    this.consolidateData=[];
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.appraisalPlanId = +params['ids']; // (+) converts string 'id' to a number
    });

    this.consolidateForm = this.fb.group({
      companyId: [this.userData.companyId],
      empId: [this.userData.empCode],
      appraisalPlanId: [this.appraisalPlanId],
      ratingConsolidatorSheet: this.fb.array([])
    });

  }


  ngOnInit() {
    this.getRatingTypeById();
    this.getConsolidatorSheet();
  }

  get f() { return this.consolidateForm.controls; };

  arrayOne(n: number): any[] {
    return Array(n);
  }

  formReplica(formData) {
    var formReStructure = {
      companyId: formData.companyId,
      empId: formData.empId,
      appraisalPlanId: formData.appraisalPlanId,
      ratingConsolidatorSheet:this.pasonaService.setEncryptArray(formData.ratingConsolidatorSheet,['remark','endTermRemark']),
    }
    return formReStructure;
  }

  submitSheet() {
    console.log("form", this.consolidateForm.value);
    if (this.consolidateForm.valid) {
      this.pasonaService.startSpinner();
      let formData = this.formReplica(this.consolidateForm.value);
      this.pasonaService.submitConsolidatorShet(formData).subscribe(dataRes => {
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
      this.consolidateForm.markAllAsTouched();
    }
  }

  submitSheetEndTerm()
  {
    console.log("form", this.consolidateForm.value);
    if (this.consolidateForm.valid) {
      this.pasonaService.startSpinner();
      let formData = this.formReplica(this.consolidateForm.value);
      this.pasonaService.submitConsolidatorShetEndTerm(formData).subscribe(dataRes => {
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
      this.consolidateForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getConsolidatorSheet() {
    this.pasonaService.startSpinner();
    var formData= {
      companyId:this.userData.companyId,
      empId:this.userData.empCode,
      appraisalPlanId:this.appraisalPlanId
    }
    this.pasonaService.getConsolidatorSheetForConsolidator(formData).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.consolidateData=dataRes.appraisalPlanDetails;
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
    let control = <FormArray>this.consolidateForm.controls.ratingConsolidatorSheet;
    if(data[0].indicativeRating)
    {
      this.submitForm=true;
    }
    if(data[0].endTermIndicativeRating)
    {
      this.submitFormEndTerm=true;
    }
    data.forEach(x => {
      control.push(this.fb.group({
        empId: x.empId || '',
        rankOrder:x.rankOrder || 0,
        indicativeRating:[x.indicativeRating || ''],
        remark:x.remark || '',
        endTermRankOrder:x.endTermRankOrder || 0,
        endTermIndicativeRating:[x.endTermIndicativeRating || ''],
        endTermRemark:x.endTermRemark || '',
      }))
    })

    if(this.consolidateData[0].midTermProcessStatus==1 && this.consolidateData[0].endTermProcessStatus==0)
    {
      this.validateForm('indicativeRating');
    }
    else
    {
      this.validateForm('endTermIndicativeRating');
    }

  }

  validateForm(ch)
  {
      let defaultCompetencyControl = <FormArray>this.consolidateForm.controls.ratingConsolidatorSheet;
      console.log("this.compe default",defaultCompetencyControl);
      for (var i = 0; i < defaultCompetencyControl.length; i++) {
        defaultCompetencyControl.at(i).get(ch).setValidators([Validators.required]);
        defaultCompetencyControl.at(i).get(ch).updateValueAndValidity();
        }
  }

  backToAppraisees() {
    this.router.navigate(['/employee/myAppraisees', this.appraisalPlanId])
  }
} 
