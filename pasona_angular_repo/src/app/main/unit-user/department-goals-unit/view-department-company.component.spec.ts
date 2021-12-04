import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartmentCompanyComponent } from './view-department-company.component';

describe('ViewDepartmentCompanyComponent', () => {
  let component: ViewDepartmentCompanyComponent;
  let fixture: ComponentFixture<ViewDepartmentCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDepartmentCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepartmentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
