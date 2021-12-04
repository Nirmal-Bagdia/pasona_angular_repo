import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmptypeComponent } from './edit-emptype.component';

describe('EditEmptypeComponent', () => {
  let component: EditEmptypeComponent;
  let fixture: ComponentFixture<EditEmptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
