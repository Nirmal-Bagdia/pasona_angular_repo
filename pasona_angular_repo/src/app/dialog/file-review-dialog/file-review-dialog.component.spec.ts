import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewDialogComponent } from './file-review-dialog.component';

describe('FileReviewDialogComponent', () => {
  let component: FileReviewDialogComponent;
  let fixture: ComponentFixture<FileReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
