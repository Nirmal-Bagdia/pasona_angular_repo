import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionCompanyComponent } from './add-section-company.component';

describe('AddSectionCompanyComponent', () => {
  let component: AddSectionCompanyComponent;
  let fixture: ComponentFixture<AddSectionCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSectionCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
