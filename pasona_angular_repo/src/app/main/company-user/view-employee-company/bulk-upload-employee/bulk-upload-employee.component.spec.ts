import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadEmployeeComponent } from './bulk-upload-employee.component';

describe('BulkUploadEmployeeComponent', () => {
  let component: BulkUploadEmployeeComponent;
  let fixture: ComponentFixture<BulkUploadEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
