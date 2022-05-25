import { TestBed } from '@angular/core/testing';

import { WindfarmService } from './windfarm.service';

describe('WindfarmService', () => {
  let service: WindfarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindfarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
