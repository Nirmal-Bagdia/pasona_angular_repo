import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeCompanyComponent } from './view-employee-company.component';

describe('ViewEmployeeCompanyComponent', () => {
  let component: ViewEmployeeCompanyComponent;
  let fixture: ComponentFixture<ViewEmployeeCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployeeCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
