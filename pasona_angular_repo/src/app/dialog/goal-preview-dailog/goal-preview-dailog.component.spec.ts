import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPreviewDailogComponent } from './goal-preview-dailog.component';

describe('GoalPreviewDailogComponent', () => {
  let component: GoalPreviewDailogComponent;
  let fixture: ComponentFixture<GoalPreviewDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalPreviewDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalPreviewDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
