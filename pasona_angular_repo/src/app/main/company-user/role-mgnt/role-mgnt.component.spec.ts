import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMgntComponent } from './role-mgnt.component';

describe('RoleMgntComponent', () => {
  let component: RoleMgntComponent;
  let fixture: ComponentFixture<RoleMgntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMgntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMgntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
