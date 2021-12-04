import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalPlanComponent } from './appraisal-plan.component';

describe('AppraisalPlanComponent', () => {
  let component: AppraisalPlanComponent;
  let fixture: ComponentFixture<AppraisalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
