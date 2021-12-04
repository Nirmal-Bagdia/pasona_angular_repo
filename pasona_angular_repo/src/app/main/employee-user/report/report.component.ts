import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { ChangeContext, Options } from 'ng5-slider';
import { MatOption } from '@angular/material';
/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ReportComponent implements OnInit {
  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    showTicksValues: true,
    tickStep: 10,
    tickValueStep: 10
  };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['sNo', 'departmentName', 'unit', 'action'];
  dataSource = new MatTableDataSource<any>();
  departmentData: any[];
  userData: any;
  reportData: any[] = [];
  roleModule: any;
  reportType: any = 1;
  reportOption = [
    { id: 1, name: "List of Appraisees - By Grade" },
    { id: 2, name: "List of Appraisees- By Dept + Grade" },
    { id: 3, name: "List of Appraisees - By Appraisal Group + Total Score" },
    { id: 4, name: "List of Appraisees - By Appraiser  + Total score" },
    { id: 5, name: "List of Appraisees - By Dept + Appraisal Group+  Total Score" },
    { id: 6, name: "List of Appraisees - By Grade + Appraisal Rating - 1/2/3 years rating" },
    { id: 7, name: "List of Appraisees - By Dept. + Grade + Appraisal Rating -1/2/3 years" },
    { id: 8, name: "List of Appraisees - completed or not completed Objective Setting" },
    { id: 9, name: "List of Appraisees - completed or not completed Mid-term Self Appraisal or Annual self appraisal/evaluation" },
    { id: 10, name: "List of Appraiser -  By Dept. + Appr Type: 1st/2nd or 3rd Appr." },
    { id: 11, name: "List of Appraiser wise - completed or not completed different processes like Obj setting, review, evaluation etc" },
    { id: 12, name: "List of Appraisees in Dept with Individual Objectives" },
    { id: 13, name: "Individual Objectives for each appraisee" },
    { id: 14, name: "Generation of Moderation sheets for final evaluation " },
    { id: 15, name: "Generation of Consolidated list with Indicative & Primary Rating" },
    { id: 16, name: "Generation of Consolidated list with Indicative, Primary Rating & Final Rating" },
   // { id: 17, name: "Generation of list of employees eligible for promotion" },
    { id: 18, name: "Generation of list with simulation for increment" },
   // { id: 19, name: "Generation of list of 'Consistent High Performers'" },
   // { id: 20, name: "Generation of list of 'Consistent Low Performers'" },
    { id: 21, name: "Employee List with Training Needs - Dept & Grade wise" },
    //{ id: 22, name: "Employee List with CTC details- Dept and/or Grade wise" },
  ];
  filter1 = [{ id: 1, name: "Completed" }, { id: 2, name: "Not Completed" }];
  term = [{ id: 1, name: "Mid-term" }, { id: 2, name: "End-term" }];
  appraiserType = [{ id: 1, name: "First Appraiser" }, { id: 2, name: "Second Appraiser" }, { id: 3, name: "Third Appraiser" }];
  gradeData: any[] = [];
  gradeCode: any[] = [];
  appraiserData:any[]=[];
  selection = { gradeCode: [], gradeCategory: [], department: [], appraisalGroup: [], aprType: 1, aprYear: 1, status: [1], appraisalPlan: 0 ,appraiser:[],term:1,process:1}
  groupData: any[] = [];
  appraisalPlanData: any[] = [];
  selection1: { pNumber: number; pSize: number; companyId: any; planName: string; };
  range = { min: 0, max: 100 };
  @ViewChild('allSelectedDept',{static:false}) public allSelectedDept: MatOption;
  @ViewChild('allSelectedAppGroup',{static:false}) public allSelectedAppGroup: MatOption;
  @ViewChild('allSelectedGcate',{static:false}) public allSelectedGcate: MatOption;
  @ViewChild('allSelectedGcode',{static:false}) public allSelectedGcode: MatOption;
  @ViewChild('allSelectedAppraiser',{static:false}) public allSelectedAppraiser: MatOption;
  @ViewChild('allSelectedAprType',{static:false}) public allSelectedAprType: MatOption;
  @ViewChild('allSelectedAprYear',{static:false}) public allSelectedAprYear: MatOption;
  @ViewChild('allSelectedStatus',{static:false}) public allSelectedStatus: MatOption;
  
  constructor(private pasonaService: PasonaServiceService, public dialog: MatDialog, public router: Router) {

    this.departmentData = [];
    this.roleModule = {};
    this.userData = this.pasonaService.getUserData();
    this.selection1 = { pNumber: 0, pSize: 1000, companyId: this.userData.companyId, planName: '' };
    var roleData = this.pasonaService.getRoleModule(23);
    console.log("roleData", roleData);
    if (roleData) {
      this.roleModule = roleData;
      console.log("roleData", roleData);
    }
  }

  ngOnInit() {
    this.getAllDepartmentData();
    this.getAllGroup();
    this.getAllAppraisalPlanData();
    this.getAllGradeCategory();
    this.getAllGradeCode();
    
  }


  tosslePerOneDept(){ 
    if (this.allSelectedDept.selected) {  
     this.allSelectedDept.deselect();
     return false;
 }
   if(this.selection.department.length==this.departmentData.length)
     this.allSelectedDept.select();
 
 }
   toggleAllSelectionDept() {
     if (this.allSelectedDept.selected) {
      this.selection.department=[...this.departmentData.map(item => item.depId), 0];
     } else {
      this.selection.department=[];
     }
   }

   tosslePerOneStatus(){ 
    if (this.allSelectedStatus.selected) {  
     this.allSelectedStatus.deselect();
     return false;
 }
   if(this.selection.status.length==this.filter1.length)
     this.allSelectedStatus.select();
 
 }
   toggleAllSelectionStatus() {
     if (this.allSelectedStatus.selected) {
      this.selection.status=[...this.filter1.map(item => item.id), 0];
     } else {
      this.selection.status=[];
     }
   }

   tosslePerOneGcate(){ 
    if (this.allSelectedGcate.selected) {  
     this.allSelectedGcate.deselect();
     return false;
 }
   if(this.selection.gradeCategory.length==this.gradeData.length)
     this.allSelectedGcate.select();
 
 }
   toggleAllSelectionGcate() {
     if (this.allSelectedGcate.selected) {
      this.selection.gradeCategory=[...this.gradeData.map(item => item.gradeId), 0];
     } else {
      this.selection.gradeCategory=[];
     }
   }

   tosslePerOneGcode(){ 
    if (this.allSelectedGcode.selected) {  
     this.allSelectedGcode.deselect();
     return false;
 }
   if(this.selection.gradeCode.length==this.gradeCode.length)
     this.allSelectedGcode.select();
 
 }
   toggleAllSelectionGcode() {
     if (this.allSelectedGcode.selected) {
      this.selection.gradeCode=[...this.gradeCode.map(item => item.gradeCodeId), 0];
     } else {
      this.selection.gradeCode=[];
     }
   }


   tosslePerOneAppGroup(){ 
  /*    console.log("this.allSelectedAppGroup",this.allSelectedAppGroup);
     console.log("this.allSelectedAppGroup data",data); */
    if (this.allSelectedAppGroup.selected) {  
     this.allSelectedAppGroup.deselect();
     return false;
 }
   if(this.selection.appraisalGroup.length==this.groupData.length)
     this.allSelectedAppGroup.select();
 
 }
   toggleAllSelectionAppGroup() {
     if (this.allSelectedAppGroup.selected) {
      this.selection.appraisalGroup=[...this.groupData.map(item => item.groupId), 0];
     } else {
      this.selection.appraisalGroup=[];
     }
   }

   tosslePerOneAppraiser(){ 
    if (this.allSelectedAppraiser.selected) {  
     this.allSelectedAppraiser.deselect();
     return false;
 }
   if(this.selection.appraiser.length==this.appraiserData.length)
     this.allSelectedAppraiser.select();
 
 }
   toggleAllSelectionAppraiser() {
     if (this.allSelectedAppraiser.selected) {
      this.selection.appraiser=[...this.appraiserData.map(item => item.id), 0];
     } else {
      this.selection.appraiser=[];
     }
   }

 /*   tosslePerOneAprType(){ 
    if (this.allSelectedAprType.selected) {  
     this.allSelectedAprType.deselect();
     return false;
 }
   if(this.selection.aprType.length==this.appraiserType.length)
     this.allSelectedAprType.select();
 
 }
   toggleAllSelectionAprType() {
     if (this.allSelectedAprType.selected) {
      this.selection.aprType=[...this.appraiserType.map(item => item.id), 0];
     } else {
      this.selection.aprType=[];
     }
   } */

  /*  tosslePerOneAprYear(){ 
    if (this.allSelectedAprYear.selected) {  
     this.allSelectedAprYear.deselect();
     return false;
 }
   if(this.selection.aprYear.length==3)
     this.allSelectedAprYear.select();
 
 }
   toggleAllSelectionAprYear() {
     if (this.allSelectedAprYear.selected) {
      this.selection.aprYear=[...[1,2,3].map(item => item), 0];
     } else {
      this.selection.aprYear=[];
     }
   } */
   
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllDepartmentData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getDepartmentByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.departmentData = this.pasonaService.getdecryptArray(resp.departmentDetails, ['departmentName']);
        this.selection.department = [this.departmentData[0].depId];
      }
    }, error => {
      this.pasonaService.stopSpinner();
      this.pasonaService.openSnackBarError('Please connect to server!');
    })
  }

  getAllGradeCategory() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllGradeCategory(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.gradeData = resp.gradeDetails;
        this.selection.gradeCategory = [this.gradeData[0].gradeId];
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
        this.gradeCode = resp.gradeDetails;
        // this.selection.gradeCode=this.gradeCode[0].gradeCodeId;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }


  getAllGroup() {
    this.pasonaService.startSpinner();
    this.pasonaService.getGroupByCompanyId(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.groupData = resp.groupDetails;
        this.selection.appraisalGroup = [this.groupData[0].groupId];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }


  getAllAppraiser() {
    this.pasonaService.startSpinner();  /* getAllAppraiser */
    this.pasonaService.getAllAppraiser(this.userData.companyId,this.selection.appraisalPlan).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraiserData = resp.appraiser;
        this.selection.appraiser = [this.appraiserData[0].id];
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllAppraisalPlanData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllAppraisalPlanByCompanyId(this.selection1).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.appraisalPlanData = resp.appraisalPlanDetails.content;
        this.selection.appraisalPlan = Number(this.appraisalPlanData[0].appraisalPlanId);
        this.getAllAppraiser();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    console.log("changeContext", changeContext, changeContext.value, changeContext.highValue);
    this.range.min = changeContext.value;
    this.range.max = changeContext.highValue;
  }

  searchReport() {
    this.reportData = [];
    this.dataSource = new MatTableDataSource<any>(this.reportData);
    this.dataSource.paginator = this.paginator;
    if (this.reportType == 1) {
      this.getAppraiseeByGrade('d');
    }
    else if (this.reportType == 2) {
      this.getAppraiseeByDeptAndGrade('d');
    }
    else if (this.reportType == 3) {
      this.getAppraisalGroupAndTotalScoreData('d');
    }
    else if (this.reportType == 4) {
      this.getAppraiseeByAppraiserAndTotalScore('d');
    }
    else if (this.reportType == 5) {
      this.getAppraiseeDeptAndGroupAndTotalScore('d');
    }
    else if (this.reportType == 6) {
      this.getAppraiseeByGradeAndAppraiserRating('d');
    }
    else if (this.reportType == 7) {
      this.getAppraiseeByDeptGradeAndAppraiserRating('d');
    }
    else if (this.reportType == 8) {
      this.getAppraiseeByStatusOfObjectiveSetting('d');
    }
    else if (this.reportType == 9) {
      this.getAppraiseeByStatusAndTerm('d');
    }
    else if (this.reportType == 10) {
      this.getAppraiserByDeptAppType('d');
    }
    else if (this.reportType == 11) {
      this.getAppraiserByStatusAndOther('d');
    }
    else if (this.reportType == 12) {
      this.getAppraiseeObjectiveByDept('d');
    }
    else if (this.reportType == 13) {
      this.getAppraiseeObjectiveById('d');
    }
    else if (this.reportType == 14) {
      this.getModerationReportForFinalEval('d');
    }
    else if (this.reportType == 15) {
      this.getConsolidatedReportByIndicativeAndPrimaryRating('d');
    }
    else if (this.reportType == 16) {
      this.getConsolidatedReportByIndicativeAndPrimaryAndFinalRating('d');
    }
    else if (this.reportType == 17) {
      this.getAppraisalGroupAndTotalScoreData('d');
    }
    else if (this.reportType == 18) {
      this.getReportForStimulationForIncrement('d');
    }
    else if (this.reportType == 19) {
      this.getAppraisalGroupAndTotalScoreData('d');
    }
    else if (this.reportType == 20) {
      this.getAppraisalGroupAndTotalScoreData('d');
    }
    else if (this.reportType == 21) {
      this.getEmployeeListWithTrainingNeeds('d');
    }

  }

  exportReport() {
    if (this.reportType == 1) {
      this.getAppraiseeByGrade('e');
    }
    else if (this.reportType == 2) {
      this.getAppraiseeByDeptAndGrade('e');
    }
    else if (this.reportType == 3) {
      this.getAppraisalGroupAndTotalScoreData('e');
    }
    else if (this.reportType == 4) {
      this.getAppraiseeByAppraiserAndTotalScore('e');
    }
    else if (this.reportType == 5) {
      this.getAppraiseeDeptAndGroupAndTotalScore('e');
    }
    else if (this.reportType == 6) {
      this.getAppraiseeByGradeAndAppraiserRating('e');
    } 
    else if (this.reportType == 7) {
      this.getAppraiseeByDeptGradeAndAppraiserRating('e');
    }
    else if (this.reportType == 8) {
      this.getAppraiseeByStatusOfObjectiveSetting('e');
    } 
    else if (this.reportType == 9) {
      this.getAppraiseeByStatusAndTerm('e');
    } 
    else if (this.reportType == 10) {
      this.getAppraiserByDeptAppType('e');
    }
     else if (this.reportType == 11) {
      this.getAppraiserByStatusAndOther('e');
    }
    else if (this.reportType == 12) {
      this.getAppraiseeObjectiveByDept('e');
    }
    else if (this.reportType == 13) {
      this.getAppraiseeObjectiveById('e');
    }
     else if (this.reportType == 14) {
      this.getModerationReportForFinalEval('e');
    }
    else if (this.reportType == 15) {
      this.getConsolidatedReportByIndicativeAndPrimaryRating('e');
    } 
    else if (this.reportType == 16) {
      this.getConsolidatedReportByIndicativeAndPrimaryAndFinalRating('e');
    }
     else if (this.reportType == 17) {
      this.getAppraisalGroupAndTotalScoreData('e');
    }
    else if (this.reportType == 18) {
      this.getReportForStimulationForIncrement('e');
    } 
    else if (this.reportType == 19) {
      this.getAppraisalGroupAndTotalScoreData('e');
    }
    else if (this.reportType == 20) {
      this.getAppraisalGroupAndTotalScoreData('e');
    }
    else if (this.reportType == 21) {
      this.getEmployeeListWithTrainingNeeds('e');
    }
     else if (this.reportType == 22) {
      this.getAppraisalGroupAndTotalScoreData('e');
    }
     
  }

  

  getAppraiseeByGrade(ch) {
    
    if(this.selection.appraisalPlan &&  this.selection.gradeCategory.length)
    {
      this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      gradeCodeId: this.selection.gradeCode,
      gradeId: this.selection.gradeCategory
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraiseeByGrade(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByGradeExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeByDeptAndGrade(ch) {
    if((this.selection.appraisalPlan &&  this.selection.gradeCategory.length) && this.selection.department.length)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      depId: this.selection.department,
      gradeCodeId: this.selection.gradeCode,
      gradeId: this.selection.gradeCategory
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraiseeByDeptAndGrade(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;     
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByDeptAndGradeExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraisalGroupAndTotalScoreData(ch) {
    if(this.selection.appraisalPlan &&  this.selection.appraisalGroup.length)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      appraisalGroupId: this.selection.appraisalGroup,
      scoreFrom: this.range.min,
      scoreTo: this.range.max,
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraisalGroupAndTotalScoreData(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraisalGroupAndTotalScoreDataExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeByAppraiserAndTotalScore(ch) {
    if(this.selection.appraisalPlan &&  this.selection.appraiser.length)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      empId: this.selection.appraiser,
      scoreFrom: this.range.min,
      scoreTo: this.range.max,
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraiseeByAppraiserAndTotalScore(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByAppraiserAndTotalScoreExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeDeptAndGroupAndTotalScore(ch) {
    if(this.selection.appraisalPlan &&  this.selection.appraisalGroup.length && this.selection.department.length)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      appraisalGroupId: this.selection.appraisalGroup,
      depId:this.selection.department,
      scoreFrom: this.range.min,
      scoreTo: this.range.max,
    }
    if (ch == 'd') {
      this.pasonaService.getAppraiseeDeptAndGroupAndTotalScore(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeDeptAndGroupAndTotalScoreExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeByGradeAndAppraiserRating(ch) {
    if(this.selection.appraisalPlan &&  this.selection.gradeCategory.length && this.selection.aprYear)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      companyId: this.userData.companyId,
      year:this.selection.aprYear,
      gradeCodeId: this.selection.gradeCode,
      gradeId: this.selection.gradeCategory
     // depId:this.selection.department,
    //  scoreFrom: this.range.min,
     // scoreTo: this.range.max,
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraiseeByGradeAndAppraiserRating(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByGradeAndAppraiserRatingExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeByDeptGradeAndAppraiserRating(ch) {
    if(this.selection.appraisalPlan &&  this.selection.gradeCategory.length && this.selection.department.length && this.selection.aprYear)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      companyId: this.userData.companyId,
      year:this.selection.aprYear,
      depId:this.selection.department,
      gradeCodeId: this.selection.gradeCode,
      gradeId: this.selection.gradeCategory
     /*  scoreFrom: this.range.min,
      scoreTo: this.range.max, */
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraiseeByDeptGradeAndAppraiserRating(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByDeptGradeAndAppraiserRatingExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeByStatusOfObjectiveSetting(ch) {
    if(this.selection.appraisalPlan &&  this.selection.status.length)
    {
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      companyId: this.userData.companyId,
      objStatus:this.selection.status,
    }
    if (ch == 'd') {
     
      this.pasonaService.getAppraiseeByStatusOfObjectiveSetting(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByStatusOfObjectiveSettingExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeByStatusAndTerm(ch) {
    if(this.selection.appraisalPlan &&  this.selection.status.length && this.selection.term ){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
    //  appraisalGroupId: this.selection.appraisalGroup,
      objStatus:this.selection.status,
      term: this.selection.term,
    }
    if (ch == 'd') {
      this.pasonaService.getAppraiseeByStatusAndTerm(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeByStatusAndTermExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiserByDeptAppType(ch) {
    if(this.selection.appraisalPlan &&  this.selection.department.length && this.selection.status.length){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      depId:this.selection.department,
      objStatus:this.selection.status,
      appraiserType: this.selection.aprType,
    }
    if (ch == 'd') {
      this.pasonaService.getAppraiserByDeptAppType(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiserByDeptAppTypeExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiserByStatusAndOther(ch) {
    if(this.selection.appraisalPlan &&  this.selection.status.length){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      process: this.selection.process,
      appraiserType:this.selection.aprType,
      objStatus: this.selection.status,
      term: this.selection.term,
    }
    if (ch == 'd') {
      this.pasonaService.getAppraiserByStatusAndOther(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiserByStatusAndOtherExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }
 
  getAppraiseeObjectiveByDept(ch) {
    if(this.selection.appraisalPlan &&  this.selection.department.length){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      depId:this.selection.department,
    }
    if (ch == 'd') {
      this.pasonaService.getAppraiseeObjectiveByDept(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeObjectiveByDeptExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getAppraiseeObjectiveById(ch) {
    if(this.selection.appraisalPlan){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
    //  depId:this.selection.department,
    }
    if (ch == 'd') {
      this.pasonaService.getAppraiseeObjectiveById(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getAppraiseeObjectiveByIdExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getModerationReportForFinalEval(ch)
  {
    if(this.selection.appraisalPlan &&  this.selection.term){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
    //  depId:this.selection.department,
    term:this.selection.term
    }
    if (ch == 'd') {
     this.pasonaService.getModerationReportForFinalEval(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getModerationReportForFinalEvalExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getEmployeeListWithTrainingNeeds(ch)
  {
    if(this.selection.appraisalPlan &&  this.selection.gradeCategory.length && this.selection.department.length && this.selection.term){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      depId:this.selection.department,
      gradeCodeId: this.selection.gradeCode,
      gradeId: this.selection.gradeCategory,
      term:this.selection.term
    }
    if (ch == 'd') {
     this.pasonaService.getEmployeeListWithTrainingNeeds(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getEmployeeListWithTrainingNeedsExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getConsolidatedReportByIndicativeAndPrimaryRating(ch)
  {
    if(this.selection.appraisalPlan &&  this.selection.term){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      term:this.selection.term
    }
    if (ch == 'd') {
     this.pasonaService.getConsolidatedReportByIndicativeAndPrimaryRating(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getConsolidatedReportByIndicativeAndPrimaryRatingExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }

  getConsolidatedReportByIndicativeAndPrimaryAndFinalRating(ch)
  {
    if(this.selection.appraisalPlan &&  this.selection.term){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
      term:this.selection.term
    }
    if (ch == 'd') {
     this.pasonaService.getConsolidatedReportByIndicativeAndPrimaryAndFinalRating(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getConsolidatedReportByIndicativeAndPrimaryAndFinalRatingExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }
  getReportForStimulationForIncrement(ch)
  {
    if(this.selection.appraisalPlan){
    this.pasonaService.startSpinner();
    var data = {
      appraisalPlanId: this.selection.appraisalPlan,
   //   term:this.selection.term
    }
    if (ch == 'd') {
     this.pasonaService.getReportForStimulationForIncrement(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          this.reportData = resp.reportDetails;
          this.dataSource = new MatTableDataSource<any>(this.reportData);
          this.dataSource.paginator = this.paginator;  
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
    else {
      this.pasonaService.getReportForStimulationForIncrementExport(data).subscribe(resp => {
        this.pasonaService.stopSpinner();
        if (resp.status == '1') {
          window.open(resp.reportDetails);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      })
    }
  }
  else
  {
    this.pasonaService.infoMessage('Please select required fields');
  }
  }
  
}


