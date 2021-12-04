import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnitCompanyComponent } from './view-unit-company.component';

describe('ViewUnitCompanyComponent', () => {
  let component: ViewUnitCompanyComponent;
  let fixture: ComponentFixture<ViewUnitCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUnitCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnitCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
