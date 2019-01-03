import { TestBed } from '@angular/core/testing';
import { CardCollectionService } from './card-collection.service';
describe('CardCollectionService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CardCollectionService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=card-collection.service.spec.js.map