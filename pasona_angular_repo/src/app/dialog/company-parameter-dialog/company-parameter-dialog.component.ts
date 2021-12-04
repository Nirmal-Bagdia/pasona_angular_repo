import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { PasonaServiceService } from 'app/share/pasona-service.service';


@Component({
  selector: 'app-company-parameter-dialog',
  templateUrl: './company-parameter-dialog.component.html',
  styleUrls: ['./company-parameter-dialog.component.scss']
})
export class CompanyParameterDialogComponent implements OnInit {

  type: any;
  appraisalForm: any;
  userData: any;
  id: any;
  popUpType: string = "parameter";
  parameterListData: any[] = [];
  removeIds: any[];
  canAdd:number=0;
  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<CompanyParameterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.type = data.type;
    this.id = data.id;
    this.removeIds = [];
    if (data.pData) {
      this.parameterListData = data.pData;
    }
    if (data.pType) {
      this.popUpType = data.pType;
    }
    this.userData = this.pasonaService.getUserData();
    if (this.popUpType == 'parameter') {
      this.appraisalForm = this.fb.group({
        companyId: [this.userData.companyId, [Validators.required]],
        // unitId: [this.userData.unitId],
        empId: [this.userData.empCode],
        name: ['', [Validators.required, Validators.maxLength(100)]],
        removeId: [''],
        companyParameterId: [''],
        parameters: this.fb.array([this.fb.group({ parameterName: ['', [Validators.required, Validators.maxLength(100)]], parameterWeightage: ['', ], parameterId: [''] })]),
      });
      if (this.type == 'Edit') {
        this.getCompanyParameterDataById();
      }
    }

  }

  ngOnInit() {

  }

  get parameterLists() {
    return this.appraisalForm.get('parameters') as FormArray;
  }

  addParameterList() {
    this.parameterLists.push(this.fb.group({ parameterName: ['', [Validators.required, Validators.maxLength(100)]], parameterWeightage: ['', ], parameterId: [''] }));
  }


  deleteParameterList(index, id) {
    if (id) {
      this.removeIds.push(id);
    }
    this.parameterLists.removeAt(index);
  }


  arrayOne(n: number): any[] {
    return Array(n);
  }

  get f() { return this.appraisalForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }


  createParameter() {
    if (this.appraisalForm.valid) {
      this.pasonaService.startSpinner();
      this.appraisalForm.patchValue({ removeId: [] });
      let encData=this.appraisalForm.value;
      encData.name=this.pasonaService.setEncrypt(this.appraisalForm.value.name);
      encData.parameters=this.pasonaService.setEncryptArray(this.appraisalForm.value.parameters,['parameterName']);
      this.pasonaService.addCompanyParameter(encData).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
        else{
          this.pasonaService.infoMessage(resp.message);
        }
          
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }
    else {
      this.appraisalForm.markAllAsTouched();
    }
  }

  editParameter() {
    if (this.appraisalForm.valid) {
      this.pasonaService.startSpinner();
      this.appraisalForm.patchValue({ removeId: this.removeIds });
      let encData=this.appraisalForm.value;
      encData.name=this.pasonaService.setEncrypt(this.appraisalForm.value.name);
      encData.parameters=this.pasonaService.setEncryptArray(this.appraisalForm.value.parameters,['parameterName']);
      this.pasonaService.editCompanyParameter(encData).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.pasonaService.openSnackBar(resp.message);
          this.yes();
        }
        else{
          this.pasonaService.infoMessage(resp.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
      })
    }

    else {
      this.appraisalForm.markAllAsTouched();
    }
  }
 
  patchValueForm(formData) {
    this.appraisalForm.patchValue({
      companyId: +formData.companyId,
     /*  unitId: +formData.unitId, */
      empId: +formData.empId,
      name: formData.name,
      companyParameterId: +formData.companyParameterId
    });
  }

  patchParameter(formData) {
    for (var i = 1; i < formData.parameters.length; i++) {
      if (formData.parameters.length != i && this.appraisalForm.value.parameters.length != formData.parameters.length) {
        this.addParameterList();
      }
    }
    if (formData.parameters.length != 0) {
      this.appraisalForm.patchValue({ parameters: formData.parameters });
    }
  }

  getCompanyParameterDataById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getCompanyParameterById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var parameterData=dataRes.appraisalParameterDetails;
        this.canAdd=dataRes.canAdd;
        parameterData.name=this.pasonaService.getDecrypt(parameterData.name);
        parameterData.parameters=this.pasonaService.getdecryptArray(parameterData.parameters,['parameterName']);
        this.patchValueForm(parameterData);
        this.patchParameter(parameterData);
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
    for (var i = 0; i < this.parameterLists.length; i++) {
      sum += this.parameterLists.at(i).get('parameterWeightage').value;
      if (sum > 100) {
        this.pasonaService.openSnackBar('Total Appraisal Parameter Weightage should be less or equal to 100');
        this.parameterLists.at(i).get('parameterWeightage').patchValue('', { emitModelToViewChange: true });
      }
    }
  }

}





