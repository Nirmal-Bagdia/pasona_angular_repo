import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectionCompanyComponent } from './edit-section-company.component';

describe('EditSectionCompanyComponent', () => {
  let component: EditSectionCompanyComponent;
  let fixture: ComponentFixture<EditSectionCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSectionCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSectionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
