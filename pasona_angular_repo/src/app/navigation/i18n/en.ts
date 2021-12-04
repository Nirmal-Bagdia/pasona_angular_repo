export const locale = {
    lang: 'en',
    data: {
        'NAV': {
            'companyUser': 'Company',
            'unitUser': 'Unit/Division',
            'adminUser': 'Admin',
            'employeeUser': 'Employee',
            'logout': 'Logout',
            'company': {
                'add': 'Add Company',
                'edit': 'Edit Company',
                'view': 'All Companies',
                'name': 'Companies',
                'reg': 'Company Registration'
            },

            'note': 'Fields marked * are mandatory.',
            'special': 'Special characters are not allowed',

            //appraisal group setting 
            'appraisalGroupFrom': {
                'objective': 'Objective',
                'competencyParameter': 'Competency Parameter',
                'companyParameter': 'Company Parameter',
                'objectiveType': 'Objective Type',
                'performanceObjective': 'Performance Objective',
                'developmentObjective': 'Development Objective',
                'term': 'Term',
                'termType': 'Term Type',
                'midTerm': 'Mid-term',
                'weightage': 'Weightage',
                'totalWeightage:': 'Total Weightage:',
                'evaluationMatrix': 'Evaluation Matrix',
                'personalGroup': 'Personal Group',
                'defineAppraiser': 'Define Appraiser ',
                'firstAppraiser': 'First Appraiser',
                'firstAppraiser&SecondAppraiser': 'First Appraiser & Second Appraiser',
                'firstAppraiserSecondAppraiser&ThirdAppraiser': 'First Appraiser , Second Appraiser & Third Appraiser',
                'evaluationType': 'Evaluation Type',
                'evaluationProcess': 'Evaluation Process',
                'indicativeRating': 'Indicative Rating',
                'primaryRating': 'Primary Rating',
                'finalRating': 'Final Rating',
                'relative': 'Relative',
                'absolute': 'Absolute',
                'evaluationResult': 'Evaluation Result',
                'performanceRating': 'Performance Rating',
                'competencyRating': 'Competency Rating',
                'oneCompositeRating': 'One Composite Rating',
                'companyParameterWeightage': 'Company Parameter Weightage',
                'performanceRatingWeightage': 'Performance Rating Weightage',
                'competencyRatingWeightage': 'Competency Rating Weightage',

            },

            //Appraisal Group Validation
            'appraisalGroupFromValidation': {
                'weightageRequired': 'Weightage is required.',
                'competencyParameterRequired': 'Competency Parameter is required.',
                'fieldRequired': 'Field is required',
                'companyParameter': 'Company Parameter is required',
            },

            //Dashboard
            'dashboardElement': {
                'appraisalPlan': 'Appraisal Plan',
                'participants': 'Participants',
                'objectiveProcess': ' Objective Process',
                'midtermProcess': 'Midterm Process',
                'evalutionProcess': 'Evalution Process',
                'to': 'to'
            },
            //change password
            'changePassword': {
                'add': '',
                'edit': '',
                'view': 'Change Password',
                'name': 'Change Password',
                'oldPass': 'Old Password',
                'newPass': 'New Password',
                'confirmPass': 'Confirm Password'
            },
            //change password form validation
            'changePassValidation': {
                'oldPassRequired': 'Old Password is required.',
                'newPassRequired': 'Password is required.',
                'confirmPassMatch': ' Password not matched.',
                'passType': ' Password must contain at least 8 characters, including upper/lowercase/numbers and a special character.',
            },

            //company form
            'companyForm': {
                'name': 'Company Name',
                'companyNumber': 'Company Incorporation Number',
                'email': 'Email',
                'userName': 'User Name',
                'website': 'Website',
                'country': 'Country',
                'state': 'State',
                'city': 'City',
                'status': 'Status',
                'companyType': 'Company Type',
                'enterCompanyType': 'Enter Company Type'
            },
            //company form validation
            'companyFormValidation': {
                'nameRequired': 'Company Name is required.',
                'companyLength': 'Company Name length should be less or equal 200.',
                'companyNumberRequired': 'Company Incorporation Number is required.',
                'numberAlphaNumeric': 'Company Incorporation Number Must be Alpha Numeric.',
                'emailRequired': 'Email is required.',
                'invalidEmail': 'Please enter valid Email.',
                'userNameRequired': 'User Name is required.',
                'userNameMaxLength': 'User Name length should be less or equal 20.',
                'userNameMinLength': 'User Name minimum length should be equal 10.',
                'userNameSepcialChar': 'Special characters are not allowed',
                'websiteUrl': 'Invalid Website URL.',
                'countryRequired': 'Country is required.',
                'stateRequired': 'State is required',
                'cityRequired': 'City is required.',
                'statusRequired': 'Status is required.',
                'companyTypeRequired': 'Company Type is required.',
                'companyTypeAlpha': 'Company Type Must be Alpha Numeric.',
                'companyLogoRequired': 'Company Logo is required.',
                'uploadLogo': 'Upload Company Logo',

            },

            //unit form
            'unitForm': {
                'unitName': 'Unit/Division Name',
                'email': 'Email',
                'userName': 'User Name',
                'employeeName': 'Employee Name',
                'number': 'Mobile No.',
                'country': 'Country',
                'city': 'City',
                'state': 'State',
                'company': 'Company',
                'address': 'Address',
            },
            //unit form validation
            'unitFormValidation': {
                'unitRequired': 'Unit/Division Name is required.',
                'unitLength': 'Unit/Division Name length should be less or equal 30.',
                'email': 'Please enter valid Email.',
                'emailRequired': 'Email is required.',
                'userNameRequired': 'User Name is required.',
                'max': 'User Name length should be less or equal 20.',
                'min': ' User Name minimum length should be equal 10.',
                'numberRequired': 'Mobile number is required.',
                'numberMax': 'Mobile number maxlength is 14.',
                'numberMin': 'Mobile number minlength is 7.',
                'numberOnly': 'Numbers accepted only.',
                'countryRequired': 'Country is required.',
                'stateRequired': 'State is required.',
                'cityRequired.': 'City is required.',
                'companyRequired': 'Company is required.',
                'addressRequired': 'Address is required.'
            },

            //department form
            'departmentForm': {
                'company': 'Company',
                'unit': 'Unit/Division',
                'name': 'Department Name'
            },
            //department form validation
            'departmentFormValidation': {
                'companyRequired': 'Company is required.',
                'unitRequired': 'Unit/Division Name is required.',
                'unitLength': 'Unit/Division Name length should be less or equal 30.',
                'departmentRequired': 'Department Name is required.',
                'departmentMax': ' Department Name length should be less or equal 30.'

            },
            //section form
            'sectionForm': {
                'company': 'Company',
                'unit': 'Unit/Division',
                'department': 'Department',
                'name': 'Section Name'
            },
            //section validation form
            'sectionFormValidation': {
                'companyRequired': 'Company is required.',
                'unitRequired': 'Unit/Division Name is required.',
                'departmentRequired': 'Department is required.',
                'nameRequired': 'Section Name is required.',
                'maxName': 'Section Name length should be less or equal 30.'
            },
            //company parameter form
            'companyParameterForm': {
                'groupName': 'Parameter Group Name',
                'name': 'Parameter Name'
            },
            //Parameter Form Validation
            'parameterFormValidation': {
                'groupNameRequired': 'Parameter Group Name is required.',
                'maxGroupName': 'Parameter Group Name length should be less than or equal to 100.',
                'nameRequired': 'Parameter  Name is required.',
                'nameMax': 'Parameter  Name length should be less than or equal to 100.'
            },
            //competency parameter form
            'competencyParameterForm': {
                'personalGroup': 'Personal Group',
                'groupName': 'Parameter Group Name',
                'name': 'Parameter Name'
            },
            //competency  parameter validation
            'competencyParameterValidation': {
                'personalGroupRequired': ' Parameter Group Name is required.',
                'personalGroupMax': ' Parameter Group Name length should be less than or equal to 100.',

            },
            //rating configuration form
            'ratingForm': {
                'planType': 'Plan Type',
                'halfyearly': 'Half yearly',
                'quarterly': 'Quarterly',
                'annually': 'Annually',
                'ratingType': 'Rating Type',
                'ratingScale': 'Rating Scale',
                'from': 'From',
                'to': 'To',
                'alphaNum': 'Alpha/Alpha-numeric Value Configuration',
                'value': 'Value',
                'name': 'Name',
                'gradeConfig': 'Grade Configuration Matrix',
                'yes': 'Yes',
                'no': 'No',
                'grade': 'Grade',
                'percentage': 'Percentage',
                'valueConfig': 'Value Configuration Matrix',
                'valueFrom': 'Value From',
                'valueTo': 'Value To',
            },
            //rating validation
            'ratingFormValidation': {
                'gradeRequired': 'Grade is required.',
                'gradeMax': 'Grade length should be less than or equal to 3.',
                'percentRequired': 'Percentage is required.',
                'valueFromRequired': 'Value From is required.',
                'valueToRequired': 'Value to is required.',
                'nameRequired': 'Name is required.',
                'nameMax': 'Name length should be less than or equal to 3.',
                'special': 'Digits or special characters are not allowed.',
                'aplhaNumeric': ' Only alphanumeric is allowed.'
            },

            //appraisal group form
            'appraisalGroupForm': {
                'company': 'Company',
                'appraisalGroup': 'Appraisal Group Name'
            },
            //appraisal form validation
            'appraisalFormValidation': {
                'companyRequired': 'Company is required.',
                'appraisalGroupRequired': ' Appraisal Group Name is required.',
                'appraisalMax': 'Appraisal Group Name length should be less or equal 30.'
            },
            //Relative Group form
            'relativeGroupForm': {
                'relativeGroup': 'Relative Group',
                'selectRelativeGroups': 'Select Relative Groups',
                'ratingConsolidator': 'Rating Consolidator'
            },
            //Relative form Validation
            'relativeFormValidation': {
                'ratingConsolidatorRequired': 'Rating consolidator is required.'
            },
            //empytype form
            'empytype': {
                'company': 'Company',
                'employmentType': 'Employment Type'
            },
            //empytype validation form
            'empytypeValidation': {
                'companyRequired': 'Company is required.',
                'empyTypeRequired': 'Employment Type is required.',
                'empyType': ' Employment Type length should be less or equal 30.',
                'special': ' Digits or special characters are not allowed.'
            },
            //add promotion Form
            'promotionForm': {
                'designationFrom': 'Designation From',
                'designationTo': 'Designation To',
                'minPoint': 'Minimum CAP Point',
                'rating': 'Preceding Year Rating',
                'gradePresent': 'No. of years in the present grade',
            },
            //add promotion form validation
            'promotionValidation': {
                'designationFromRequired': 'Designation From is required.',
                'special': ' Digits or special characters are not allowed.',
                'max': '  Designation From length should be less or equal 35.',
                'designationToRequired': ' Designation To is required.',
                'minPointRequired': 'CAP Point is required.',
                'ratingRequired': 'Preceding Year Rating is required',
                'gradePresentRequired': 'Present Grade is required.',
                'minMax': 'Value must be  between 1 and 1000.'
            },

            // appraisal form
            'appraisalRoleForm': {
                'roleName': 'Role Name',
                'assignModule': 'Assign Module',
                'selectAll': 'Select All',
                'read': 'Read',
                'write': 'Write'
            },
            // appraisal  form validation  
            'appraisalRoleFormValidation': {
                'nameValidation': 'Role Name is required.',
                'max': 'Role Name length should be less or equal 30.',
                'select': 'Please select atleast one module.',
            },

            //grade category
            'gradeCategoryForm': {
                'gradeCategory': 'Grade Category',
                'gradeCode': 'Grade Code'
            },

            //grade category validation
            'gradeCategoryValidation': {
                'gradeCategoryRequired': ' Grade Category is required.',
                'aplha': 'Only alphanumeric is allowed.',
                'gradeCategoryMax': 'Grade Category length should be less or equal 5.',
                'gradeCodeRequired': 'Grade Code is required.',
            },

            //employee form
            'employeeForm': {
                'companyHead': 'Whether the HEAD of Company?',
                'no': 'No',
                'yes': 'Yes',
                'company': 'Company',
                'unit': 'Unit/Division',
                'unitHead': 'Whether the HEAD of Unit/Division?',
                'department': 'Department',
                'section': 'Section',
                'employeeHod': 'Whether the employee is an HOD of department?',
                'employeeName': 'Employee Name',
                'email': 'Email',
                'employeeCode': 'Employee Code',
                'role': 'Role',
                'mobileNo': 'Mobile No.',
                'userName':'User Name',
                'employmentType':'Employment Type',
                'dob': 'Date of Birth',
                'nationality': 'Nationality',
                'gradeCategory': 'Grade Category',
                'gradeCode': 'Grade Code',
                'designation': 'Designation',
                'lpd': 'Last Promotion Date',
                'gender': 'Gender',
                'dateOfJoining': 'Date of Joining',
                'employeeCategory': 'Employee Category',
                'appraisalGroup': 'Appraisal Group',
                'highestQualification': 'Highest Qualification',
                '2ndhighestQualification': 'Second Highest Qualification',
                'experienceBeforeJoining': 'Experience Years-Before Joining',
                'lengthMax': ' Length should be less or equal 3.',
                'appraisalRating1': 'Preceding Year Appraisal Rating (N-1)',
                'appraisalRating2': 'Preceding Year Appraisal Rating (N-2)',
                'appraisalRating3': 'Preceding Year Appraisal Rating (N-3)',
                'appraisalRating4': 'Preceding Year Appraisal Rating (N-4)',
                'address': 'Address'
            },
            //employee form validation
            'employeeFormValidation': {
                'companyRequired': 'Company is required.',
                'unitRequired': 'Unit/Division is required.',
                'departmentRequired': 'Department is required.',
                'sectionRequired': 'Section is required.',
                'nameRequired': ' Employee Name is required.',
                'nameMax': 'Employee Name length should be less or equal 35.',
                'specialChar': 'Digits or special characters are not allowed',
                'emailRequired': 'Email is required.',
                'invalidEmail': 'Invalid Email Address.',
                'employeeCodeRequired': 'Employee Code is required.',
                'employeeCodeMax': 'Employee Code length should be less or equal 10.',
                'roleRequired': 'Role is required.',
                'numberRequired': 'Mobile number is required.',
                'numberMin': 'Mobile number minlength is 7.',
                'numberMax': 'Mobile number maxlength is 14.',
                'numberOnly': 'Numbers accepted only.',
                'dob': 'Date of Birth is required.',
                'nationalityRequired': 'Nationality is required.',
                'employmentTypeRequired': 'Employment Type is required.',
                'gradeCategoryRequired': 'Grade Category is required.',
                'gradeCodeRequired': 'Grade Code is required.',
                'designationRequired': 'Designation is required.',
                'designationMax': 'Designation length should be less or equal 30.',
                'genderRequired': 'Gender is required.',
                'dateOfjoining': 'Date of Joining is required.',
                'employeeCategory': ' Employee Category is required.',
                'alphaNumberic': 'Only alphanumeric is allowed.',
                'employeeCategoryMax': ' Employee Category length should be less or equal 30.',
                'appraisalRequired': 'Appraisal Group is required.',
                'highestQualification': 'Highest Qualification is required.',
                'highestQualificationMax': ' Length should be less or equal 20.',
                'joiningYearRequired': ' Experience Years-Before Joining is required.',
                'validData': 'Please enter valid data (ex. 0.9,10,15.11)',
                'ratingN1': 'Preceding Year Appraisal Rating (N-1) is required.',
                'length': 'Length should be less or equal 3.',
                'addressRequired': 'Address is required.'
            },

            //Report form
            'reportForm': {
                'appraisalPlan': 'Appraisal Plan',
                'reportType': 'Report Type',
                'department': 'Department',
                'gradeCategory': 'Grade Category',
                'gradeCode': 'Grade Code',
                'appraiser': 'Appraiser',
                'appraisalGroup': 'Appraisal Group',
                'appraiserType': 'Appraiser Type',
                'appraisalRatingYear': 'Appraisal Rating Year',
                'status': 'Status',
                'term': 'Term',
                'process': 'Process',
                'objectiveSetting': 'Objective Setting',
                'review': 'Review'
            },

            //Add Company Objective 
            'goalsForm': {
                'from': 'From',
                'to': 'To',
                'month': 'Month',
                'year': 'Year',
                'summary': 'Summary',
                'objectiveType': 'Objective Type',
                'weightage': 'Weightage',
                'difficultyLevel': 'Difficulty Level',
                'objective': 'Objective',
                'measurementCriteria': 'Measurement Criteria',
                'parameter': 'Parameter',
                'totalWeightage': 'Total Weightage:',
                'comment': 'Comment'
            },

            //company objective validation
            'goalSValidation': {
                'monthRequired': 'Month is required.',
                'yearRequired': 'Year is required.',
                'summary': 'Summary is required.',
                'summaryMax': ' Summary length should be less than or equal to 500.',
                'formDate': 'From Date is required.',
                'toDate': 'To Date is required.',
                'weightageRequired': 'Weightage is required.',
                'objectiveRequired': ' Objective is required.',
                'objectiveMax': ' Objective length should be less than or equal to 500.',
                'measurement': 'Measurement criteria is required.',
                'measurementMax': ' Measurement criteria length should be less than or equal to 500.',
                'parameter': ' Parameter is required.',
                'parameterMax': 'Parameter length should be less than or equal to 500.',
                'commentMax': ' Comment length should be less than or equal to 500.',
            },

            //Assign Role
            'assignRoleForm': {
                'unit': 'Unit',
                'department': 'Department',
                'section': 'Section',
                'assignRole': 'Assign Role',
                'employees': 'Employees',
                'roles': 'Roles'
            },
            //Assign Validation
            'assignRoleValidation': {
                'unitRequired': 'Unit is required.',
                'departmentRequired': 'Department is required.',
                'sectionRequired': 'Section is required.',
                'employeeRequired': 'Employee is required.',
                'roleRequired': 'Role is required.'
            },

            //bulk upload 
            'bulkUpload': {
                'upload': 'Upload Downloaded (.xlsx) File ',
                'file': 'File is required.'
            },

            //employee participant
            'employeeParticipant': {
                'pendingEmployee': 'Pending with Employee',
                'pendingFirstAppraiser': 'Pending with first appraiser',
                'pendingSecondAppraiser': 'Pending with second appraiser',
                'pendingThirdAppraiser': 'Pending with third appraiser',
                'pendingObjectiveApprover': 'Pending with Objective Approver',
                'pendingRatingConsolidator': 'Pending with Rating consolidator',
                'pendingFinalApprover': 'Pending with Final Approver',
                'addAppraiser': 'Add Appraiser',
                'editAppraiser': 'Edit Appraiser',
                'none': 'None',
            },
            //view plan
            'viewPlan': {
                'pending': 'Pending',
                'completed': 'Completed',
                'addAppraiser': 'Add Appraiser',
                'editAppraiser': 'Edit Appraiser',
                'from': 'From',
                'to': 'to',
            },

            //appraisal group dialog
            'appraisalGroupDialog': {
                'assignEmployee': ' Assign Employees to Appraisal Group',
                'employees': 'Employees',
                'firstAppraiser': 'First Appraiser is required.',
                'section': 'Section',
                'department': 'Department',
                'unit': 'Unit',
                'none': 'None',
                'firstRequired.': 'First Appraiser is required.'
            },

            //date form dialog
            'dateForm': {
                'objectiveStartDate': 'Objective Setup Start Date',
                'objectiveEndDate': 'Objective Setup End Date',
                'appraisee': 'Appraisee',
                'firstAppraiser':'First Appraiser',
                'secondAppraiser': 'Second Appraiser',
                'thirdAppraiser': 'Third Appraiser',
                'goalApprover': 'Goal Approver',
                'midtermStartDate': 'Midterm  Start Date',
                'midtermEndDate': 'Midterm End Date',         
                'ratingConsolidator': 'Rating Consolidator',
                'finalApprover':'Final Approver',
                'finalStartDate':'Final Evalution  Start Date',
                'finalEndDate':'Final Evalution End Date',
                'dateRequired': 'Date is required.',
            },

            'unit': {
                'add': 'Add Unit/Division',
                'edit': 'Edit Unit/Division',
                'view': 'All Units/Divisions',
                'name': 'Unit/Division',
            },
            'department': {
                'add': 'Add Department',
                'edit': 'Edit Department',
                'view': 'All Departments',
                'name': 'Departments',
            },
            'section': {
                'add': 'Add Section',
                'edit': 'Edit Section',
                'view': 'All Sections',
                'name': 'Sections',
            },
            'configuration': {
                'view': 'Rating Configuration',
                'name': 'Rating Configuration',
            },
            'appraisalGroup': {
                'add': 'Add Appraisal Group',
                'edit': 'Edit Appraisal Group',
                'view': 'All Appraisal Group',
                'name': 'Appraisal Group',
                'gEmp': 'Appraisal Group Employees',
                'addGEmp': 'Add Employees To Appraisal Group',
                'group': 'Appraisal Group',
                'groupSetting': 'Appraisal Group Setting',
                'relatveGSetting': 'Relative Group Setting'
            },
            'emptype': {
                'add': 'Add Employment Type',
                'edit': 'Edit Employment Type',
                'view': 'All Employment Type',
                'name': 'Employment Type',
            },
            'jobTitle': {
                'add': 'Add Promotion Eligibility Criteria',
                'edit': 'Edit Promotion Eligibility Criteria',
                'view': 'Promotion Eligibility',
                'name': 'Promotion Eligibility'
            },
            'role': {
                'add': 'Add Appraisal Role',
                'edit': 'Edit Appraisal Role',
                'view': 'Appraisal Roles',
                'name': 'Appraisal Roles',
            },
            'grade': {
                'add': 'Add Grade Category',
                'edit': 'Edit Grade Category',
                'add1': 'Add Grade Code',
                'edit1': 'Edit Grade Code',
                'view': 'Grade Configuration',
                'name': 'Grade Configuration',
            },
            'employee': {
                'add': 'Add Employee',
                'edit': 'Edit Employee',
                'bulkUpload': 'Bulk Upload',
                'view': 'All Employees',
                'name': 'Employees',
                'bUploadEmp': 'Bulk Upload Employees',
                'bUploadFileDownload': 'File Download For Bulk Upload'
            },
            'companyObj': {
                'add': 'Add  Objective',
                'edit': 'Edit Objective',
                'view': 'Company Objectives',
                'name': 'Company Objectives',
                'viewObj': 'View Company Objectives'
            },

            'departmentObj': {
                'add': 'Add Objective',
                'edit': 'Edit Objective',
                'view': 'Department Objectives',
                'name': 'Department Objectives',
                'dept': 'Departments',
                'viewDept': 'View Department Objectives'
            },
            'employeeObj': {
                'add': 'Add Objective',
                'edit': 'Edit Objective',
                'view': 'All Objectives',
                'name': 'Employee Objectives',
                'viewEmpObj': 'View Employee Objectives',
                'viewEmp': 'Employees',
                'viewOther': 'All Employees Objective',
                'smartObj': 'Smart Objective',
                'selfReview': 'Self Review process'
            },
            'assignRole': {
                'add': 'Assign Appraisal Role',
                'edit': 'Assign Appraisal Role',
                'view': 'Assign Appraisal Roles',
                'name': 'Assign Appraisal Roles',
            },
            'appraisalParameter': {
                'add': 'Add Competency Parameter',
                'edit': 'Edit Competency Parameter',
                'view': 'Competency Parameter',
                'name': 'Competency Parameter'
            },
            'companyParameter': {
                'add': 'Add Company Parameter',
                'edit': 'Edit Company Parameter',
                'view': 'Company Parameter',
                'name': 'Company Parameter'
            },
            'appraisalPlan': {
                'add': 'Add Appraisal Plan',
                'edit': 'Edit Appraisal Plan',
                'view': 'Appraisal Plan',
                'name': 'Appraisal Plan',
                'addParti': 'Add Participant',
                'addAppraiser': 'Add Appraiser',
                'editAppraiser': 'Edit Appraiser',
                'listEmp': 'Employees',
                'addGAppraiser': 'Add Group Appraiser',
                'consolidationSheet': 'Consolidation Sheet',
                'consolidate': 'Consolidate Sheet',
                'finalASheet': 'Final Approver Sheet',
                'finalApprover': 'Final Approver Sheet',
                'endTermEva': "End-term Evalution",
                'participants': 'Participants',
                'generateFinalReport': "Generate Final Report",
                "generateEndtermReport": "Generate Endterm Report",
                "configureTimeline": "Configure Timeline",
                "startFinalApproverProcess": "Start Final Approver Process",
                "startConsolidationProcess": "Start Consolidation Process",
                "generateMidtermReport": "Generate Midterm Report",
                "startEndtermProcess": "Start Endterm Process",
                "midtermReview": "Midterm Review",
                "generateObjectiveReport": "Generate Objective Report",
                "startMidtermReviewProcess": "Start Midterm Review Process",
                "startAppraisalPlan": "Start Appraisal Plan",
                "objectivesetup": "Objective setup",
            },
            'myAppraisees': {
                'add': '',
                'edit': '',
                'view': 'Appraisees',
                'name': 'My Appraisees'
            },
            'notification': {
                'add': '',
                'edit': '',
                'view': 'Notification'
            },
            'report': {
                'name': "Report"
            },

            'delete': 'Delete',
            'cancel': 'Cancel',
            'close': 'Close',
            'ok': 'Ok',
            'no': 'No',
            'yes': 'Yes',
            'info': 'Info',
            'add': 'Add',
            'send': 'Send',
            'submit': 'Submit',
            'update': 'Update',
            'create': 'Create',
            'upload': 'Upload',
            'approve': 'Approve',
            'notes': 'Notes',
            'revise': 'Revise',
            'save': 'Save',
            'export': 'Export',
            'appRating': 'Appraiser Evaluation',
            'confiTime': 'Configure Timeline',
            'offlineHistory': 'Offline Meeting History',
            'sendAlert': 'Send Alert',
            'continue': 'Continue',
            'alreadyExistEmp': 'Already Exists Employees',
            'dashboard': 'Dashboard'
        },

        companyTable: { sNo: 'S.No.', companyName: 'Company Name', email: 'Email', companyType: 'Company Type', status: 'Status', creationDate: 'Creation Date', action: 'Actions' },
        unitTable: { sNo: 'S.No.', unitName: 'Unit Name', userName: 'User Name', mobile: 'Mobile', employeeName: 'Employee Name', action: 'Actions' },
        deptTable: { sNo: 'S.No.', deptName: 'Department Name', unit: 'Unit', action: 'Actions' },
        sectionTable: { sNo: 'S.No.', sectionName: 'Section Name', unitName: 'Unit', deptName: 'Department', action: 'Actions' },
        competencyTable: { sNo: 'S.No.', name: 'Name', parameter: 'Parameter', assignedTo: 'Assigned To', action: 'Actions' },
        comParaTable: { sNo: 'S.No.', name: 'Name', parameter: 'Parameter', assignedTo: 'Assigned To', action: 'Actions' },
        groupTable: { sNo: 'S.No.', groupName: 'Group Name', action: 'Actions' },
        employeeTable: { sNo: 'S.No.', empName: 'Employee Name', deptName: 'Department', email: 'Email', phone: 'Phone', designation: 'Designation', action: 'Actions' },
        empTypeTable: { sNo: 'S.No.', empType: 'Employment Type', action: 'Actions' },
        roleTable: { sNo: 'S.No.', roleName: 'Role Name', creationDate: 'Creation Date', action: 'Actions' },
        jobTitleTable: { sNo: 'S.No.', designationFrom: 'Designation From', designationTo: 'Designation To', presentGrade: 'No. of years in the present grade', capPoint: 'Minimum CAP Point', rating: 'Preceding Year Rating', action: 'Actions' },
        gradeCateTable: { sNo: 'S.No.', gradeCate: 'Grade Category', action: 'Actions' },
        gradeCodeTable: { sNo: 'S.No.', gradeCate: 'Grade Code', action: 'Actions' },
        comObjTable: { sNo: 'S.No.', from: 'From Month/Year', to: 'To Month/Year', summary: 'Summary', creationDate: 'Creation Date', action: 'Actions' },
        deptObjTable: { sNo: 'S.No.', from: 'From Month/Year', to: 'To Month/Year', summary: 'Summary', creationDate: 'Creation Date', action: 'Actions' },
        empObjTable: { sNo: 'S.No.', from: 'From Month/Year', to: 'To Month/Year', summary: 'Summary', creationDate: 'Creation Date', action: 'Actions' },
        appraisalPlanTable: { sNo: 'S.No.', planName: 'Appraisal Plan', purpose: 'Purpose of plan', startDate: 'Start Date', endDate: 'End Date', viewObj: 'View Objective', viewAppraisee: 'View Appraisees', viewEmp: 'View Employees', action: 'Actions' },
        appraiseeTable: { sNo: 'S.No.', name: 'Name', deptName: 'Department', section: 'Section', group: 'Group', status: 'Status', action: 'Actions' },
        assignRoleTable: { sNo: 'S.No.', empName: 'Employee Name', email: 'Email', roleName: 'Role Name', action: 'Actions' },
        planViewTable: { sNo: 'S.No.', name: 'Name', objStatus: 'Objective Status', appraStatus: 'Appraiser Status', midReview: 'Midterm Review Status', endReview: 'Endterm Review Status', action: 'Actions', alert: 'Alert' },
        addPartiTable: { sNo: 'S.No.', select: 'Select All', apprGroup: 'Appraisal Group Name', confi: 'Configured', action: 'Actions' },
        viewPartiTable: { sNo: 'S.No.', name: 'Name', apprStatus: 'Approver Status', action: 'Actions', alert: 'Alert' },
        viewCommentAndRatingTable: { sNo: 'S.No.', appraiserName: 'Appraiser Name', appraiserType: 'Appraiser Type', rating: 'Rating', term: 'Term', para: 'Parameter', comment: 'Comment' },
        //New Add on
        //report
        appraisalReport: {
            appraisalGroup: 'Appraisal Group', Department: 'Department', Section: 'Section', empCode: 'Emp Code', employeeName: 'Employee Name',
            gradeCode: 'Grade Code', gradeCategory: 'Grade Category', Designation: 'Designation', DOJ: 'DOJ', firstAppraiser: 'First Appraiser', secondAppraiser: 'Second Appraiser', thirdAppraiser: 'Third Appraiser', midTermFinalScore: 'Mid-term Final Score', midTermFinalRating: 'Mid-term Final Rating', objectiveSettingStatus: 'Objective Setting Status', status: 'Status',
            endtermFinalScore: 'End-term Final Score', endTermFinalRating: 'End-term Final Rating', finalScore: 'Final Score', finalGrade: 'Final Grade', PrecedingRating1: 'Preceding Year Appraisal Rating 1', PrecedingRating2: 'Preceding Year Appraisal Rating 2', PrecedingRating3: 'Preceding Year Appraisal Rating 3', objectiveType: 'Objective Type', objective: 'Objective', fromDate: 'From/Date',
            toDate: 'To/Date', difficultyLevel: 'Difficulty Level', weightage: 'Weightage', objectiveStatus: 'Objective Status', workObjectiveScore: 'Work Objective Score ', competencyScore: 'Competency Score', companyPerformanceScore: 'Company Performance Score', totalScore: 'Total Score', rankOrder: 'Rank Order', MidTermIndicativeRating: 'Mid Term Indicative Rating', midTermPrimaryRating: 'Mid Term Primary Rating',
            endTermIndicativeRating: 'End Term Indicative Rating', endTermPrimaryRating: 'End Term Primary Rating', firstAppraiserTrainingNeeds: 'First Appraiser Training Needs', secondAppraiserTrainingNeeds: 'Second Appraiser Training Needs',
            thirdAppraiserTrainingNeeds: 'Third Appraiser Training Needs'

        }
    }
};