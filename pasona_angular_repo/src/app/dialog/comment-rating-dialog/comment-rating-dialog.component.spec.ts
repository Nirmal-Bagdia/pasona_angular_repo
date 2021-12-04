import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRatingDialogComponent } from './comment-rating-dialog.component';

describe('CommentRatingDialogComponent', () => {
  let component: CommentRatingDialogComponent;
  let fixture: ComponentFixture<CommentRatingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentRatingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
