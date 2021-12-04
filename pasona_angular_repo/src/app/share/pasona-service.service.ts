import { Injectable, NgModule } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, take, takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Links } from './../link.module';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as CryptoJS from 'crypto-js';
import { InfoDialogComponent } from 'app/dialog/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//import { NgxUiLoaderDemoService } from './ngx-ui-loader-demo.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Auth': 'qwertyuiopasdfghjklzxcvbnm'
  })
};

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Auth': 'qwertyuiopasdfghjklzxcvbnm'
  })
};

@Injectable({
  providedIn: 'root'
})


export class PasonaServiceService {
  currLanguage: any;
  language = new BehaviorSubject('en');
  /*  setDecryptObject(value: any, encArray: string[]): any {
     throw new Error("Method not implemented.");
   } */
  //public toastr: ToastrService, private ngxService: NgxUiLoaderService//private spinner:Ng4LoadingSpinnerService
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  roleModule: any[] = [];
  protected _onDestroy = new Subject<void>();
  private dataSource = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('pasonaUserDetails')));
  public notificationCount = new BehaviorSubject<number>(0);
  notification = this.notificationCount.asObservable();
  data = this.dataSource.asObservable();
  dateFormat = 'dd/MM/yyyy hh:mm a';
  //dateFormat='yyyy/MM/dd hh:mm a';
  constructor(private http: HttpClient, private datePipe: DatePipe, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxUiLoaderService) { }

  getUserData() {
    return JSON.parse(sessionStorage.getItem('pasonaUserDetails'));
  }

  setStateData(data) {
    sessionStorage.setItem('whereUser', JSON.stringify(data));
  }

  getStateData() {
    return JSON.parse(sessionStorage.getItem('whereUser'));
  }

  setUserData(data) {
    sessionStorage.setItem('pasonaUserDetails', JSON.stringify(data));
  }

  setDateFormat(dateFormat) {
    this.dateFormat = dateFormat;
  }

  updatedDataSelection(data: any) {
    this.dataSource.next(data);
  }

  updatedNotification(data: any) {
    this.notificationCount.next(data);
  }

  addCompany(param) {
    return this.http.post(Links.COMPANYREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editCompany(param) {
    return this.http.post(Links.COMPANYEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllCompany(data) {
    return this.http.post(Links.GETALLCOMPANY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getCompanyById(id) {
    var data = { "companyId": id };
    return this.http.post(Links.GETCOMPANTBYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getCompanyType() {
    return this.http.get(Links.COMPANYTYPE, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllCountry() {
    return this.http.get(Links.GETALLCOUNTRY, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllStateByCountryId(id) {
    var f = new FormData();
    f.append("countryId", id);
    return this.http.post(Links.GETALLSTATEBYCOUNTRY, f, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllCityByState(id) {
    var formData = new FormData();
    formData.append("stateId", id);
    return this.http.post(Links.GETALLCITYBYSTATE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteCompanyById(id, pass) {
    var data = { "companyId": id, "password": pass };
    return this.http.post(Links.DELETECOMPANY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addUnit(param) {
    return this.http.post(Links.UNITREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editUnit(param) {
    return this.http.post(Links.UNITEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllUnit() {
    return this.http.get(Links.GETALLUNIT, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getUnitById(id) {
    var data = { "unitId": id };
    return this.http.post(Links.GETUNITBYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getUnitByCompanyId(id) {
    var data = { "companyId": id };
    return this.http.post(Links.GETUNITBYCOMPANYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteUnitById(id) {
    var data = { "unitId": id };
    return this.http.post(Links.DELETEUNIT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addEmpType(param) {
    return this.http.post(Links.EMPTYPEREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editEmpType(param) {
    return this.http.post(Links.EMPTYPEEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllEmpType() {
    return this.http.get(Links.GETEALLEMPTYE, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmpTypeById(id) {
    var formData = new FormData();
    formData.append("id", id);
    return this.http.post(Links.GETEMPTYPEBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getEmpTypeByUnitId(id) {
    var formData = new FormData();
    formData.append("unitId", id);
    return this.http.post(Links.GETEMPTYPEBYUNITID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getEmpTypeByCompanyId(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETEMPTYPEBYCOMPANYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteEmpTypeById(id) {
    var formData = new FormData();
    formData.append("id", id);
    return this.http.post(Links.DELETEEMPTYPE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addGroup(param) {
    return this.http.post(Links.GROUPREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editGroup(param) {
    return this.http.post(Links.GROUPEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllGroup() {
    return this.http.get(Links.GETALLGROUP, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getGroupById(id) {
    var formData = new FormData();
    formData.append("groupId", id);
    return this.http.post(Links.GETGROUPBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGroupByUnitId(id) {
    var formData = new FormData();
    formData.append("unitId", id);
    return this.http.post(Links.GETGROUPBYUNITID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGroupByCompanyId(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETGROUPBYCOMPANYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getRelativeGroupByCompanyId(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETRELATIVEGROUPBYCOMPANYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  submitRelativeGroup(params) {
    return this.http.post(Links.SUBMITRELATIVEGROUP, params, httpOptions)
      .pipe(map((response: any) => response));
  }
  getAllSavedRelativeGroupsByCompanyId(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETSAVERELATIVEGROUPBYCOMPANYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }
  getGroupByCompanyIdWithEmployee(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETGROUPBYCOMPANYIDWIHEMPLOYEE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteGroupById(id) {
    var formData = new FormData();
    formData.append("groupId", id);
    return this.http.post(Links.DELETEGROUP, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addAppraiserGroupSetting(param) {
    return this.http.post(Links.ADDAPPRAISERGROUPSETTING, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editAppraiserGroupSetting(param) {
    return this.http.post(Links.EDITAPPRAISERGROUPSETTING, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAppraiserGroupSettingById(id) {
    var formData = new FormData();
    formData.append("groupId", id);
    return this.http.post(Links.GETAPPRAISERGROUPSETTINGBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addRatingConfigurationSetting(param) {
    return this.http.post(Links.ADDRATINGCONFIGURATIONSETTING, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editRatingConfigurationSetting(param) {
    return this.http.post(Links.EDITRATINGCONFIGURATIONSETTING, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getRatingConfigurationSettingById(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETRATINGCONFIGURATIONSETTINGBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getRatingTypeById(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETRATINGTYPEBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }


  addDepartment(param) {
    return this.http.post(Links.DEPARTMENTREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editDepartment(param) {
    return this.http.post(Links.DEPARTMENTEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllDepartment() {
    return this.http.get(Links.GETALLDEPARTMENT, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getDepartmentById(id) {
    var data = { "depId": id };
    return this.http.post(Links.GETDEPARTMENTBYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getDepartmentByUnitId(id) {
    var data = { "unitId": id };
    return this.http.post(Links.GETDEPARTMENTBYUNITID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getDepartmentByUnitIdWithEmp(id) {
    var data = { "unitId": id };
    return this.http.post(Links.GETDEPARTMENTBYUNITIDWITHEMPLOYEE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getDepartmentByCompanyId(id) {
    var data = { "companyId": id };
    return this.http.post(Links.GETDEPARTMENTBYCOMPANYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteDepartmentById(id) {
    var data = { "depId": id };
    return this.http.post(Links.DELETEDEPARTMENT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addSection(param) {
    return this.http.post(Links.SECTIONREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editSection(param) {
    return this.http.post(Links.SECTIONEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllSection() {
    return this.http.get(Links.GETALLSECTION, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getSectionById(id) {
    var data = { "sectionId": id };
    return this.http.post(Links.GETSECTIONBYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteSectionById(id) {
    var data = { "sectionId": id };
    return this.http.post(Links.DELETESECTION, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getSectionByDepartmentId(id) {
    var data = { "depId": id };
    return this.http.post(Links.GETSECTIONBYDEPARTMENTID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getSectionByDepartmentIdWithEmployee(id) {
    var data = { "depId": id };
    return this.http.post(Links.GETSECTIONBYDEPARTMENTIDWITHEMPLOYEE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getSectionByCompanyId(id) {
    var data = { "companyId": id };
    return this.http.post(Links.GETSECTIONBYCOMPANYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getDashboardInformation(id) {
    var data = { "companyId": id };
    return this.http.post(Links.GETDASHBOARDINFOCOMPANY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getSectionByUnitId(id) {
    var data = { "unitId": id };
    return this.http.post(Links.GETSECTIONBYUNITID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getSectionByUnitIdWithEmployee(id) {
    var data = { "unitId": id };
    return this.http.post(Links.GETSECTIONBYUNITIDWITHEMPLOYEE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addEmployee(param) {
    return this.http.post(Links.EMPLOYEEREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  bulkUploadEmployee(data) {
    return this.http.post(Links.BULKUPLOADEMPLOYEEREGISTER, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  bulkFileDownload() {
    return this.http.get(Links.BULKUPLOADFILEDOWNLOAD, httpOptions)
      .pipe(map((response: any) => response));
  }

  editEmployee(param) {
    return this.http.post(Links.EMPLOYEEEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllEmployee() {
    return this.http.get(Links.GETALLEMPLOYEE, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmployeeById(id) {
    var data = { "id": id };
    return this.http.post(Links.GETEMPLOYEEBYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteEmployeeById(id) {
    var data = { "id": id };
    return this.http.post(Links.DELETEEMPLOYEE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmployeeByCompanyId(data) {
    return this.http.post(Links.GETEMPLOYEEBYCOMPANYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmployeeByCompanyIdWithoutPagination(id) {
    var data = { "companyId": id };
    return this.http.post(Links.GETEMPLOYEEBYCOMPANYIDWITHOUTPAGINATION, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmployeeByCompanyIdForObjecive(param) {
    return this.http.post(Links.GETEMPLOYEEWITHOBJECTIVE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getDepartmentByCompanyIdForObjecive(id) {
    var param = new FormData();
    param.append('companyId', id);
    return this.http.post(Links.GETDEPARTMENTWITHOBJECTIVE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getEmployeeByCompanyIdForObjeciveForUnit(id) {
    var param = new FormData();
    param.append('unitId', id);
    return this.http.post(Links.GETEMPLOYEEWITHOBJECTIVEFORUNIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getDepartmentByCompanyIdForObjeciveForUnit(id) {
    var param = new FormData();
    param.append('unitId', id);
    return this.http.post(Links.GETDEPARTMENTWITHOBJECTIVEFORUNIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getEmployeeByUnitId(data) {
    return this.http.post(Links.GETEMPLOYEEBYUNITID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  signIn(data) {
    var param = new FormData();
    param.append('userName', data.userName);
    param.append('password', data.password);
    param.append('companyId', data.companyId);
    return this.http.post(Links.LOGIN, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  changePassword(data) {
    return this.http.post(Links.CHANGEPASSWORD, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  forgotPassword(data) {
    return this.http.post(Links.FORGOTPASSWORD, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }


  getLogo(id) {
    var data = { "companyId": id };
    return this.http.post(Links.COMPANYLOGO, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllNationality() {
    return this.http.get(Links.GETALLNATIONALITY, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addGoals(param) {
    return this.http.post(Links.GOALSREGISTER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editGoals(param) {
    return this.http.post(Links.GOALSEDIT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllGoals() {
    return this.http.get(Links.GETALLGOALS, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getGoalsById(id) {
    var formData = new FormData();
    formData.append("comObjId", id);
    return this.http.post(Links.GETGOALSBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGoalsByCompanyId(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETGOALSBYCOMPANYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteGoalsById(id) {
    var formData = new FormData();
    formData.append("comObjId", id);
    return this.http.post(Links.DELETEGOALS, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addDepartmentGoals(param) {
    return this.http.post(Links.GOALSREGISTERDEPARTMENT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editDepartmentGoals(param) {
    return this.http.post(Links.GOALSEDITDEPARTMENT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllDepartmentGoals() {
    return this.http.get(Links.GETALLGOALSDEPARTMENT, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getDepartmentGoalsById(id) {
    var formData = new FormData();
    formData.append("depObjId", id);
    return this.http.post(Links.GETGOALSBYIDDEPARTMENT, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getDepartmentGoalsByDepId(id) {
    var formData = new FormData();
    formData.append("depId", id);
    return this.http.post(Links.GETALLGOALSDEPARTMENT, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteDepartmentGoalsById(id) {
    var formData = new FormData();
    formData.append("depObjId", id);
    return this.http.post(Links.DELETEGOALSDEPARTMENT, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addGoalsEmp(param) {
    return this.http.post(Links.GOALSREGISTEREMPLOYEE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  saveGoalsEmp(param) {
    return this.http.post(Links.GOALSSAVEEMPLOYEE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editGoalsEmp(param) {
    return this.http.post(Links.GOALSEDITEMPLOYEE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  addGoalsEffortsEmp(param) {
    return this.http.post(Links.GOALSEDITEFFORTEMPLOYEE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  addGoalsEffortsEmpEndterm(param) {
    return this.http.post(Links.GOALSEDITEFFORTEMPLOYEENDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }


  getAllGoalsEmp() {
    return this.http.get(Links.GETALLGOALSEMPLOYEE, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  saveRatingAppraiser(data) {
    return this.http.post(Links.APPROVERRATING, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  saveRatingAppraiserEndterm(data) {
    return this.http.post(Links.APPROVERRATINGENDTERM, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getRatingAppraiserEndTerm(data) {
    return this.http.post(Links.GETAPPROVERRATINGENDTERM, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getRatingAppraiser(data) {
    return this.http.post(Links.GETAPPROVERRATING, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGoalsByIdEmp(id) {
    var formData = new FormData();
    formData.append("empObjId", id);
    return this.http.post(Links.GETGOALSBYIDEMPLOYEE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGoalsByIdEmpAndAppraisalId(data) {
    return this.http.post(Links.GETGOALSBYIDEMPLOYEEANDAPPRAISALID, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getConsolidatorSheetForConsolidator(data) {
    return this.http.post(Links.GETCONSOLIDATORSHEETFORCONSOLIDATOR, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getFinalSheetForFinalApprover(data) {
    return this.http.post(Links.GETFINALAPPROVERSHEETFORFINALAPPROVER, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  submitConsolidatorShet(data) {
    return this.http.post(Links.SUBMITCONSOLIDATORSHEET, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  submitConsolidatorShetEndTerm(data) {
    return this.http.post(Links.SUBMITCONSOLIDATORSHEETENDTERM, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  submitFinalApproverSheet(data) {
    return this.http.post(Links.SUBMITFINALAPPROVERSHEET, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  submitFinalApproverSheetEndTerm(data) {
    return this.http.post(Links.SUBMITFINALAPPROVERSHEETENDTERM, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  setAppraisalPlanProcessDateObjective(data) {
    return this.http.post(Links.APPRAISALPLANPROCESSDATEOBJECTIVE, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  setAppraisalPlanProcessDateMidterm(data) {
    return this.http.post(Links.APPRAISALPLANPROCESSDATEMIDTERM, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  setAppraisalPlanProcessDateEvalution(data) {
    return this.http.post(Links.APPRAISALPLANPROCESSDATEEVALUTION, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGoalsByEmpId(formData) {
    return this.http.post(Links.GETGOALSBYEMPID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGroupConfigForObjective(id) {
    var formData = new FormData();
    formData.append("groupId", id);
    return this.http.post(Links.GETGROUPCONFIGFORADDOBJECTIVE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllGroupConfigForObjective(id) {
    var formData = new FormData();
    formData.append("groupId", id);
    return this.http.post(Links.GETALLGROUPCONFIGFORADDOBJECTIVE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteGoalsByIdEmp(id) {
    var formData = new FormData();
    formData.append("empObjId", id);
    return this.http.post(Links.DELETEGOALSEMPLOYEE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addRole(param) {
    return this.http.post(Links.ADDROLE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editRole(param) {
    return this.http.post(Links.EDITROLE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllRole(id) {
    var formData = new FormData();
    formData.append("companyId", id);
    return this.http.post(Links.GETALLROLE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getRoleById(id) {
    var formData = new FormData();
    formData.append("roleId", id);
    return this.http.post(Links.GETROLEBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteRole(id) {
    var formData = new FormData();
    formData.append("roleId", id);
    return this.http.post(Links.DELETEROLE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addAssignRole(param) {
    return this.http.post(Links.ADDASSIGNROLE, param, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  editAssignRole(param) {
    return this.http.post(Links.EDITROLE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAssignRole(data) {
    return this.http.post(Links.GETALLASSIGNROLE, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAssignRoleById(id) {
    var formData = new FormData();
    formData.append("empId", id);
    return this.http.post(Links.GETASSIGNROLEBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteAssignRole(id) {
    var formData = new FormData();
    formData.append("empId", id);
    return this.http.post(Links.DELETEASSIGNROLE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllJobTitles(data) {
    return this.http.post(Links.GETALLJOBTITLE, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  addJobTitles(param) {
    return this.http.post(Links.ADDJOBTITLE, param, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  editJobTitles(param) {
    return this.http.post(Links.EDITJOBTITLE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getJobTitlesById(id) {
    var formData = new FormData();
    formData.append("jobTitleId", id);
    return this.http.post(Links.GETJOBTITLEBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  deleteJobTitles(id) {
    var formData = new FormData();
    formData.append("jobTitleId", id);
    return this.http.post(Links.DELETEJOBTITLEROLE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getEmployeeByFilter(data) {
    return this.http.post(Links.GETEMPLOYEEBYFILTER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getRoleModule(moduleId) {
    var indexVal = this.roleModule.findIndex(record => record.moduleId == moduleId);
    if (indexVal != -1) {
      return this.roleModule[indexVal];
    }
    return null;
  }

  sendAlertToEmployee(param) {
    return this.http.post(Links.SENDALERTEMPLOYEE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToEmployeeReviseMidTerm(param) {
    return this.http.post(Links.REVISEOBJMIDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToEmployeeReviseEndTerm(param) {
    return this.http.post(Links.REVISEOBJENDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToEmployeeAcceptMidTerm(param) {
    return this.http.post(Links.ACCEPTOBJMIDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToEmployeeAcceptEndTerm(param) {
    return this.http.post(Links.ACCEPTOBJENDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  offlineMeetingHistory(param) {
    return this.http.post(Links.OFFLINEMEETINGHISTORY, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  offlineMeetingHistoryView(param) {
    return this.http.post(Links.OFFLINEMEETINGHISTORYBYEMPOBJID, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToAllAppraisee(param) {
    return this.http.post(Links.SENDALERTALLAPPRAISEE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToAppraiseeForRevise(param) {
    return this.http.post(Links.SENDALERTTOAPPRAISEEFORREVISE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  sendAlertToAppraiseeForComment(param) {
    return this.http.post(Links.SENDALERTTOAPPRAISEEFORCOMMENT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  AcceptAppraiseeObjective(param) {
    return this.http.post(Links.ACCEPTAPPRAISEEOBJECTIVE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  addAppraisalPlan(param) {
    return this.http.post(Links.ADDAPPRAISALPLAN, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  addAppraiser(param) {
    return this.http.post(Links.ADDAPPRAISER, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  editAppraisalPlan(param) {
    return this.http.post(Links.EDITAPPRAISALPLAN, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAppraiserReqired(id) {
    var formData = new FormData();
    formData.append("groupId", id);
    return this.http.post(Links.APPRAISERREQUIRED, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlan(data) {
    return this.http.post(Links.GETALLAPPRAISALPLAN, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlanForAppraiser(data) {
    return this.http.post(Links.GETALLAPPRAISALPLANFORAPPRAISER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlanForAppraisee(data) {
    return this.http.post(Links.GETALLAPPRAISALPLANFORAPPRAISEE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlanByCompanyId(data) {
    return this.http.post(Links.GETALLAPPRAISALPLANBYCOMPANYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  updateDeadLine(id, deadLine) {
    var data = { "deadLine": deadLine, "appraisalPlanId": id };
    return this.http.post(Links.UPDATEDEADLINE, data, httpOptions)
      .pipe(map((response: any) => response));
  }

  generateObjectiveReport(id) {
    var data = { "appraisalPlanId": id };
    return this.http.post(Links.GENERATEREPORTOFOBJECTIVE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  generateMidtermReport(id) {
    var data = { "appraisalPlanId": id };
    return this.http.post(Links.GENERATEREPORTOFMIDTERM, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  generateEndtermReport(id) {
    var data = { "appraisalPlanId": id };
    return this.http.post(Links.GENERATEREPORTOFENDTERM, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  generateFinalReport(id) {
    var data = { "appraisalPlanId": id };
    return this.http.post(Links.GENERATEFINALREPORTOFENDTERM, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllEmployeeParticipant(id, type) {
    var data = { "appraisalPlanDetailId": id, "type": type };
    return this.http.post(Links.GETPARTICIPANTBYPLANDETAILSID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraisalPlanById(id) {
    var formData = new FormData();
    formData.append("appraisalPlanId", id);
    return this.http.post(Links.GETAPPRAISALPLANBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisees(id) {
    var formData = new FormData();
    formData.append("empId", id);
    return this.http.post(Links.GETALLAPPRAISEES, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraiseesAccordingToPlan(data) {
    return this.http.post(Links.GETALLAPPRAISEESACCORDINGTOPLAN, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteAppraisalPlan(id) {
    var formData = new FormData();
    formData.append("appraisalPlanId", id);
    return this.http.post(Links.DELETEAPPRAISALPLAN, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  playPauseAppraisalPlan(id, status) {
    var data = {
      "appraisalPlanId": id,
      "planStatus": status
    }
    return this.http.post(Links.PLAYPAUSEAPPRAISALPLAN, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addAppraisalPlanParticipant(param) {
    return this.http.post(Links.ADDAPPRAISALPLANPARTICIPANT, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  startMidtermProcess(param) {
    return this.http.post(Links.STARTMIDTERMPROCESS, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  startEndtermProcess(param) {
    return this.http.post(Links.STARTENDTERMPROCESS, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  startConsolidatorProcess(param) {
    return this.http.post(Links.STARTCONSOLIDATORPROCESS, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  startConsolidatorProcessEndTerm(param) {
    return this.http.post(Links.STARTCONSOLIDATORPROCESSENDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  startFinalApproverProcess(param) {
    return this.http.post(Links.STARTFINALAPPROVERPROCESS, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  startFinalApproverProcessEndTerm(param) {
    return this.http.post(Links.STARTFINALAPPROVERPROCESSENDTERM, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlanParticipant(id) {
    var formData = new FormData();
    formData.append("appraisalPlanId", id);
    return this.http.post(Links.GETALLAPPRAISALPLANPARTICIPANT, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlanParticipantForMidTerm(id) {
    var formData = new FormData();
    formData.append("appraisalPlanId", id);
    return this.http.post(Links.GETALLAPPRAISALPLANPARTICIPANTFORMIDTERM, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalPlanParticipantForEndTerm(id) {
    var formData = new FormData();
    formData.append("appraisalPlanId", id);
    return this.http.post(Links.GETALLAPPRAISALPLANPARTICIPANTFORENDTERM, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllEmployeeWithFilterParticipant(data) {
    var formData = new FormData();
    formData.append("companyId", data.companyId);
    formData.append("depId", data.depId);
    formData.append("unitId", data.unitId);
    formData.append("sectionId", data.sectionId);
    formData.append("name", data.empName);
    return this.http.post(Links.EMPLOYEEFILTERPARTICIPANT, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  setObjectiveStatus(data) {
    return this.http.post(Links.SETOBJECTIVESTATUS, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  setMidtermProcessStatus(data) {
    return this.http.post(Links.SETMIDTERMPROCESS, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  addAppraisalParameter(data) {
    return this.http.post(Links.ADDAPPRAISALPARAMETER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  editAppraisalParameter(data) {
    return this.http.post(Links.EDITAPPRAISALPARAMETER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteAppraisalParameter(id) {
    var formData = new FormData();
    formData.append("appraisalParameterId", id);
    return this.http.post(Links.DELETEAPPRAISALPARAMETER, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllAppraisalParameter(data) {
    var formData = new FormData();
    formData.append("companyId", data);
    return this.http.post(Links.GETALLAPPRAISALPARAMETER, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAppraisalParameterById(id) {
    var formData = new FormData();
    formData.append("appraisalParameterId", id);
    return this.http.post(Links.GETAPPRAISALPARAMETERBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }


  addCompanyParameter(data) {
    return this.http.post(Links.ADDCOMPANYPARAMETER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  editCompanyParameter(data) {
    return this.http.post(Links.EDITCOMPANYPARAMETER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteCompanyParameter(id) {
    var formData = new FormData();
    formData.append("companyParameterId", id);
    return this.http.post(Links.DELETECOMPANYPARAMETER, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllCompanyParameter(data) {
    var formData = new FormData();
    formData.append("companyId", data);
    return this.http.post(Links.GETALLCOMPANYPARAMETER, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getCompanyParameterById(id) {
    var formData = new FormData();
    formData.append("companyParameterId", id);
    return this.http.post(Links.GETCOMPANYPARAMETERBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }


  addGradeCode(data) {
    return this.http.post(Links.ADDGRADECODE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  editGradeCode(data) {
    return this.http.post(Links.EDITGRADECODE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteGradeCode(id) {
    var formData = new FormData();
    formData.append("gradeCodeId", id);
    return this.http.post(Links.DELETEGRADECODE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllGradeCode(data) {
    var formData = new FormData();
    formData.append("companyId", data);
    return this.http.post(Links.GETALLGRADECODE, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGradeCodeById(id) {
    var formData = new FormData();
    formData.append("gradeCodeId", id);
    return this.http.post(Links.GETGRADECODEBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  addGradeCategory(data) {
    return this.http.post(Links.ADDGRADECATEGORY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  editGradeCategory(data) {
    return this.http.post(Links.EDITGRADECATEGORY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  deleteGradeCategory(id) {
    var formData = new FormData();
    formData.append("gradeId", id);
    return this.http.post(Links.DELETEGRADECATEGORY, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAllGradeCategory(data) {
    var formData = new FormData();
    formData.append("companyId", data);
    return this.http.post(Links.GETALLGRADECATEGORY, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getGradeCategoryById(id) {
    var formData = new FormData();
    formData.append("gradeId", id);
    return this.http.post(Links.GETGRADECATEGORYBYID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getNotificationByEmpId(data) {
    return this.http.post(Links.GETALLNOTIFICATIONBYEMPID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getNotificationCountByEmpId(param) {
    /*   var formData = new FormData();
      formData.append("empId", id); */
    return this.http.post(Links.GETALLNOTIFICATIONCOUNTBYEMPID, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  updateLanguageType(param) {
    /*   var formData = new FormData();
      formData.append("empId", id); */
    return this.http.post(Links.UPDATELANGUAGETYPE, param, httpOptions)
      .pipe(map((response: any) => response));
  }

  getCommentByEmpId(empObjId, empid) {
    var formData = new FormData();
    formData.append("empObjId", empObjId);
    formData.append("empId", empid);
    return this.http.post(Links.GETALLCOMMENTBYEMPID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getCommentByEmpObjId(empObjId, empid) {
    var formData = new FormData();
    formData.append("empObjId", empObjId);
    formData.append("empId", empid);
    return this.http.post(Links.GETALLCOMMENTBYEMPOBJID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getCommentCountByEmpId(id) {
    var formData = new FormData();
    formData.append("empObjId", id);
    return this.http.post(Links.GETALLCOMMENTCOUNTBYEMPID, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  changeCommentStatus(statusArray) {
    var data = {
      changeStatus: statusArray
    }
    return this.http.post(Links.CHANGECOMMENTSTATUS, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  changeNotificationStatus(statusArray) {
    var data = {
      changeStatus: statusArray
    }
    return this.http.post(Links.CHANGENOTIFICATIONSTATUS, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  toggleSelectAll(selectAllValue: boolean, filtervalue) {
    filtervalue.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        if (selectAllValue) {
          return val;
        } else {
          return [];
        }
      });
  }

  addEmployeeToGroup(data) {
    return this.http.post(Links.ADDEMPLOYEETOGROUP, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  editEmployeeToGroup(data) {
    return this.http.post(Links.EDITEMPLOYEETOGROUP, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  viewRatingHistory(data) {
    return this.http.post(Links.VIEWRATINGHISTORY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  viewRatingHistoryCompany(data) {
    return this.http.post(Links.VIEWRATINGHISTORYCOMPANY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  viewRatingHistoryCompetency(data) {
    return this.http.post(Links.VIEWRATINGHISTORYCOMPETENCY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  viewRatingHistoryPcompetency(data) {
    return this.http.post(Links.VIEWRATINGHISTORYPCOMPETENCY, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getGroupEmployeeDataById(id) {
    var formData = new FormData();
    formData.append('groupId', id)
    return this.http.post(Links.GETEMPLOYEEOFGROUP, formData, httpOptions)
      .pipe(map((response: any) => response));
  }

  getAppraisalGroupAndTotalScoreData(data) {
    return this.http.post(Links.APPRAISALGROUPANDTOTALSCOREREPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraisalGroupAndTotalScoreDataExport(data) {
    return this.http.post(Links.APPRAISALGROUPANDTOTALSCOREREPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeByGrade(data) {
    return this.http.post(Links.GETAPPRAISEEBYGRADEREPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeByGradeExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYGRADEREPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeByDeptAndGrade(data) {
    return this.http.post(Links.GETAPPRAISEEBYDEPTANDGRADEREPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeByDeptAndGradeExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYDEPTANDGRADEREPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByAppraiserAndTotalScore(data) {
    return this.http.post(Links.GETAPPRAISEEBYAPPRAISERANDTOTALSCORERPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeByAppraiserAndTotalScoreExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYAPPRAISERANDTOTALSCORERPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeDeptAndGroupAndTotalScore(data) {
    return this.http.post(Links.GETAPPRAISEEBYDEPTANDGROUPANDTOTALSCORERPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeDeptAndGroupAndTotalScoreExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYDEPTANDGROUPANDTOTALSCORERPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByGradeAndAppraiserRating(data) {
    return this.http.post(Links.GETAPPRAISEEBYGRADEANDAPPRAISERRATING, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByGradeAndAppraiserRatingExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYGRADEANDAPPRAISERRATINGEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByDeptGradeAndAppraiserRating(data) {
    return this.http.post(Links.GETAPPRAISEEBYDEPTGRADEANDAPPRAISERRATING, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByDeptGradeAndAppraiserRatingExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYDEPTGRADEANDAPPRAISERRATINGEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByStatusOfObjectiveSetting(data) {
    return this.http.post(Links.GETAPPRAISEEBYSTATUSOFOBJ, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByStatusOfObjectiveSettingExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYSTATUSOFOBJEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiserByStatusAndOther(data) {
    return this.http.post(Links.GETAPPRAISERBYSTATUSANDOTHER, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiserByStatusAndOtherExport(data) {
    return this.http.post(Links.GETAPPRAISERBYSTATUSANDOTHEREXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeObjectiveByDept(data) {
    return this.http.post(Links.GETAPPRAISEEOBJECTIVEBYDEPT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeObjectiveByDeptExport(data) {
    return this.http.post(Links.GETAPPRAISEEOBJECTIVEBYDEPTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiseeObjectiveById(data) {
    return this.http.post(Links.GETAPPRAISEEOBJECTIVEBYID, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeObjectiveByIdExport(data) {
    return this.http.post(Links.GETAPPRAISEEOBJECTIVEBYIDEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getModerationReportForFinalEval(data) {
    return this.http.post(Links.GETMODERATIONREPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getModerationReportForFinalEvalExport(data) {
    return this.http.post(Links.GETMODERATIONREPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmployeeListWithTrainingNeeds(data) {
    return this.http.post(Links.GETEMPLOYEELISTWITHTRAININGNEEDS, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getEmployeeListWithTrainingNeedsExport(data) {
    return this.http.post(Links.GETEMPLOYEELISTWITHTRAININGNEEDSEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByStatusAndTerm(data) {
    return this.http.post(Links.GETAPPRAISEEBYSTATUSANDTERM, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiseeByStatusAndTermExport(data) {
    return this.http.post(Links.GETAPPRAISEEBYSTATUSANDTERMEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAppraiserByDeptAppType(data) {
    return this.http.post(Links.GETAPPRAISERBYDEPTAPPTYPE, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getAppraiserByDeptAppTypeExport(data) {
    return this.http.post(Links.GETAPPRAISERBYDEPTAPPTYPEEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getConsolidatedReportByIndicativeAndPrimaryRating(data) {
    return this.http.post(Links.GETCONSOLIDATEDREPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getConsolidatedReportByIndicativeAndPrimaryRatingExport(data) {
    return this.http.post(Links.GETCONSOLIDATEDREPORTEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getConsolidatedReportByIndicativeAndPrimaryAndFinalRating(data) {
    return this.http.post(Links.GETCONSOLIDATEDREPORTWITHFINALRATING, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getConsolidatedReportByIndicativeAndPrimaryAndFinalRatingExport(data) {
    return this.http.post(Links.GETCONSOLIDATEDREPORTWITHFINALRATINGEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getReportForStimulationForIncrement(data) {
    return this.http.post(Links.GETREPORTFORSTIMULATION, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }
  getReportForStimulationForIncrementExport(data) {
    return this.http.post(Links.GETREPORTFORSTIMULATIONEXPORT, data, httpOptionsJson)
      .pipe(map((response: any) => response));
  }

  getAllAppraiser(id, planId) {
    var formData = new FormData();
    formData.append('appraisalPlanId', planId);
    return this.http.post(Links.GETAPPRAISER, formData, httpOptions)
      .pipe(map((response: any) => response));
  }
  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  public setInitialValue(filtervalue, multiSelect) {
    filtervalue.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        return multiSelect.compareWith = (a, b) => a && b && a.id === b.id;
      });
  }

  public filterSearchSelectData(data, searchval, filteredData) {
    if (!data) {
      return;
    }
    // get the search keyword
    let search = searchval.value;
    if (!search) {
      filteredData.next(data.slice());
      return filteredData;
    } else {
      search = search.toLowerCase();
    }
    // filter the name
    filteredData.next(
      data.filter(d => this.getDecrypt(d.empCode).toLowerCase().indexOf(search) > -1)
    );
    return filteredData;
  }

  startSpinner() {
    this.spinner.start();
  }

  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['green-snackbar']
    });
  }

  openSnackBarError(message) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar']
    });
  }

  stopSpinner() {
    this.spinner.stop();
  }

  getMonth() {
    var monthData = [{ id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' }, { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' }, { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' }, { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' }];
    return monthData;
  }

  getYear() {
    var yearData = [];
    var date = new Date();
    for (var i = date.getFullYear(); i <= date.getFullYear() + 50; i++) {
      yearData.push(i);
    }
    return yearData;
  }

  setRoleModule(role) {
    this.roleModule = role[0].children;
  }

  convertDateAndTimeTOTimestamp(date) {
    if (date) {
      var currentdate = new Date();
      var date1 = new Date(date);
      var datetime = "Last Sync: " + (date1.getMonth() + 1) + "/"
        + date1.getDate() + "/"
        + date1.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
      let datetime1 = new Date(datetime);
      var date2 = datetime1.getTime();
      return date2;
    }
    return '';
  }

  convertDateTOTimestamp(date) {

    if (date) {
      var date1 = new Date(date);
      var date2 = date1.getTime();
      return date2;
    }
    return '';
  }
  convertDateTOTimestampOrEndDate(date, endDate) {
    if (date) {
      var date1 = new Date(date);
      var date2 = date1.getTime();
      return date2;
    }
    return endDate;
  }

  convertTimeStampToString(myDate) {
    if (myDate)
      return this.datePipe.transform(myDate, 'yyyy-MM-dd');
    else
      return '';
  }

  changeDateFormat(myDate) {
    if (myDate)
      return this.datePipe.transform(myDate, 'yyyy-MM-dd');
    else
      return '';
  }

  /* information show dialog */
  infoMessage(msg) {
    const dialogAp = this.dialog.open(InfoDialogComponent, {
      width: '30vw',
      disableClose: true,
      data: { data: msg }
    });
    dialogAp.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  //The set method is use for encrypt the value.
  setEncrypt(valueEnc) {
    let value = valueEnc;
    if (value) {
      var keys = '0uKyf#t2#bw)*fB@';
      var ivstr = "ADVANTALPASONAAM";
      var key = CryptoJS.enc.Utf8.parse(keys);
      //var iv = CryptoJS.enc.Utf8.parse(keys);
      var iv = CryptoJS.enc.Utf8.parse(ivstr);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
        {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });

      return encrypted.toString();
    }
    return value;
  }

  //The get method is use for decrypt the value.
  getDecrypt(value) {
    if (value) {
      var keys = '0uKyf#t2#bw)*fB@';
      var ivstr = "ADVANTALPASONAAM";
      var key = CryptoJS.enc.Utf8.parse(keys);
      var iv = CryptoJS.enc.Utf8.parse(ivstr);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      try {
        if (!decrypted.toString(CryptoJS.enc.Utf8)) {
          return value;
        }
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
      catch (e) {
        return value;
      }
    }
    return value;
  }

  //The set method is use for encrypt the object.
  setEncryptObject(objectEnc: object, encPara: Array<any>) {
    var count = 0;
    let object = Object.assign({}, objectEnc);
    for (const key in object) {
      var ind = encPara.indexOf(key);
      if (ind != -1) {
        count++;
        if (object[key] != '' && object[key] != null && object[key] != undefined) {
          object[key] = this.setEncrypt(object[key]);
        }
        if (count == encPara.length) {
          break;
        }
      }
    }
    return object;
  }

  setEncryptArray(arrayDataEnc: Array<any>, encPara: Array<any>) {
    const arrayData = [...arrayDataEnc];
    arrayData.forEach(object => {
      var count = 0;
      for (const key in object) {
        var ind = encPara.indexOf(key);
        if (ind != -1) {
          count++;
          if (object[key] != '' && object[key] != null && object[key] != undefined) {
            object[key] = this.setEncrypt(object[key]);
          }
          if (count == encPara.length) {
            break;
          }
        }
      }
    });
    return arrayData;
  }
  //The set method is use for decrypt the object.
  getDecryptObject(object: object, decPara: Array<any>) {
    var count = 0;
    for (const key in object) {
      var ind = decPara.indexOf(key);
      if (ind != -1) {
        count++;
        if (object[key] != '' && object[key] != null && object[key] != undefined) {
          object[key] = this.getDecrypt(object[key]);
        }
        if (count == decPara.length) {
          break;
        }
      }
    }
    return object;
  }

  getdecryptArray(arrayData: Array<any>, decPara: Array<any>) {
    arrayData.forEach(object => {
      var count = 0;
      for (const key in object) {
        var ind = decPara.indexOf(key);
        if (ind != -1) {
          count++;
          if (object[key] != '' && object[key] != null && object[key] != undefined) {
            object[key] = this.getDecrypt(object[key]);
          }
          if (count == decPara.length) {
            break;
          }
        }
      }
    });
    return arrayData;
  }

  setLanguage(lang) {
    this.currLanguage = lang;
  }
  getLanguage() {
    return this.currLanguage;
  }
}
