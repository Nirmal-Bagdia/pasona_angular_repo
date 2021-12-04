import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaringConsolidatorViewComponent } from './raring-consolidator-view.component';

describe('RaringConsolidatorViewComponent', () => {
  let component: RaringConsolidatorViewComponent;
  let fixture: ComponentFixture<RaringConsolidatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaringConsolidatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaringConsolidatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
