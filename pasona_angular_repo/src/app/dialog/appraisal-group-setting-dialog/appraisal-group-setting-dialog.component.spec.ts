import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalGroupSettingDialogComponent } from './appraisal-group-setting-dialog.component';

describe('AppraisalGroupSettingDialogComponent', () => {
  let component: AppraisalGroupSettingDialogComponent;
  let fixture: ComponentFixture<AppraisalGroupSettingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalGroupSettingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalGroupSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
