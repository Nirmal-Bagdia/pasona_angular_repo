import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyParameterDialogComponent } from './company-parameter-dialog.component';

describe('CompanyParameterDialogComponent', () => {
  let component: CompanyParameterDialogComponent;
  let fixture: ComponentFixture<CompanyParameterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyParameterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyParameterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
