import { TestBed } from '@angular/core/testing';

import { CardCollectionService } from './card-collection.service';

describe('CardCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardCollectionService = TestBed.get(CardCollectionService);
    expect(service).toBeTruthy();
  });
});
