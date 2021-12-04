import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeGroupDialogComponent } from './relative-group-dialog.component';

describe('RelativeGroupDialogComponent', () => {
  let component: RelativeGroupDialogComponent;
  let fixture: ComponentFixture<RelativeGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativeGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
