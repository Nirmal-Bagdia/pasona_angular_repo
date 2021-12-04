import { TestBed } from '@angular/core/testing';

import { PasonaServiceService } from './pasona-service.service';

describe('PasonaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasonaServiceService = TestBed.get(PasonaServiceService);
    expect(service).toBeTruthy();
  });
});
