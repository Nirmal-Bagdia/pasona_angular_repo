import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidator } from 'app/main/shared/validation';
import { validateBasis } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-company-configuraion',
  templateUrl: './company-configuraion.component.html',
  styleUrls: ['./company-configuraion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class CompanyConfiguraionComponent implements OnInit {
  configurationForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  companyData: any;
  unitData: any;
  id: any;
  sub: any;
  userData: any;
  urlCurrent: string;
  roleModule: any;
  activeIndex: number;
  activeIndexValue: number;
  totalGradeNumber: number = 0;
  totalValueNumber: number = 1;
  RATING_DATA: any[] = [
    { name: 'Numeric', value: 'numeric' },
    { name: 'Alpha', value: 'alpha' },
    { name: 'Alpha-numeric', value: 'alphaNumeric' }
  ];


  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router, private route: ActivatedRoute
  ) {

    this._unsubscribeAll = new Subject();
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.configurationForm = this.fb.group({
      ratingType: ['numeric',],
      ratingFrom: [1,],
      ratingTo: [5,],
      gradeConfi: ['0',],
      alphaNumericList: this.fb.array([]),
      planType: ['half yearly',],
      companyId: [this.userData.companyId],
      unitId: ['',],
      gradeList: this.fb.array([]),
      // gradeList: this.fb.array([this.fb.group({ grade: ['', [Validators.required, Validators.maxLength(3)]],percentage:['',Validators.required] })]),
      valueList: this.fb.array([this.fb.group({ name: ['', [Validators.required, Validators.maxLength(3)]], valueFrom: [1, Validators.required], valueTo: ['', Validators.required] })]),
    });
    this.roleModule.write = true;
    var roleData = this.pasonaService.getRoleModule(21);
    // console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      if (this.roleModule.write == false) {
        // this.configurationForm.disable();
      }
      // console.log("roleData", roleData);
    }

  }

  ngOnInit() {
    this.getRatingConfigurationById();
  }
  get gradeLists() {
    return this.configurationForm.get('gradeList') as FormArray;
  }

  get valueLists() {
    return this.configurationForm.get('valueList') as FormArray;
  }

  get f() { return this.configurationForm.controls; };

  addGrade() {
    this.gradeLists.push(this.fb.group({ grade: ['', [Validators.required, Validators.maxLength(3)]], percentage: ['', Validators.required] }));
  }

  deleteGrade(index) {
    this.gradeLists.removeAt(index);
    this.activeIndex = NaN;
  }

  deleteGrd(index, value) {
    if (value) {
      this.activeIndex = index;
      setTimeout(() => {
        this.activeIndex = NaN;
      }, 6000);
    }
    else {
      this.deleteGrade(index);
    }
  }

  addValue() {
    let lastValue = this.valueLists.at(this.valueLists.length - 1).get('valueTo').value;
    this.valueLists.push(this.fb.group({ name: ['', [Validators.required, Validators.maxLength(3)]], valueFrom: [lastValue + 1, Validators.required], valueTo: ['', Validators.required] }));
  }

  deleteValue(index) {
    this.valueLists.removeAt(index);
    this.activeIndexValue = NaN;
  }

  deleteVal(index, value) {
    if (value) {
      this.activeIndexValue = index;
      setTimeout(() => {
        this.activeIndexValue = NaN;
      }, 6000);
    }
    else {
      this.deleteValue(index);
    }
  }

  deleteAlphaNumericList(index) {
    let control = <FormArray>this.configurationForm.controls.alphaNumericList;
    control.removeAt(index)
  }

  setAlphaNumericList(selected, value: number) {
    let companyData = [];
    for (let i = value; i > 0; i--) {
      companyData.push(i);
    }
    this.configurationForm.value.alphaNumericList.forEach((element, i) => {
      this.deleteAlphaNumericList(0);
    });
    if (selected == 'alpha') {
      this.addAlphaList(companyData);
    }
    else if (selected == 'alphaNumeric') {
      this.addAlphaNumericList(companyData);
    }
  }

  addAlphaNumericList(companyData: any[]) {
    let control = <FormArray>this.configurationForm.controls.alphaNumericList;
    companyData.forEach(x => {
      control.push(this.fb.group({
        numberValue: [x.numberValue || x,],
        name: [x.name || '', [Validators.maxLength(3), Validators.required, CustomValidator.alphaNumeric1]],
      }))
    })
  }

  addAlphaList(companyData: any[]) {
    let control = <FormArray>this.configurationForm.controls.alphaNumericList;
    companyData.forEach(x => {
      control.push(this.fb.group({
        numberValue: [x.numberValue || x,],
        name: [x.name || '', [Validators.maxLength(3), Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      }))
    })
  }

  submitRatingSetting() {
    if (this.configurationForm.valid) {
      if (this.totalGradeNumber != 100 && this.configurationForm.value.gradeConfi==1 ) {
        this.pasonaService.infoMessage('Total Grade Percentage should be equal to 100');
      }
      else if (this.totalValueNumber != 100) {
        this.pasonaService.infoMessage('Total Value Configuration Matrix should be equal to 100');
      }
      else {
        this.pasonaService.addRatingConfigurationSetting(this.configurationForm.value).subscribe(dataRes => {
          this.pasonaService.stopSpinner();
          if (dataRes.status == '1') {
            this.pasonaService.openSnackBar(dataRes.message);
          }
          else {
            this.pasonaService.infoMessage(dataRes.message);
          }
        }, error => {
          this.pasonaService.stopSpinner();
          this.pasonaService.openSnackBarError('Please connect to server!');
        });
      }
    }
    else {
      this.configurationForm.markAllAsTouched();
      // this.pasonaService.infoMessage('Somthing went wrong please the form!')
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  patchValueForm(formData) {
    this.configurationForm.patchValue({
      ratingType: formData.ratingType,
      ratingFrom: formData.ratingFrom,
      ratingTo: formData.ratingTo,
      planType: formData.planType
    });
  }

  patchGradeList(formData) {
    this.totalGradeNumber = 0;
    if(!formData.gradeList)
    {
      formData.gradeList=[];
    }
    for (var i = 0; i < formData.gradeList.length; i++) {
      //  if (formData.gradeList.length != i && this.configurationForm.value.gradeList.length != formData.gradeList.length) {
      this.addGrade();
      // }
    }
    if (formData.gradeList.length != 0) {
      this.configurationForm.patchValue({ gradeList: formData.gradeList });
      this.totalGradeNumber = 100;
      this.configurationForm.patchValue({ gradeConfi: '1' });
    }


  }

  patchValueList(formData) {
    for (var i = 1; i < formData.valueList.length; i++) {
      if (formData.valueList.length != i && this.configurationForm.value.valueList.length != formData.valueList.length) {
        this.addValue();
      }
    }
    if (formData.valueList.length != 0) {
      this.configurationForm.patchValue({ valueList: formData.valueList });
    }
    this.totalValueNumber = 100;
  }

  getRatingConfigurationById() {
    this.pasonaService.startSpinner();
    console.log("id", this.id);
    this.pasonaService.getRatingConfigurationSettingById(this.userData.companyId).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        this.patchValueForm(dataRes.ratingDetails);
        this.patchGradeList(dataRes.ratingDetails);
        this.patchValueList(dataRes.ratingDetails);
        if (dataRes.ratingDetails.ratingType == 'alpha') {
          this.addAlphaList(dataRes.ratingDetails.alphaNumericList)
        }
        else if (dataRes.ratingDetails.ratingType == 'alphaNumeric') {
          this.addAlphaNumericList(dataRes.ratingDetails.alphaNumericList)
        }
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  errorCheckingGrade(index) {
    var sum = 0;
    for (var i = 0; i < this.gradeLists.length; i++) {
      sum += this.gradeLists.at(i).get('percentage').value || 0;
      if (sum > 100) {
        this.pasonaService.openSnackBar('Total Grade Percentage should be equal to 100');
        this.gradeLists.at(i).get('percentage').patchValue('', { emitModelToViewChange: true });
      }
    }
    this.totalGradeNumber = sum;
  }

  errorCheckingValue(index) {
    this.totalValueNumber = this.valueLists.at(this.valueLists.length - 1).get('valueTo').value
  }

  gradeConfiOption(val) {
    if (val == 1) {
      this.addGrade();
    }
    else {
      while (this.gradeLists.value.length != 0) {
        this.gradeLists.removeAt(0);
      }
      this.totalGradeNumber = 0;
    }
  }
}


