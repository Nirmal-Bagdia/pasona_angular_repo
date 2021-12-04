import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeParticipantComponent } from './employee-participant.component';

describe('EmployeeParticipantComponent', () => {
  let component: EmployeeParticipantComponent;
  let fixture: ComponentFixture<EmployeeParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
