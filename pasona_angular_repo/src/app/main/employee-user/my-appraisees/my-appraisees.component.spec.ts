import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppraiseesComponent } from './my-appraisees.component';

describe('MyAppraiseesComponent', () => {
  let component: MyAppraiseesComponent;
  let fixture: ComponentFixture<MyAppraiseesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppraiseesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppraiseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
