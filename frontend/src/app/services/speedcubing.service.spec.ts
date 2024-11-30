import { TestBed } from '@angular/core/testing';

import { SpeedcubingService } from './speedcubing.service';

describe('SpeedcubingService', () => {
  let service: SpeedcubingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedcubingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
