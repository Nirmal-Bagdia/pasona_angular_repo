import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalApproverViewComponent } from './final-approver-view.component';

describe('FinalApproverViewComponent', () => {
  let component: FinalApproverViewComponent;
  let fixture: ComponentFixture<FinalApproverViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalApproverViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalApproverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
