import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalParameterDailogComponent } from './appraisal-parameter-dailog.component';

describe('AppraisalParameterDailogComponent', () => {
  let component: AppraisalParameterDailogComponent;
  let fixture: ComponentFixture<AppraisalParameterDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalParameterDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalParameterDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
