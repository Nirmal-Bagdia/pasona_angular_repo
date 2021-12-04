import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppraisalPlanDailogComponent } from './add-appraisal-plan-dailog.component';

describe('AddAppraisalPlanDailogComponent', () => {
  let component: AddAppraisalPlanDailogComponent;
  let fixture: ComponentFixture<AddAppraisalPlanDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppraisalPlanDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppraisalPlanDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
