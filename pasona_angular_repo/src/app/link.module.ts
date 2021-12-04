export class Links {
  // public static baseUrl = "https://pasona-pride.in/pasona/api";
  public static baseUrl = "http://localhost:8080/api";

  public static LOGOUT = Links.baseUrl + '/auth/logout';
  public static LOGIN = Links.baseUrl + '/userLogin/userLogin';
  public static CHANGEPASSWORD = Links.baseUrl + '/userLogin/resetPassword';
  public static FORGOTPASSWORD = Links.baseUrl + '/userLogin/forgotPassword';
  public static COMPANYLOGO = Links.baseUrl + '/company/getCompanyLogoById';


  public static GETALLCOUNTRY = Links.baseUrl + '/country/getAllCountries';
  public static GETALLSTATEBYCOUNTRY = Links.baseUrl + '/state/getAllStateByCountry';
  public static GETALLCITYBYSTATE = Links.baseUrl + '/city/getAllCitiesByState';


  public static COMPANYREGISTER = Links.baseUrl + '/company/companyRegister';
  public static COMPANYEDIT = Links.baseUrl + '/company/editCompanyDetails';
  public static GETALLCOMPANY = Links.baseUrl + '/company/getAllCompanies';
  public static GETCOMPANTBYID = Links.baseUrl + '/company/getCompanyByCompanyId';
  public static DELETECOMPANY = Links.baseUrl + '/company/deleteCompanyById';
  public static COMPANYTYPE = Links.baseUrl + '/type/getCompanyType';

  public static UNITREGISTER = Links.baseUrl + '/unit/unitRegister';
  public static UNITEDIT = Links.baseUrl + '/unit/editUnitDetails';
  public static GETALLUNIT = Links.baseUrl + '/unit/getAllUnit';
  public static GETUNITBYID = Links.baseUrl + '/unit/getUnitById';
  public static DELETEUNIT = Links.baseUrl + '/unit/deleteUnitById';
  public static GETUNITBYCOMPANYID = Links.baseUrl + '/unit/getAllUnitsByCompanyId';


  public static DEPARTMENTREGISTER = Links.baseUrl + '/department/departmentRegister';
  public static DEPARTMENTEDIT = Links.baseUrl + '/department/editDepartmentDetails';
  public static GETALLDEPARTMENT = Links.baseUrl + '/department/getAllDepartment';
  public static GETDEPARTMENTBYID = Links.baseUrl + '/department/getDepartmentById';
  public static DELETEDEPARTMENT = Links.baseUrl + '/department/deleteDepartmentById';
  public static GETDEPARTMENTBYUNITID = Links.baseUrl + '/department/getAllDepartmentByUnitId';
  public static GETDEPARTMENTBYCOMPANYID = Links.baseUrl + '/department/getAllDepartmentByCompanyId';


  public static GROUPREGISTER = Links.baseUrl + '/group/addGroup';
  public static GROUPEDIT = Links.baseUrl + '/group/updateGroup';
  public static GETALLGROUP = Links.baseUrl + '/group/getAllGroup';
  public static GETGROUPBYID = Links.baseUrl + '/group/getGroupById';
  public static DELETEGROUP = Links.baseUrl + '/group/deleteGroupById';
  public static GETGROUPBYUNITID = Links.baseUrl + '/group/getGroupByUnitId';
  public static GETGROUPBYCOMPANYID = Links.baseUrl + '/group/getGroupByCompanyId';
  public static ADDAPPRAISERGROUPSETTING = Links.baseUrl + '/group/addAppraisalGroupConfiguration';
  public static EDITAPPRAISERGROUPSETTING = Links.baseUrl + '/group/ADD';
  public static GETAPPRAISERGROUPSETTINGBYID = Links.baseUrl + '/group/getAppraisalGroupConfigurationById';


  public static ADDRATINGCONFIGURATIONSETTING = Links.baseUrl + '/rating/addRating';
  public static EDITRATINGCONFIGURATIONSETTING = Links.baseUrl + '/rating/ADD';
  public static GETRATINGCONFIGURATIONSETTINGBYID = Links.baseUrl + '/rating/getRatingDetailsByCompanyId';
  public static GETRATINGTYPEBYID = Links.baseUrl + '/rating/getRatingDetailsForReviewByCompanyId';

  public static GOALSREGISTER = Links.baseUrl + '/companyObjective/addCompanyObjective';
  public static GOALSEDIT = Links.baseUrl + '/companyObjective/updateCompanyObjective';
  public static GETALLGOALS = Links.baseUrl + '/companyObjective/getAllGroup';
  public static GETGOALSBYID = Links.baseUrl + '/companyObjective/getCompanyObjectiveById';
  public static DELETEGOALS = Links.baseUrl + '/companyObjective/deleteCompanyObjectiveById';
  public static GETGOALSBYCOMPANYID = Links.baseUrl + '/companyObjective/getAllObjectiveByCompanyId';

  public static GOALSREGISTERDEPARTMENT = Links.baseUrl + '/depObjective/addDepartmentObjective';
  public static GOALSEDITDEPARTMENT = Links.baseUrl + '/depObjective/updateDepartmentObjective';
  public static GETALLGOALSDEPARTMENT = Links.baseUrl + '/depObjective/getAllDepObjectiveByDepId';
  public static GETGOALSBYIDDEPARTMENT = Links.baseUrl + '/depObjective/getDepartmentObjectiveById';
  public static DELETEGOALSDEPARTMENT = Links.baseUrl + '/depObjective/deleteDepObjectiveById';
  public static GETGOALSBYDEPARTMENTID = Links.baseUrl + '/depObjective/getDepartmentObjectiveByDepId';
  public static GOALSREGISTEREMPLOYEE = Links.baseUrl + '/empObjective/addEmployeeObjective';
  public static GOALSSAVEEMPLOYEE = Links.baseUrl + '/empObjective/saveEmployeeObjective';
  public static GETGOALSBYIDEMPLOYEEANDAPPRAISALID = Links.baseUrl + '/empObjective/getEmployeeObjectiveByEmpIdAndAppraisalPlanId';

  public static GOALSEDITEMPLOYEE = Links.baseUrl + '/empObjective/updateEmployeeObjective';
  public static GOALSEDITEFFORTEMPLOYEE = Links.baseUrl + '/empObjective/addEmployeeObjectiveMidTermProgress';
  public static GETALLGOALSEMPLOYEE = Links.baseUrl + '/empObjective/getAllGroup';
  public static GETGOALSBYIDEMPLOYEE = Links.baseUrl + '/empObjective/getEmployeeObjectiveById';
  public static DELETEGOALSEMPLOYEE = Links.baseUrl + '/empObjective/deleteEmployeeObjectiveById';
  public static GETGOALSBYEMPID = Links.baseUrl + '/empObjective/getAllObjectiveByEmpId';
  public static GETGOALSBYCOMPANYIDEMPLOYEE = Links.baseUrl + '/companyObjective/getAllObjectiveByCompanyId';

  public static EMPTYPEREGISTER = Links.baseUrl + '/employmentType/addEmpType';
  public static EMPTYPEEDIT = Links.baseUrl + '/employmentType/updateEmpTypeById';
  public static GETEALLEMPTYE = Links.baseUrl + '/employmentType/getAllEmpType';
  public static GETEMPTYPEBYID = Links.baseUrl + '/employmentType/getEmpTypeById';
  public static DELETEEMPTYPE = Links.baseUrl + '/employmentType/deleteEmpTypeById';
  public static GETEMPTYPEBYUNITID = Links.baseUrl + '/employmentType/getEmpTypeByUnitId';
  public static GETEMPTYPEBYCOMPANYID = Links.baseUrl + '/employmentType/getEmpTypeByCompanyId';

  public static SECTIONREGISTER = Links.baseUrl + '/section/sectionRegister';
  public static SECTIONEDIT = Links.baseUrl + '/section/editSectionDetails';
  public static GETALLSECTION = Links.baseUrl + '/section/getAllSection';
  public static GETSECTIONBYID = Links.baseUrl + '/section/getSectionById';
  public static DELETESECTION = Links.baseUrl + '/section/deleteSectionById';
  public static GETSECTIONBYDEPARTMENTID = Links.baseUrl + '/section/getAllSectionByDepartmentId';
  public static GETSECTIONBYCOMPANYID = Links.baseUrl + '/section/getAllSectionByCompanyId';
  public static GETSECTIONBYUNITID = Links.baseUrl + '/section/getAllSectionByUnitId';


  public static EMPLOYEEREGISTER = Links.baseUrl + '/employee/employeeRegister';
  public static BULKUPLOADEMPLOYEEREGISTER = Links.baseUrl + '/employee/bulkUpload';
  public static BULKUPLOADFILEDOWNLOAD = Links.baseUrl + '/employee/employeeRegister';
  public static EMPLOYEEEDIT = Links.baseUrl + '/employee/editEmployeeById';
  public static GETALLEMPLOYEE = Links.baseUrl + '/employee/getAllEmployee';
  public static GETEMPLOYEEBYID = Links.baseUrl + '/employee/getEmployeeById';
  public static DELETEEMPLOYEE = Links.baseUrl + '/employee/deleteEmp';
  public static GETEMPLOYEEBYCOMPANYID = Links.baseUrl + '/employee/getAllEmployeeByCompanyId';
  public static GETEMPLOYEEBYCOMPANYIDWITHOUTPAGINATION = Links.baseUrl + '/employee/getAllEmployeeForDropDownByCompanyId';
  public static GETEMPLOYEEBYUNITID = Links.baseUrl + '/employee/getAllEmployeeByUnitId';
  public static GETALLNATIONALITY = Links.baseUrl + '/nationality/getAllNationality';


  public static ADDROLE = Links.baseUrl + '/roles/addRole';
  public static EDITROLE = Links.baseUrl + '/roles/updateRole';
  public static GETALLROLE = Links.baseUrl + '/roles/getAllRolesByCompanyId';
  public static GETROLEBYID = Links.baseUrl + '/roles/getRoleById';
  public static DELETEROLE = Links.baseUrl + '/roles/deleteRoleById';


  public static ADDASSIGNROLE = Links.baseUrl + '/roles/assignRole';
  public static EDITASSIGNROLE = Links.baseUrl + '/roles/updateAssignRole';
  public static GETALLASSIGNROLE = Links.baseUrl + '/roles/getAllEmployeesWithRoles';
  public static GETASSIGNROLEBYID = Links.baseUrl + '/roles/getEmpWithRole';
  public static DELETEASSIGNROLE = Links.baseUrl + '/roles/removeFromRole';
  public static GETEMPLOYEEBYFILTER = Links.baseUrl + '/roles/getAllEmployeesWithFilter';


  public static ADDJOBTITLE = Links.baseUrl + '/jobTitle/addNewJobTitle';
  public static EDITJOBTITLE = Links.baseUrl + '/jobTitle/updateJobTitleById';
  public static GETALLJOBTITLE = Links.baseUrl + '/jobTitle/getAllJobTitleByCompanyId';
  public static GETJOBTITLEBYID = Links.baseUrl + '/jobTitle/getJobTitleById';
  public static DELETEJOBTITLEROLE = Links.baseUrl + '/jobTitle/deleteJobTitleById';


  public static GETEMPLOYEEWITHOBJECTIVE = Links.baseUrl + '/empObjective/getAllEmployeesWithObj';
  public static GETDEPARTMENTWITHOBJECTIVE = Links.baseUrl + '/depObjective/getAllDepWithObjective';
  public static GETEMPLOYEEWITHOBJECTIVEFORUNIT = Links.baseUrl + '/empObjective/getUnitAllEmployeesWithObj';
  public static GETDEPARTMENTWITHOBJECTIVEFORUNIT = Links.baseUrl + '/depObjective/getUnitAllDepWithObjective';


  public static ADDAPPRAISALPLAN = Links.baseUrl + '/appraisalPlan/addAppraisalPlan';
  public static EDITAPPRAISALPLAN = Links.baseUrl + '/appraisalPlan/updateAppraisalPlan';
  public static GETALLAPPRAISALPLAN = Links.baseUrl + '/appraisalPlan/getAllAppraisalPlanWithEmpId';
  public static GETALLAPPRAISALPLANFORAPPRAISER = Links.baseUrl + '/appraisalPlan/getAppraisalPlanForAppraiser';
  public static GETALLAPPRAISALPLANFORAPPRAISEE = Links.baseUrl + '/appraisalPlan/getAppraisalPlanForAppraisee';
  public static GETAPPRAISALPLANBYID = Links.baseUrl + '/appraisalPlan/getAppraisalPlanWithAppraisalPlanId';
  public static DELETEAPPRAISALPLAN = Links.baseUrl + '/appraisalPlan/deleteAppraisalPlanWithAppraisalPlanId';
  public static SETOBJECTIVESTATUS = Links.baseUrl + '/appraisalPlan/setObjectiveStatus';
  public static SETMIDTERMPROCESS = Links.baseUrl + '/appraisalPlan//setMidTermReviewStatus';
  public static ADDAPPRAISALPLANPARTICIPANT = Links.baseUrl + '/appraisalPlan/addAppraisalPlanParticipants';
  public static EDITAPPRAISALPLANPARTICIPANT = Links.baseUrl + '/appraisalPlan/addAppraisalPlanParticipants';
  public static GETALLAPPRAISALPLANPARTICIPANT = Links.baseUrl + '/appraisalPlan/getAppraisalPlanParticipant';
  public static GETALLAPPRAISALPLANPARTICIPANTFORMIDTERM = Links.baseUrl + '/appraisalPlan/getAppraisalPlanParticipantForMidTerm';
  public static GETAPPRAISALPLANBYIDPARTICIPANT = Links.baseUrl + '/appraisalPlan/getAppraisalPlanWithAppraisalPlanId';
  public static DELETEAPPRAISALPLANPARTICIPANT = Links.baseUrl + '/appraisalPlan/deleteAppraisalPlanWithAppraisalPlanId';


  public static EMPLOYEEFILTERPARTICIPANT = Links.baseUrl + '/appraisalPlan/getEmployeeListForAppraisalPlan';
  public static GETPARTICIPANTBYPLANDETAILSID = Links.baseUrl + '/appraisalPlan/getParticipantByAppraisalPlanDetailId';
  public static UPDATEDEADLINE = Links.baseUrl + '/appraisalPlan/updateDeadLine';
  public static PLAYPAUSEAPPRAISALPLAN = Links.baseUrl + '/appraisalPlan/updateAppraisalPlanStatus';
  public static SENDALERTEMPLOYEE = Links.baseUrl + '/appraisalPlan/sendAlertSetObjective';
  public static SENDALERTALLAPPRAISEE = Links.baseUrl + '/appraisalPlan/sendAlertToAllParticipant';

  public static GETALLAPPRAISEES = Links.baseUrl + '/employee/getAllAppraiseeByEmpId';
  public static GETALLAPPRAISEESACCORDINGTOPLAN = Links.baseUrl + '/appraisalPlan/getAppraisersAppraiseeByAppraisalPlanId';
  public static GETDEPARTMENTBYUNITIDWITHEMPLOYEE = Links.baseUrl + '/department/getAllDepartmentWithEmployeeByUnitId';
  public static GETGROUPBYCOMPANYIDWIHEMPLOYEE = Links.baseUrl + '/group/getGroupWithEmployeeByCompanyId';
  public static GETSECTIONBYUNITIDWITHEMPLOYEE = Links.baseUrl + '/section/getAllSectionWithEmployeeByUnitId';
  public static GETSECTIONBYDEPARTMENTIDWITHEMPLOYEE = Links.baseUrl + '/section/getAllSectionWithEmployeeByDepartmentId';


  public static GETALLAPPRAISALPARAMETER = Links.baseUrl + '/appraisalParameter/getAllAppraisalParameterByCompanyId';
  public static ADDAPPRAISALPARAMETER = Links.baseUrl + '/appraisalParameter/addAppraisalParameter';
  public static EDITAPPRAISALPARAMETER = Links.baseUrl + '/appraisalParameter/updateAppraisalParameter';
  public static GETAPPRAISALPARAMETERBYID = Links.baseUrl + '/appraisalParameter/getAppraisalParameterById';
  public static DELETEAPPRAISALPARAMETER = Links.baseUrl + '/appraisalParameter/deleteAppraisalParameterById';

  public static GETALLCOMPANYPARAMETER = Links.baseUrl + '/companyParameter/getAllCompanyParameterGroupById';
  public static ADDCOMPANYPARAMETER = Links.baseUrl + '/companyParameter/addCompanyParameterGroup';
  public static EDITCOMPANYPARAMETER = Links.baseUrl + '/companyParameter/updateCompanyParameterGroup';
  public static GETCOMPANYPARAMETERBYID = Links.baseUrl + '/companyParameter/getCompanyParameterGroupById';
  public static DELETECOMPANYPARAMETER = Links.baseUrl + '/companyParameter/deleteCompanyParameterGroupById';

  public static ADDAPPRAISER = Links.baseUrl + '/appraisalPlan/addApprasers';
  public static SENDALERTTOAPPRAISEEFORREVISE = Links.baseUrl + '/empObjective/reviseEmployeeObjective';
  public static SENDALERTTOAPPRAISEEFORCOMMENT = Links.baseUrl + '/empObjective/addEmployeeObjectiveComment';
  public static ACCEPTAPPRAISEEOBJECTIVE = Links.baseUrl + '/empObjective/approveEmployeeObjective';


  public static GETALLNOTIFICATIONBYEMPID = Links.baseUrl + '/notification/getAllNotificationByEmpId';
  public static GETALLNOTIFICATIONCOUNTBYEMPID = Links.baseUrl + '/notification/getNotificationCountByEmpId';
  public static CHANGENOTIFICATIONSTATUS = Links.baseUrl + '/notification/changeNotificationStatus';

  public static GETALLCOMMENTCOUNTBYEMPID = Links.baseUrl + '/comment/getCommentCountByEmpObjId';
  public static GETALLCOMMENTBYEMPID = Links.baseUrl + '/comment/getAllCommentByEmpId';
  public static GETALLCOMMENTBYEMPOBJID = Links.baseUrl + '/comment/getAllCommentByEmpObjId';
  public static CHANGECOMMENTSTATUS = Links.baseUrl + '/comment/updateCommentStatusByCommentId';

  public static GENERATEREPORTOFOBJECTIVE = Links.baseUrl + '/appraisalPlan/generateEmployeeObjectivesExcelByAppraisalPlanId';
  public static GENERATEREPORTOFMIDTERM = Links.baseUrl + '/appraisalPlan/generateEmployeeMidTermExcelByAppraisalPlanId';

  public static STARTMIDTERMPROCESS = Links.baseUrl + '/appraisalPlan/startMidTermEvaluation';

  public static ACCEPTOBJMIDTERM = Links.baseUrl + '/empObjective/approveEmployeeMidTermReview';
  public static REVISEOBJMIDTERM = Links.baseUrl + '/empObjective/reviseEmployeeMidTermProgress';

  public static OFFLINEMEETINGHISTORY = Links.baseUrl + '/offlineMeeting/getAllOfflineMeetingDetailsByAppraiserId';
  public static OFFLINEMEETINGHISTORYBYEMPOBJID = Links.baseUrl + '/offlineMeeting/getAllOfflineMeetingDetailsByEmpObjId';

  public static ADDEMPLOYEETOGROUP = Links.baseUrl + '/group/addEmployeesToGroup';
  public static EDITEMPLOYEETOGROUP = Links.baseUrl + '/group/updateGroupEmployees';
  public static GETEMPLOYEEOFGROUP = Links.baseUrl + '/group/getEmployeeIdsByGroupId';


  public static APPRAISALPLANPROCESSDATEOBJECTIVE = Links.baseUrl + '/appraisalPlan/addAppraisalPlanSetObjectiveProcessDate';
  public static APPRAISALPLANPROCESSDATEMIDTERM = Links.baseUrl + '/appraisalPlan/addAppraisalPlanMidTermProcessDate';
  public static APPRAISALPLANPROCESSDATEEVALUTION = Links.baseUrl + '/appraisalPlan/addAppraisalPlanEndTermProcessDate';

  public static APPROVERRATING = Links.baseUrl + '/midTerm/saveEmployeeObjectiveMidTermEvaluation';
  public static GETAPPROVERRATING = Links.baseUrl + '/midTerm/getAppraisersSavedMidTermEvaluationById';
  public static VIEWRATINGHISTORY = Links.baseUrl + '/midTerm/getAllAppraisersMidTermEvaluationById';

  public static VIEWRATINGHISTORYCOMPANY = Links.baseUrl + '/midTerm/getAllAppraisersCompanyEvaluationById';
  public static VIEWRATINGHISTORYCOMPETENCY = Links.baseUrl + '/midTerm/getAllAppraisersCompetencyEvaluationById';
  public static VIEWRATINGHISTORYPCOMPETENCY = Links.baseUrl + '/midTerm/getAllAppraisersMidTermPersonalCompetencyEvaluationById';

  public static APPRAISERREQUIRED = Links.baseUrl + '/group/getNoOfAppraiserByGroupById';
  public static GETGROUPCONFIGFORADDOBJECTIVE = Links.baseUrl + '/group/getAppraisalGroupDefaultCompetencyByGroupId';
  public static GETALLGROUPCONFIGFORADDOBJECTIVE = Links.baseUrl + '/group/getAppraisalGroupConfigurationForViewById';

  public static GETCONSOLIDATORSHEETFORCONSOLIDATOR = Links.baseUrl + '/appraisalPlan/getConsolidatorsAppraiseeByAppraisalPlanId';
  public static STARTCONSOLIDATORPROCESS = Links.baseUrl + '/appraisalPlan/genetereMidTermRatingResult';
  public static GETALLAPPRAISALPLANBYCOMPANYID = Links.baseUrl + '/appraisalPlan/getAllAppraisalPlanWithCompanyId';
  public static SUBMITCONSOLIDATORSHEET = Links.baseUrl + '/midTerm/addRatingConsolidatorInputForMidTerm';

  public static STARTFINALAPPROVERPROCESS = Links.baseUrl + '/appraisalPlan/genetereMidTermPrimaryRatingResult';
  public static GETFINALAPPROVERSHEETFORFINALAPPROVER = Links.baseUrl + '/appraisalPlan/getFinalApproverAppraiseeByAppraisalPlanId';
  public static SUBMITFINALAPPROVERSHEET = Links.baseUrl + '/midTerm/addFinalApproverInputForMidTerm';

  public static STARTENDTERMPROCESS = Links.baseUrl + '/appraisalPlan/startEndTermEvaluation';
  public static GETALLAPPRAISALPLANPARTICIPANTFORENDTERM = Links.baseUrl + '/appraisalPlan/getAppraisalPlanParticipantForEndTerm';
  public static GOALSEDITEFFORTEMPLOYEENDTERM = Links.baseUrl + '/empObjective/addEmployeeObjectiveEndTermProgress';
  public static APPROVERRATINGENDTERM = Links.baseUrl + '/midTerm/saveEmployeeObjectiveEndTermEvaluation';
  public static GETAPPROVERRATINGENDTERM = Links.baseUrl + '/midTerm/getAppraisersSavedEndTermEvaluationById';

  public static ACCEPTOBJENDTERM = Links.baseUrl + '/empObjective/approveEmployeeEndTermReview';
  public static REVISEOBJENDTERM = Links.baseUrl + '/empObjective/reviseEmployeeEndTermProgress';

  public static STARTCONSOLIDATORPROCESSENDTERM = Links.baseUrl + '/appraisalPlan/genetereEndTermRatingResult';
  public static STARTFINALAPPROVERPROCESSENDTERM = Links.baseUrl + '/appraisalPlan/genetereEndTermPrimaryRatingResult';

  public static SUBMITCONSOLIDATORSHEETENDTERM = Links.baseUrl + '/midTerm/addRatingConsolidatorInputForEndTerm';
  public static SUBMITFINALAPPROVERSHEETENDTERM = Links.baseUrl + '/midTerm/addFinalApproverInputForEndTerm';
  public static GENERATEREPORTOFENDTERM = Links.baseUrl + '/appraisalPlan/generateEmployeeEndTermExcelByAppraisalPlanId';
  public static GENERATEFINALREPORTOFENDTERM = Links.baseUrl + '/appraisalPlan/generateEmployeeFinalExcelByAppraisalPlanId';

  public static GETALLGRADECATEGORY = Links.baseUrl + '/grade/getAllGradeCategoryByCompanyId';
  public static ADDGRADECATEGORY = Links.baseUrl + '/grade/addGradeCategory';
  public static EDITGRADECATEGORY = Links.baseUrl + '/grade/updateGradeCategory';
  public static GETGRADECATEGORYBYID = Links.baseUrl + '/grade/getGradeCategoryById';
  public static DELETEGRADECATEGORY = Links.baseUrl + '/grade/deleteGradeCategoryById';

  public static GETALLGRADECODE = Links.baseUrl + '/grade/getAllGradeCodeByCompanyId';
  public static ADDGRADECODE = Links.baseUrl + '/grade/addGradeCode';
  public static EDITGRADECODE = Links.baseUrl + '/grade/updateGradeCode';
  public static GETGRADECODEBYID = Links.baseUrl + '/grade/getGradeCodeById';
  public static DELETEGRADECODE = Links.baseUrl + '/grade/deleteGradeCodeById';

  public static GETAPPRAISER = Links.baseUrl + '/appraisalPlan/getListOfDistinctAppraisers';

  public static APPRAISALGROUPANDTOTALSCOREREPORT = Links.baseUrl + '/report/getReportByAppraisalGroupAndTotalScore';
  public static APPRAISALGROUPANDTOTALSCOREREPORTEXPORT = Links.baseUrl + '/report/generateReportByAppraisalGroupAndTotalScore';

  public static GETAPPRAISEEBYGRADEREPORT = Links.baseUrl + '/report/getReportByGradeCodeAndGradeCategory';
  public static GETAPPRAISEEBYGRADEREPORTEXPORT = Links.baseUrl + '/report/generateReportByGradeCodeAndGradeCategory';

  public static GETAPPRAISEEBYDEPTANDGRADEREPORT = Links.baseUrl + '/report/getReportByDepartmentAndGradeCodeAndGradeCategory';
  public static GETAPPRAISEEBYDEPTANDGRADEREPORTEXPORT = Links.baseUrl + '/report/generateReportByDepartmentAndGradeCodeAndGradeCategory';

  public static GETAPPRAISEEBYAPPRAISERANDTOTALSCORERPORT = Links.baseUrl + '/report/getReportByAppraiserAndTotalScore';
  public static GETAPPRAISEEBYAPPRAISERANDTOTALSCORERPORTEXPORT = Links.baseUrl + '/report/generateReportByAppraiserAndTotalScore';

  public static GETAPPRAISEEBYDEPTANDGROUPANDTOTALSCORERPORT = Links.baseUrl + '/report/getReportByDepartmentAndAppraisalGroupAndTotalScore';
  public static GETAPPRAISEEBYDEPTANDGROUPANDTOTALSCORERPORTEXPORT = Links.baseUrl + '/report/generateReportByDepartmentAndAppraisalGroupAndTotalScore';

  public static GETAPPRAISEEBYGRADEANDAPPRAISERRATING = Links.baseUrl + '/report/getReportByGradeCodeAndGradeCategoryAndPreviousAppraisalRating';
  public static GETAPPRAISEEBYGRADEANDAPPRAISERRATINGEXPORT = Links.baseUrl + '/report/generateReportByGradeCodeAndGradeCategoryAndPreviousAppraisalRating';

  public static GETAPPRAISEEBYDEPTGRADEANDAPPRAISERRATING = Links.baseUrl + '/report/getReportByDepartmentAndGradeCodeAndGradeCategoryAndPreviousAppraisalRating';
  public static GETAPPRAISEEBYDEPTGRADEANDAPPRAISERRATINGEXPORT = Links.baseUrl + '/report/generateReportByDepartmentAndGradeCodeAndGradeCategoryAndPreviousAppraisalRating';

  public static GETAPPRAISEEBYSTATUSOFOBJ = Links.baseUrl + '/report/getReportByCompletedNotCompletedObjectiveSetting';
  public static GETAPPRAISEEBYSTATUSOFOBJEXPORT = Links.baseUrl + '/report/generateReportByCompletedNotCompletedObjectiveSetting';

  public static GETAPPRAISERBYDEPTAPPTYPE = Links.baseUrl + '/report/getReportByDepartmentAndAppraiserType';
  public static GETAPPRAISERBYDEPTAPPTYPEEXPORT = Links.baseUrl + '/report/generateReportByDepartmentAndAppraiserType';

  public static GETAPPRAISEEBYSTATUSANDTERM = Links.baseUrl + '/report/getReportByCompletedNotCompletedMidTermOrEndTermSelfAppraisal';
  public static GETAPPRAISEEBYSTATUSANDTERMEXPORT = Links.baseUrl + '/report/generateReportByCompletedNotCompletedMidTermOrEndTermSelfAppraisal';

  public static GETAPPRAISERBYSTATUSANDOTHER = Links.baseUrl + '/report/getReportOfAppraiserCompletedNotCompletdDifferentProcess';
  public static GETAPPRAISERBYSTATUSANDOTHEREXPORT = Links.baseUrl + '/report/generateReportOfAppraiserCompletedNotCompletdDifferentProcess';

  public static GETAPPRAISEEOBJECTIVEBYDEPT = Links.baseUrl + '/report/getReportByDepartmentAndIndividualObjective';
  public static GETAPPRAISEEOBJECTIVEBYDEPTEXPORT = Links.baseUrl + '/report/generateReportByDepartmentAndIndividualObjective';

  public static UPDATELANGUAGETYPE = Links.baseUrl + '/userLogin/setLanguage';

  public static GETAPPRAISEEOBJECTIVEBYID = Links.baseUrl + '/report/getReportByIndividualObjective';
  public static GETAPPRAISEEOBJECTIVEBYIDEXPORT = Links.baseUrl + '/report/generateReportByIndividualObjective';

  public static GETMODERATIONREPORT = Links.baseUrl + '/report/getModerationReportForFinalEval';
  public static GETMODERATIONREPORTEXPORT = Links.baseUrl + '/report/generateModerationReportForFinalEval';

  public static GETEMPLOYEELISTWITHTRAININGNEEDS = Links.baseUrl + '/report/getReportByDeptAndGradeForTrainingNeeds';
  public static GETEMPLOYEELISTWITHTRAININGNEEDSEXPORT = Links.baseUrl + '/report/generateReportByDeptAndGradeForTrainingNeeds';

  public static GETCONSOLIDATEDREPORT = Links.baseUrl + '/report/getConsolidatedReportByIndicativeAndPrimaryRating';
  public static GETCONSOLIDATEDREPORTEXPORT = Links.baseUrl + '/report/generateConsolidatedReportByIndicativeAndPrimaryRating';

  public static GETCONSOLIDATEDREPORTWITHFINALRATING = Links.baseUrl + '/report/getConsolidatedReportByIndicativeAndPrimaryAndFinalRating';
  public static GETCONSOLIDATEDREPORTWITHFINALRATINGEXPORT = Links.baseUrl + '/report/generateConsolidatedReportByIndicativeAndPrimaryAndFinalRating';

  public static GETREPORTFORSTIMULATION = Links.baseUrl + '/report/getReportForStimulationForIncrement';
  public static GETREPORTFORSTIMULATIONEXPORT = Links.baseUrl + '/report/generateReportForStimulationForIncrement';

  public static GETRELATIVEGROUPBYCOMPANYID = Links.baseUrl + '/group/getRelativeGroupByCompanyId';
  public static SUBMITRELATIVEGROUP = Links.baseUrl + '/group/addRelativeGroups';

  public static GETSAVERELATIVEGROUPBYCOMPANYID = Links.baseUrl + '/group/getAllSavedRelativeGroupsByCompanyId';
  public static GETDASHBOARDINFOCOMPANY = Links.baseUrl + '/userLogin/getDashboardDetails';

}
