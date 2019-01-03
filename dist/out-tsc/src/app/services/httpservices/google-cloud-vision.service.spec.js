import { TestBed } from '@angular/core/testing';
import { GoogleCloudVisionService } from './google-cloud-vision.service';
describe('GoogleCloudVisionService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(GoogleCloudVisionService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=google-cloud-vision.service.spec.js.map