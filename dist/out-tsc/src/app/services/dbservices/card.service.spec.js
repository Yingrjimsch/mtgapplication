import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
describe('CardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=card.service.spec.js.map