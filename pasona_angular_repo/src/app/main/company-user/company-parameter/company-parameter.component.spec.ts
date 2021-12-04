import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyParameterComponent } from './company-parameter.component';

describe('CompanyParameterComponent', () => {
  let component: CompanyParameterComponent;
  let fixture: ComponentFixture<CompanyParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
