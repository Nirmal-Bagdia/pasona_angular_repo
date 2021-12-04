import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEmployeeComponent } from './group-employee.component';

describe('GroupEmployeeComponent', () => {
  let component: GroupEmployeeComponent;
  let fixture: ComponentFixture<GroupEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
