import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionCompanyComponent } from './view-section-company.component';

describe('ViewSectionCompanyComponent', () => {
  let component: ViewSectionCompanyComponent;
  let fixture: ComponentFixture<ViewSectionCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSectionCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
