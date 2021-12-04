export const locale = {
    lang: 'jp',
    data: {
        'NAV': {
            'companyUser': '会社',
            'unitUser': '部門',
            'adminUser': '管理者',
            'employeeUser': '従業員',
            'logout': 'ログアウト',
            'company': {
                'add': '会社の追加',
                'edit': '会社の編集',
                'view': '全ての会社',
                'name': '会社',
                'reg': '会社の登録'
            },
            //company form
            'companyForm': {
                'name': '会社名',
                'companyNumber': '会社法人番号',
                'email': 'Eメールアドレス',
                'userName': '使用者名',
                'website': 'Website',
                'country': '国',
                'state': '州',
                'city': '都市',
                'status': 'ステータス',
                'companyType': '会社種類',
                'enterCompanyType': '会社種類を入力'
            },

            'note': 'Fields marked * are mandatory.',
            'special': 'Special characters are not allowed',

            //company form validation
            'companyFormValidation': {
                'nameRequired': '会社名が必要です',
                'companyLength': '会社名は200文字以下でご入力ください',
                'companyNumberRequired': '会社法人番号が必要です',
                'numberAlphaNumeric': '会社法人番号はアルファベットと数字のみ使用できます',
                'emailRequired': 'Eメールアドレスが必要です',
                'invalidEmail': '有効なEメールアドレスを入力ください',
                'userNameRequired': '使用者名が必要です',
                'userNameMaxLength': '使用者名は20文字以下でご入力ください',
                'userNameMinLength': '使用者名は10文字以上でご入力ください',
                'userNameSepcialChar': '記号は使えません',
                'websiteUrl': 'URLが有効ではありません',
                'countryRequired': '国名が必要です',
                'stateRequired': '州名が必要です',
                'cityRequired': '都市名が必要です',
                'statusRequired': 'ステータスが必要です',
                'companyTypeRequired': '会社種類が必要です',
                'companyTypeAlpha': '会社種類はアルファベットと数字のみ使用できます',
                'companyLogoRequired': '会社ロゴが必要です',
                'uploadLogo': '会社ロゴをアップロード',
            },
            
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
                'personalGroup': 'パーソナルグループ',
                'defineAppraiser': 'Define Appraiser',
                'firstAppraiser': '第1評価者',
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
                'appraisalPlan': '評価計画',
                'participants': '参加者',
                'objectiveProcess': '目標設定プロセス',
                'midtermProcess': '中間評価プロセス',
                'evalutionProcess': '評価プロセス',
                'to': 'に'
            },
            //change password
            'changePassword': {
                'add': '',
                'edit': '',
                'view': 'パスワードの変更',
                'name': 'パスワードの変更',
                'oldPass': '古いパスワード',
                'newPass': '新しいパスワード',
                'confirmPass': 'パスワードの確認'
            },
            //change password form validation
            'changePassValidation': {
                'oldPassRequired': '古いパスワードが必要',
                'newPassRequired': 'パスワードが必要',
                'confirmPassMatch': 'パスワードが間違っています',
                'passType': 'パスワードは最小で8文字（大文字、小文字、数字、特殊文字を含まなければなりません）',
            },

            //unit form
            'unitForm': {
                'unitName': 'ユニット／部門名',
                'email': 'Email',
                'userName': 'User Name',
                'employeeName': '従業員の名前',
                'number': '携帯電話番号',
                'country': '会社',
                'city': 'City',
                'state': 'State',
                'company': '会社',
                'address': '住所',
            },

            //unit form validation
            'unitFormValidation': {
                'unitRequired': 'ユニット・部門名が必要',
                'unitLength': 'ユニット・部門名は30文字以内でなければなりません',
                'email': '有効なEメールアドレスをご入力ください',
                'emailRequired': 'Email is required.',
                'userNameRequired': 'User Name is required.',
                'max': 'User Name length should be less or equal 20.',
                'min': ' User Name minimum length should be equal 10.',
                'numberRequired': '携帯電話番号が必要',
                'numberMax': '携帯電話番号は最大14文字',
                'numberMin': '携帯電話番号は最小7文字',
                'numberOnly': '数字のみ使用できます',
                'countryRequired': '会社名が必要',
                'stateRequired': 'State is required.',
                'cityRequired': 'City is required.',
                'companyRequired': '会社名が必要',
                'addressRequired': '住所が必要'
            },

            //department form
            'departmentForm': {
                'company': '会社',
                'unit': 'ユニット・部門',
                'name': '部署名'
            },

            //department form validation
            'departmentFormValidation': {
                'companyRequired': '会社名が必要',
                'unitRequired': '部署名が必要',
                'unitLength': 'Unit/Division Name length should be less or equal 30.',
                'departmentRequired': '部署名が必要',
                'departmentMax': '部署名は30文字以内でなければなりません'
            },
            //section form
            'sectionForm': {
                'company': '会社',
                'unit': 'ユニット・部門',
                'department': '部署',
                'name': 'セクション名'
            },

            //section validation form
            'sectionFormValidation': {
                'companyRequired': '会社名が必要',
                'unitRequired': 'ユニット・部門名が必要',
                'departmentRequired': '部門が必要',
                'nameRequired': 'セクション名が必要',
                'maxName': 'セクション名は30文字以内でなければなりません'
            },

            //company parameter form
            'companyParameterForm': {
                'groupName': 'パラメーターグループ名',
                'name': 'パラメーター名'
            },
            //Parameter Form Validation
            'parameterFormValidation': {
                'groupNameRequired': 'パラメーターグループ名が必要',
                'maxGroupName': 'パラメーターグループ名は100文字以内でなければなりません',
                'nameRequired': 'パラメーター名が必要',
                'nameMax': 'パラメーター名は100文字以内でなければなりません'
            },
            //competency parameter form
            'competencyParameterForm': {
                'personalGroup': 'パーソナルグループ',
                'groupName': 'パラメーターグループ名',
                'name': 'パラメーター名'
            },
            //competency  parameter validation
            'competencyParameterValidation': {
                'personalGroupRequired': 'パラメーターグループ名が必要',
                'personalGroupMax': 'パラメーターグループ名は100文字以内でなければなりません',
            },
            //rating configuration form
            'ratingForm': {
                'planType': 'プランタイプ',
                'halfyearly': '半年ごと',
                'quarterly': '四半期ごと',
                'annually': '一年ごと',
                'ratingType': '評価タイプ',
                'ratingScale': '評価スケール',
                'from': 'From',
                'to': 'To',
                'alphaNum': 'アルファベットと数字のみ使用できます',
                'value': 'Value',
                'name': '名前',
                'gradeConfig': 'Grade Configuration Matrix',
                'yes': 'はい',
                'no': 'いいえ',
                'grade': 'Grade',
                'percentage': '役職グレード',
                'valueConfig': 'Value Configuration Matrix',
                'valueFrom': 'Value From',
                'valueTo': 'Value To',
            },
            //rating validation
            'ratingFormValidation': {
                'gradeRequired': '役職グレードが必要',
                'gradeMax': '役職グレードは3文字以内でなければなりません',
                'percentRequired': 'パーセンテージが必要',
                'valueFromRequired': 'Value From is required.',
                'valueToRequired': 'Value to is required.',
                'nameRequired': '名前が必要',
                'nameMax': '名前は3文字以内でなければなりません',
                'special': '数字または特殊文字は使えません',
                'aplhaNumeric': 'アルファベットと数字のみ使用できます'
            },

            //check from here 

            //appraisal group form
            'appraisalGroupForm': {
                'company': '会社',
                'appraisalGroup': '評価グループ名'
            },
            //appraisal form validation
            'appraisalFormValidation': {
                'companyRequired': '会社名が必要',
                'appraisalGroupRequired': '評価グループ名が必要',
                'appraisalMax': '評価グループ名は30文字以内でなければなりません'
            },
            //Relative Group form
            'relativeGroupForm': {
                'relativeGroup': '相対評価グループ',
                'selectRelativeGroups': '相対評価グループを選択',
                'ratingConsolidator': 'レートを統合する人'
            },
            //Relative form Validation
            'relativeFormValidation': {
                'ratingConsolidatorRequired': 'レートを統合する人が必要'
            },
            //empytype form
            'empytype': {
                'company': '会社',
                'employmentType': '雇用タイプ'
            },
            //empytype validation form
            'empytypeValidation': {
                'companyRequired': '会社名が必要',
                'empyTypeRequired': '雇用タイプが必要',
                'empyType': '雇用タイプは30文字以内でなければなりません',
                'special': '数字または特殊文字は使えません'
            },
            //add promotion Form
            'promotionForm': {
                'designationFrom': '元の役職',
                'designationTo': '新しい役職',
                'minPoint': '最小CAPポイント',
                'rating': '前年度のレート',
                'gradePresent': '現在の役職グレードでの年数',
            },
            //add promotion form validation
            'promotionValidation': {
                'designationFromRequired': '元の役職が必要',
                'special': '数字または特殊文字は使えません',
                'max': '元の役職は35文字以内でなければなりません',
                'designationToRequired': '新しい役職が必要',
                'minPointRequired': 'CAPポイントが必要',
                'ratingRequired': '前年度のレートが必要',
                'gradePresentRequired': '現在の役職グレードが必要',
                'minMax': 'Value must be  between 1 and 1000.'
            },

            // appraisal form
            'appraisalRoleForm': {
                'roleName': '役割名',
                'assignModule': 'モジュールの任命',
                'selectAll': 'すべて選択',
                'read': '読む',
                'write': '書く'
            },
            // appraisal  form validation  
            'appraisalRoleFormValidation': {
                'nameValidation': '役割名が必要',
                'max': '役割名は30文字以内でなければなりません',
                'select': '少なくとも一つのモジュールを選択してください',
            },

            //grade category
            'gradeCategoryForm': {
                'gradeCategory': '役職グレードカテゴリー',
                'gradeCode': '役職グレードコード  '
            },

            //grade category validation
            'gradeCategoryValidation': {
                'gradeCategoryRequired': '役職グレードカテゴリーが必要',
                'aplha': 'アルファベットと数字のみ使用できます',
                'gradeCategoryMax': '役職グレードカテゴリーは5文字以内でなければなりません',
                'gradeCodeRequired': '役職グレードコードが必要',
            },

            //employee form
            'employeeForm': {
                'companyHead': '会社の長ですか？',
                'no': 'No',
                'yes': 'Yes',
                'company': '会社',
                'unit': 'ユニット・部門',
                'unitHead': 'ユニット／部門の長ですか？',
                'department': '部署',
                'section': 'セクション',
                'employeeHod': '部署の長ですか？',
                'employeeName': '従業員の名前',
                'email': 'Email',
                'employeeCode': '従業員コード',
                'role': '役割',
                'mobileNo': 'Mobile No.',
                'dob': '生年月日',
                'nationality': '国籍',
                'gradeCategory': '役職グレードカテゴリー',
                'gradeCode': '役職グレードコード',
                'designation': '役職',
                'lpd': '最終昇格日',
                'gender': '性別',
                'userName':'User Name',
                'employmentType':'Employment Type',
               
                'dateOfJoining': '入社日',
                'employeeCategory': '従業員カテゴリ',
                'appraisalGroup': '評価グループ',
                'highestQualification': '最終学歴',
                '2ndhighestQualification': '二番目の学歴',
                'experienceBeforeJoining': '入社前の経験年数',
                'lengthMax': '3文字以内でなければなりません',
                'appraisalRating1': '前年度の評価レート（N-1）',
                'appraisalRating2': '前年度の評価レート（N-2）',
                'appraisalRating3': '前年度の評価レート（N-3)',
                'appraisalRating4': '前年度の評価レート（N-4）',
                'address': 'Address'
            },
            //employee form validation
            'employeeFormValidation': {
                'companyRequired': '会社名が必要',
                'unitRequired': 'ユニット／部門が必要',
                'departmentRequired': '部署名が必要',
                'sectionRequired': 'セクションが必要',
                'nameRequired': '従業員の名前が必要',
                'nameMax': '従業員の名前は35文字以内でなければなりません',
                'specialChar': '数字または特殊文字は使えません',
                'emailRequired': 'Email is required.',
                'invalidEmail': 'Invalid Email Address.',
                'employeeCodeRequired': '従業員コードが必要',
                'employeeCodeMax': '従業員コードは10文字以内でなければなりません',
                
                'roleRequired': '役割が必要',
                'numberRequired': '携帯電話番号が必要',
                'numberMin': '携帯電話番号は7文字以上でなければなりません',
                'numberMax': '携帯電話番号は14文字以内でなければなりません',
                'numberOnly': '数字のみ使用できます',
                'dob': '誕生日が必要',
                'nationalityRequired': '国籍が必要',
                'employmentTypeRequired': '雇用タイプが必要',
                'gradeCategoryRequired': '役職グレードカテゴリーが必要',
                'gradeCodeRequired': '役職グレードコードが必要',
                'designationRequired': '役職が必要',
                'designationMax': '役職は30文字以内でなければなりません',
                'genderRequired': '性別が必要',
                'dateOfjoining': '入社日が必要',
                'employeeCategory': '従業員カテゴリが必要',
                'alphaNumberic': 'アルファベットと数字のみ使用できます',
                'employeeCategoryMax': '役職は30文字以内でなければなりません',
                'appraisalRequired': '評価グループが必要',
                'highestQualification': '最終学歴が必要',
                'highestQualificationMax': '長さは20文字以内でなければなりません',
                'joiningYearRequired': '入社前の経験年数が必要',
                'validData': '有効なデータを入力してください（例　0.9,10,15.11）',
                'ratingN1': '前年度の評価レートが必要（N-1）',
                'length': '長さは3文字以内でなければなりません',
                'addressRequired': 'Address is required.'
            },

            //Report form
            'reportForm': {
                'appraisalPlan': '評価計画',
                'reportType': 'レポートタイプ',
                'department': '部署',
                'gradeCategory': '役職グレードカテゴリー',
                'gradeCode': '役職グレードコード ',
                'appraiser': '評価者',
                'appraisalGroup': '評価グループ',
                'appraiserType': '評価者タイプ',
                'appraisalRatingYear': '評価レート年',
                'status': 'ステータス',
                'term': '期間',
                'process': 'プロセス',
                'objectiveSetting': '目標設定',
                'review': 'レビュー'
            },

            //Add Company Objective 
            'goalsForm': {
                'from': 'From',
                'to': 'To',
                'month': '月',
                'year': '年',
                'summary': 'サマリー',
                'objectiveType': '目標タイプ',
                'weightage': '重要度',
                'difficultyLevel': '難易度',
                'objective': '目標',
                'measurementCriteria': '計量基準',
                'parameter': 'パラメーター',
                'totalWeightage': '重要度の合計:',
                'comment': 'コメント'
            },

            //company objective validation
            'goalSValidation': {
                'monthRequired': '月が必要',
                'yearRequired': '年が必要',
                'summary': 'サマリーが必要',
                'summaryMax': 'サマリーの長さは500文字以内でなければなりません',
                'formDate': '始まりの日付が必要',
                'toDate': '終わりの日付が必要',
                'weightageRequired': '重要度が必要',
                'objectiveRequired': '目標が必要',
                'objectiveMax': '目標の長さは500文字以内でなければなりません',
                'measurement': '計量基準が必要',
                'measurementMax': '計量基準は500文字以内でなければなりません',
                'parameter': 'パラメーターが必要',
                'parameterMax': 'パラメーターの長さは500文字以内でなければなりません',
                'commentMax': 'コメントの長さは500文字以内でなければなりません',
            },

            //Assign Role
            'assignRoleForm': {
                'unit': 'ユニット',
                'department': '部署',
                'section': 'Section',
                'assignRole': '役割を任命する',
                'employees': '従業員',
                'roles': '役割 '
            },
            //Assign Validation
            'assignRoleValidation': {
                'unitRequired': 'ユニットが必要',
                'departmentRequired': '部署名が必要',
                'sectionRequired': 'セクションが必要',
                'employeeRequired': '従業員が必要',
                'roleRequired': '役割が必要'
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
                'pendingRatingConsolidator ': 'Pending with Rating consolidator',
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
                'department': '部署',
                'unit': 'Unit',
                'none': 'None',
                'firstRequired.': 'First Appraiser is required.'
            },

            //date form dialog
            'dateForm': {
                'objectiveStartDate': 'Objective Setup Start Date',
                'objectiveEndDate': 'Objective Setup End Date',
                'appraisee': 'Appraisee',
                'firstAppraiser': '第1評価者',
                'secondAppraiser': '第2評価者',
                'thirdAppraiser': '第3評価者',
                'goalApprover': 'Goal Approver',
                'midtermStartDate': 'Midterm  Start Date',
                'midtermEndDate': 'Midterm End Date',
                'ratingConsolidator': 'Rating Consolidator',
                'finalApprover': 'Final Approver',
                'finalStartDate': 'Final Evalution  Start Date',
                'finalEndDate': 'Final Evalution End Date',
                'dateRequired': 'Date is required.',
            },
            'unit': {
                'add': '部門の追加',
                'edit': '部門の編集',
                'view': '全ての部門',
                'name': '部門',
            },
            'department': {
                'add': '部署の追加',
                'edit': '部署の編集',
                'view': '全ての部署',
                'name': '部署',
            },
            'section': {
                'add': '全てのセクション',
                'edit': 'セクションの編集',
                'view': '全てのセクション',
                'name': 'セクション',
            },
            'configuration': {
                'view': '採点の構成',
                'name': '採点の構成',
            },
            'appraisalGroup': {
                'add': '被評価者グループの追加',
                'edit': '被評価者グループの編集',
                'view': '全ての被評価者グループ',
                'name': '被評価者グループ',
                'gEmp': '被評価者グループの従業員',
                'addGEmp': '従業員を被評価者グループへ追加',
                'group': '被評価者グループ',
                'groupSetting': '被評価者グループ設定',
                'relatveGSetting': '相対評価グループ設定'
            },
            'emptype': {
                'add': '雇用タイプの追加',
                'edit': '雇用タイプの編集',
                'view': '全ての雇用タイプ',
                'name': '雇用タイプ',
            },
            'jobTitle': {
                'add': '昇格資格基準の追加',
                'edit': '昇格資格基準の編集',
                'view': '昇格資格',
                'name': '昇格資格'
            },
            'role': {
                'add': '評価システム上の役割の追加',
                'edit': '評価システム上の役割の編集',
                'view': '評価システム上の役割',
                'name': '評価システム上の役割',
            },
            'grade': {
                'add': 'グレードカテゴリーの追加',
                'edit': 'グレードカテゴリーの編集',
                'add1': 'グレードコードの追加',
                'edit1': 'グレードコードの編集',
                'view': 'グレードの設定',
                'name': 'グレードの設定',
            },
            'employee': {
                'add': '従業員の追加',
                'edit': '従業員の編集',
                'bulkUpload': '一括アップロード',
                'view': '全ての従業員',
                'name': '従業員',
                'bUploadEmp': '従業員データを一括アップロード',
                'bUploadFileDownload': '一括アップロードの為のファイルのダウンロード'
            },
            'companyObj': {
                'add': '目標の追加',
                'edit': '目標の編集',
                'view': '会社の目標',
                'name': '会社の目標',
                'viewObj': '会社の目標を見る'
            },
            'departmentObj': {
                'add': '目標の追加',
                'edit': '目標の編集',
                'view': '部署の目標',
                'name': '部署の目標',
                'dept': '部署',
                'viewDept': '部署の目標を見る'
            },
            'employeeObj': {
                'add': '目標の追加',
                'edit': '目標の編集',
                'view': '全ての目標',
                'name': '従業員の目標',
                'viewEmpObj': '従業員の目標を見る',
                'viewEmp': '従業員',
                'viewOther': '全ての従業員の目標',
                'smartObj': 'SMART 目標',
                'selfReview': '自己評価プロセス'
            },
            'assignRole': {
                'add': '評価システム上の役割の任命',
                'edit': '評価システム上の役割の任命',
                'view': '評価システム上の役割の任命',
                'name': '評価システム上の役割の任命',
            },
            'appraisalParameter': {
                'add': 'コンピテンシーパラメーターの追加',
                'edit': 'コンピテンシーパラメーターの編集',
                'view': 'コンピテンシーパラメーター',
                'name': 'コンピテンシーパラメーター'
            },
            'companyParameter': {
                'add': '会社目標連動パラメーターの追加',
                'edit': '会社目標連動パラメーターの編集',
                'view': '会社目標連動パラメーター',
                'name': '会社目標連動パラメーター'
            },
            'appraisalPlan': {
                'add': '評価制度タイムラインの追加',
                'edit': '評価制度タイムラインの編集',
                'view': '評価制度タイムライン',
                'name': '評価制度タイムライン',
                'addParti': '参加者の追加',
                'addAppraiser': '評価者の追加',
                'editAppraiser': '評価者の編集',
                'listEmp': '従業員',
                'addGAppraiser': 'グループ評価者の追加',
                'consolidationSheet': '評価結果統合シート',
                'finalASheet': '評価結果統合シート',
                'consolidate': 'Consolidate Sheet',
                'finalApprover': '評価結果統合シート',
                'endTermEva': "最終評価",
                'participants': '参加者',
                'generateFinalReport': "最終レポートを作成",
                "generateEndtermReport": "最終評価レポートを作成",
                "configureTimeline": "タイムラインを構成",
                "startFinalApproverProcess": "最終承認プロセスの開始",
                "startConsolidationProcess": "評価結果統合プロセスの開始",
                "generateMidtermReport": "中間評価レポートを作成",
                "startEndtermProcess": "最終評価プロセスの開始",
                "midtermReview": "中間評価レビュー",
                "generateObjectiveReport": "目標設定レポートを作成",
                "startMidtermReviewProcess": "中間評価プロセスのスタート",
                "startAppraisalPlan": "評価計画の開始",
                "objectivesetup": "目標設定",
            },
            'myAppraisees': {
                'add': '',
                'edit': '',
                'view': '私の被評価者',
                'name': '私の被評価者'
            },
         
            'notification': {
                'add': '',
                'edit': '',
                'view': '通知'
            },
            'report': {
                'name': "レポート"
            },
            'delete': '削除',
            'cancel': 'キャンセル',
            'close': '閉じる',
            'ok': 'Ok',
            'no': '番号',
            'yes': 'はい',
            'info': '情報',
            'add': '追加',
            'send': '送る',
            'submit': '提出',
            'update': '更新',
            'create': '作成',
            'upload': 'アップロード',
            'approve': '承認',
            'notes': '注',
            'revise': '修正',
            'save': '保存',
            'export': '書き出す',
            'appRating': '評価者による評価',
            'confiTime': 'タイムラインの設定',
            'offlineHistory': 'オフラインミーティング履歴',
            'sendAlert': 'アラートを送る',
            'continue': '続く',
            'alreadyExistEmp': '既に退職した従業員',
            'dashboard': 'ダッシュボード'
        },
        companyTable: { sNo: '番号', companyName: '会社名', email: 'メールアドレス', companyType: '会社の種類', status: 'ステータス', creationDate: '作成日', action: 'アクション' },
        unitTable: { sNo: '番号', unitName: 'ユニット名', userName: 'ユーザー名', mobile: '携帯電話番号', employeeName: '従業員の名前', action: 'アクション' },
        deptTable: { sNo: '番号', deptName: '部署名', unit: 'ユニット', action: 'アクション' },
        sectionTable: { sNo: '番号', sectionName: 'セクション名', unitName: 'ユニット', deptName: '部署', action: 'アクション' },
        competencyTable: { sNo: '番号', name: '名前', parameter: '指標', assignedTo: '役割の任命', action: 'アクション' },
        comParaTable: { sNo: '番号', name: '名前', parameter: '指標', assignedTo: '役割の任命', action: 'アクション' },
        groupTable: { sNo: '番号', groupName: 'グループ名', action: 'アクション' },
        employeeTable: { sNo: '番号', empName: '従業員の名前', deptName: '部署', email: 'メールアドレス', phone: '電話番号', designation: '役職', action: 'アクション' },
        empTypeTable: { sNo: '番号', empType: '雇用形態', action: 'アクション' },
        roleTable: { sNo: '番号', roleName: '役割を見る', creationDate: '作成日', action: 'アクション' },
        jobTitleTable: { sNo: '番号', designationFrom: '元の役職', designationTo: '新しい役職', presentGrade: '現在の役職での在職年数', capPoint: '最小CAPポイント', rating: '前年度の評価', action: 'アクション' },
        gradeCateTable: { sNo: '番号', gradeCate: 'グレードカテゴリー', action: 'アクション' },
        gradeCodeTable: { sNo: '番号', gradeCate: 'グレードコード', action: 'アクション' },
        comObjTable: { sNo: '番号', from: '開始月／年', to: '終了月／年', summary: 'サマリー', creationDate: '作成日', action: 'アクション' },
        deptObjTable: { sNo: '番号', from: '開始月／年', to: '終了月／年', summary: 'サマリー', creationDate: '作成日', action: 'アクション' },
        empObjTable: { sNo: '番号', from: '開始月／年', to: '終了月／年', summary: 'サマリー', creationDate: '作成日', action: 'アクション' },
        appraisalPlanTable: { sNo: '番号', planName: '評価計画', purpose: '計画の目的', startDate: '開始日', endDate: '終了日', viewObj: '目標を見る', viewAppraisee: '被評価者を見る', viewEmp: '従業員を見る', action: 'アクション' },
        appraiseeTable: { sNo: '番号', name: '名前', deptName: '部署', section: 'セクション', group: 'グループ', status: 'ステータス', action: 'アクション' },
        assignRoleTable: { sNo: '番号', empName: '従業員の名前', email: 'メールアドレス', roleName: '役割を見る', action: 'アクション' },
        planViewTable: { sNo: '番号', name: '名前', objStatus: '目標設定ステータス', appraStatus: '評価者ステータス', midReview: '中間評価ステータス', endReview: '最終評価レビューステータス', action: 'アクション', alert: 'アラート' },
        addPartiTable: { sNo: '番号', select: '全てを選択', apprGroup: '評価グループ名', confi: 'Configured', action: 'アクション' },
        viewPartiTable: { sNo: '番号', name: '名前', apprStatus: '承認者ステータス', action: 'アクション', alert: 'アラート' },
        viewCommentAndRatingTable: { sNo: '番号', appraiserName: '評価者の名前', appraiserType: '評価者のタイプ', term: '期間', para: '指標', rating: '採点', comment: 'Comment' }
    }
};
