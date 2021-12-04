import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConfiguraionComponent } from './company-configuraion.component';

describe('CompanyConfiguraionComponent', () => {
  let component: CompanyConfiguraionComponent;
  let fixture: ComponentFixture<CompanyConfiguraionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyConfiguraionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConfiguraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
