import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeCompanyComponent } from './add-employee-company.component';

describe('AddEmployeeCompanyComponent', () => {
  let component: AddEmployeeCompanyComponent;
  let fixture: ComponentFixture<AddEmployeeCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
