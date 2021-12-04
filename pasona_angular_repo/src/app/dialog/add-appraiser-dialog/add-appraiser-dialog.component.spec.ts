import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppraiserDialogComponent } from './add-appraiser-dialog.component';

describe('AddAppraiserDialogComponent', () => {
  let component: AddAppraiserDialogComponent;
  let fixture: ComponentFixture<AddAppraiserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppraiserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppraiserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
