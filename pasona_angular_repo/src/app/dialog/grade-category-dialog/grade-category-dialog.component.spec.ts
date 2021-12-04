import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCategoryDialogComponent } from './grade-category-dialog.component';

describe('GradeCategoryDialogComponent', () => {
  let component: GradeCategoryDialogComponent;
  let fixture: ComponentFixture<GradeCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
