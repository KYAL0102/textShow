import { TestBed } from '@angular/core/testing';

import { StndMethodService } from './stnd-method.service';

describe('StndMethodService', () => {
  let service: StndMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StndMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
