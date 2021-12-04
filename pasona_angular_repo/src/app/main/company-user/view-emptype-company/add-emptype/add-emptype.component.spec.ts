import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmptypeComponent } from './add-emptype.component';

describe('AddEmptypeComponent', () => {
  let component: AddEmptypeComponent;
  let fixture: ComponentFixture<AddEmptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
