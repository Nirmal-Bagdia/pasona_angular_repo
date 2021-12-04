import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalParameterComponent } from './appraisal-parameter.component';

describe('AppraisalParameterComponent', () => {
  let component: AppraisalParameterComponent;
  let fixture: ComponentFixture<AppraisalParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
