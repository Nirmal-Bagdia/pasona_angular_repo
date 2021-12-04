import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobTitlesComponent } from './edit-job-titles.component';

describe('EditJobTitlesComponent', () => {
  let component: EditJobTitlesComponent;
  let fixture: ComponentFixture<EditJobTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
