import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDailogComponent } from './comment-dailog.component';

describe('CommentDailogComponent', () => {
  let component: CommentDailogComponent;
  let fixture: ComponentFixture<CommentDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
