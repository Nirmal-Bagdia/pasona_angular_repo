import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassDialogComponent } from './forgot-pass-dialog.component';

describe('ForgotPassDialogComponent', () => {
  let component: ForgotPassDialogComponent;
  let fixture: ComponentFixture<ForgotPassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
