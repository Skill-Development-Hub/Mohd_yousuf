import { TestBed } from '@angular/core/testing';

import { AptitudeService } from './aptitude.service';

describe('AptitudeService', () => {
  let service: AptitudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AptitudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
