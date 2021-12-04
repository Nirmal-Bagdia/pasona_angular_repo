import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignRoleComponent } from './add-assign-role.component';

describe('AddAssignRoleComponent', () => {
  let component: AddAssignRoleComponent;
  let fixture: ComponentFixture<AddAssignRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
