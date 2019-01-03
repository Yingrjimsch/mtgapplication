import { TestBed } from '@angular/core/testing';

import { MagicTheGatheringService } from './magic-the-gathering.service';

describe('MagicTheGatheringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MagicTheGatheringService = TestBed.get(MagicTheGatheringService);
    expect(service).toBeTruthy();
  });
});
