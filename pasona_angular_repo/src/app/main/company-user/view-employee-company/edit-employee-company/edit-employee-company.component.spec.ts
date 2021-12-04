import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeCompanyComponent } from './edit-employee-company.component';

describe('EditEmployeeCompanyComponent', () => {
  let component: EditEmployeeCompanyComponent;
  let fixture: ComponentFixture<EditEmployeeCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployeeCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
