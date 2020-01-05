import { TestBed } from '@angular/core/testing';

import { CardUiService } from './card-ui.service';

describe('CardUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardUiService = TestBed.get(CardUiService);
    expect(service).toBeTruthy();
  });
});
