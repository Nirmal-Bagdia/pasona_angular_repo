import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { CustomValidator } from 'app/main/shared/validation';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-grade-category-dialog',
  templateUrl: './grade-category-dialog.component.html',
  styleUrls: ['./grade-category-dialog.component.scss']
})
export class GradeCategoryDialogComponent implements OnInit {
  type: any;
  gradeForm: any;
  userData: any;
  id: any;

  constructor(private fb: FormBuilder, private pasonaService: PasonaServiceService, public dialogRef: MatDialogRef<GradeCategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.type = data.type;
    this.id = data.id;
    
    this.userData = this.pasonaService.getUserData();
    if (this.data.pType == 0) {
      this.gradeForm = this.fb.group({
        companyId: [this.userData.companyId, [Validators.required]],
        empId: [this.userData.empCode],
        categoryName: ['', [Validators.required,Validators.maxLength(5)]], /* CustomValidator.alphaNumeric1 */
        gradeId: [''],
      });
      if (this.type == 'Edit') {
        this.getGradeCategoryById();
      }
    }
    else
  {
    this.gradeForm = this.fb.group({
      companyId: [this.userData.companyId, [Validators.required]],
      empId: [this.userData.empCode],
      gradeCodeName: ['', [Validators.required,Validators.maxLength(5)]],
      gradeCodeId: [''],
    });
    if (this.type == 'Edit') {
      this.getGradeCodeById();
    }
  }

  }

  ngOnInit() {

  }

  get f() { return this.gradeForm.controls; };

  onNoClick(): void {
    this.dialogRef.close();
  }

  yes() {
    this.dialogRef.close(true);
  }


  addGrade() {
    if (this.gradeForm.valid) {
      this.pasonaService.startSpinner();
      if(this.data.pType==0)
      {
        let encData=this.gradeForm.value;
        encData.categoryName=this.pasonaService.setEncrypt(this.gradeForm.value.categoryName);
        this.pasonaService.addGradeCategory(encData).subscribe(resp => {
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
      else
      {
        let encData=this.gradeForm.value;
        encData.gradeCodeName=this.pasonaService.setEncrypt(this.gradeForm.value.gradeCodeName);
      this.pasonaService.addGradeCode(encData).subscribe(resp => {
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
      
    }
    else {
      this.gradeForm.markAllAsTouched();
    }
  }

  editGrade() {
    if (this.gradeForm.valid) {
      this.pasonaService.startSpinner();
      if(this.data.pType==0)
      {
        let encData=this.gradeForm.value;
        encData.categoryName=this.pasonaService.setEncrypt(this.gradeForm.value.categoryName);
        this.pasonaService.editGradeCategory(encData).subscribe(resp => {
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
      else
      {
        let encData=this.gradeForm.value;
        encData.gradeCodeName=this.pasonaService.setEncrypt(this.gradeForm.value.gradeCodeName);
        this.pasonaService.editGradeCode(encData).subscribe(resp => {
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
     
    }

    else {
      this.gradeForm.markAllAsTouched();
    }
  }
 
  patchValueForm(formData) {
    this.gradeForm.patchValue({
      categoryName: formData.categoryName,
      gradeId: +formData.gradeId
    });
  }

  patchValueFormGradeCode(formData) {
    this.gradeForm.patchValue({
      gradeCodeName: formData.gradeCodeName,
      gradeCodeId: +formData.gradeCodeId
    });
  }


  getGradeCodeById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGradeCodeById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var parameterData=dataRes.gradeDetails;
        parameterData.gradeCodeName=this.pasonaService.getDecrypt(parameterData.gradeCodeName);
        this.patchValueFormGradeCode(parameterData);
      }
      else {
        this.pasonaService.openSnackBar(dataRes.message);
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    });
  }

  getGradeCategoryById() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGradeCategoryById(this.id).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
      if (dataRes.status == '1') {
        var parameterData=dataRes.gradeDetails;
        parameterData.categoryName=this.pasonaService.getDecrypt(parameterData.categoryName);
        this.patchValueForm(parameterData);
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





