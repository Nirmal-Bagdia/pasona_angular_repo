import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentCompanyComponent } from './add-department-company.component';

describe('AddDepartmentCompanyComponent', () => {
  let component: AddDepartmentCompanyComponent;
  let fixture: ComponentFixture<AddDepartmentCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmentCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
