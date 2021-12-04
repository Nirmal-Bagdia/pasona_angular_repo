import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitCompanyComponent } from './add-unit-company.component';

describe('AddUnitCompanyComponent', () => {
  let component: AddUnitCompanyComponent;
  let fixture: ComponentFixture<AddUnitCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUnitCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnitCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
