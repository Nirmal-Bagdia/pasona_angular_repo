import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobTitlesComponent } from './add-job-titles.component';

describe('AddJobTitlesComponent', () => {
  let component: AddJobTitlesComponent;
  let fixture: ComponentFixture<AddJobTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
