import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnitCompanyComponent } from './edit-unit-company.component';

describe('EditUnitCompanyComponent', () => {
  let component: EditUnitCompanyComponent;
  let fixture: ComponentFixture<EditUnitCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnitCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnitCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
