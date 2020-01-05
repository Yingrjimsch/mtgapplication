import { TestBed } from '@angular/core/testing';

import { CardDbService } from './card-db.service';

describe('CardDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardDbService = TestBed.get(CardDbService);
    expect(service).toBeTruthy();
  });
});
