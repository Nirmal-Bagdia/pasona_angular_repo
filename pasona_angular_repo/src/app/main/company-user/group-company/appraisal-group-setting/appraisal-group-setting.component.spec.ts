import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalGroupSettingComponent } from './appraisal-group-setting.component';

describe('AppraisalGroupSettingComponent', () => {
  let component: AppraisalGroupSettingComponent;
  let fixture: ComponentFixture<AppraisalGroupSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalGroupSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalGroupSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
