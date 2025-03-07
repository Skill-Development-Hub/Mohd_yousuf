import { TestBed } from '@angular/core/testing';

import { AuService } from './au.service';

describe('AuService', () => {
  let service: AuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
