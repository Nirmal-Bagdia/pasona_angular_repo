import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentCompanyComponent } from './edit-department-company.component';

describe('EditDepartmentCompanyComponent', () => {
  let component: EditDepartmentCompanyComponent;
  let fixture: ComponentFixture<EditDepartmentCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepartmentCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepartmentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
