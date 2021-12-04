import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalGroupDialogComponent } from './appraisal-group-dialog.component';

describe('AppraisalGroupDialogComponent', () => {
  let component: AppraisalGroupDialogComponent;
  let fixture: ComponentFixture<AppraisalGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
