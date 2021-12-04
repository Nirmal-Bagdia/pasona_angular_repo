import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmptypeComponent } from './view-emptype.component';

describe('ViewEmptypeComponent', () => {
  let component: ViewEmptypeComponent;
  let fixture: ComponentFixture<ViewEmptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
