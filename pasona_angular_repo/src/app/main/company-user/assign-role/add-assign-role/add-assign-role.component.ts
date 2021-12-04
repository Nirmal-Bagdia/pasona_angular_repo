import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { Router } from '@angular/router';
import { RoleModule } from '../../../shared/roleModule';

@Component({
  selector: 'app-add-assign-role',
  templateUrl: './add-assign-role.component.html',
  styleUrls: ['./add-assign-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddAssignRoleComponent implements OnInit {
  roleForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  moduleData: any[];
  userData: any;
  moduleids: any[];
  errorShow: boolean;
  sectionData: any[] = [];
  departmentData: any[] = [];
  unitData: any[] = [];
  filterForm: FormGroup;
  employeeData: any[] = [];
  rolesData: any[] = [];
  urlCurrent: string;
  constructor(
    private fb: FormBuilder, private pasonaService: PasonaServiceService, public router: Router
  ) {
    this.moduleids = [];
    this.errorShow = false;
    this._unsubscribeAll = new Subject();
    this.moduleData = [];
    this.moduleData = RoleModule;
    this.moduleData.forEach((element) => {
      element.checked = false;
      element.writeOperation = false;
    });
    // console.log("this.moduleData", this.moduleData);
    this.userData = this.pasonaService.getUserData();
    this.roleForm = this.fb.group({
      empId: ['', [Validators.required]],
      roleId: ['', Validators.required]
    });
    this.filterForm = this.fb.group({
      companyId: [this.userData.companyId,],
      unitId: ['',],
      depId: ['',],
      sectionId: ['',]
    });
    if (this.userData.userType == '2') {
      this.urlCurrent = "/company/assignRole";
    }
    else if (this.userData.userType == '4') {
      this.urlCurrent = "/employee/assignRole";
    }
  }

  ngOnInit() {
    this.getAllUnitDataByCompanyId(this.userData.companyId);
    this.getAllRoleData();
  }

  get f() { return this.roleForm.controls; };

  getAllRoleData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getAllRole(this.userData.companyId).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.rolesData = resp.rolesDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  assignRole() {
    if (this.roleForm.valid) {
      var modules = [];
      modules.push(this.roleForm.value.empId);
      var data = {
        "empId": modules,
        "roleId": this.roleForm.value.roleId
      }
      this.pasonaService.startSpinner();
      this.pasonaService.addAssignRole(data).subscribe(dataRes => {
      this.pasonaService.stopSpinner();
        if (dataRes.status == '1') {
          this.pasonaService.openSnackBar(dataRes.message);
          this.router.navigate([this.urlCurrent]);
        }
        else {
          this.pasonaService.infoMessage(dataRes.message);
        }
      }, error => {
        this.pasonaService.stopSpinner();
        this.pasonaService.openSnackBarError('Please connect to server!');
      });
    }
    else {
      this.errorShow = true;
      this.roleForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  getAllUnitDataByCompanyId(id) {
    this.employeeData = [];
    this.roleForm.patchValue({ empId: '' });
    this.pasonaService.startSpinner();
    this.pasonaService.getUnitByCompanyId(id).subscribe(resp => {
    this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.unitData = resp.unitDetails;
        this.getAllEmployeeData();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllDepartmentDataByUnitId(id) {
    this.employeeData = [];
    this.roleForm.patchValue({ empId: '' });
    this.pasonaService.startSpinner();
    this.filterForm.patchValue({ sectionId: '', depId: '' });
    this.sectionData = [];
    this.departmentData = [];
    this.pasonaService.getDepartmentByUnitId(id).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.departmentData = resp.departmentDetails;
        this.getAllEmployeeData();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllSectionDataByDepartmentId(id) {
    this.employeeData = [];
    this.roleForm.patchValue({ empId: '' });
    this.filterForm.patchValue({ sectionId: '' });
    this.sectionData = [];
    this.pasonaService.startSpinner();
    this.pasonaService.getSectionByDepartmentId(id).subscribe(resp => {
    this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.sectionData = resp.sectionDetails;
        this.getAllEmployeeData();
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }

  getAllEmployeeData() {
    this.pasonaService.startSpinner();
    this.pasonaService.getEmployeeByFilter(this.filterForm.value).subscribe(resp => {
      this.pasonaService.stopSpinner();
      if (resp.status == '1') {
        this.employeeData = resp.employeeDetails;
      }
    }, error => {
      this.pasonaService.stopSpinner();
    })
  }
  

  roleGet(empId)
  {
    this.employeeData.forEach((element, i) => {
      if (element.id === empId) {
        this.roleForm.patchValue({roleId:element.roleId});
      }
    });
  }
}

