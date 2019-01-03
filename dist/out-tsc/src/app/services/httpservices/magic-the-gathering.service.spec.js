import { TestBed } from '@angular/core/testing';
import { MagicTheGatheringService } from './magic-the-gathering.service';
describe('MagicTheGatheringService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MagicTheGatheringService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=magic-the-gathering.service.spec.js.map