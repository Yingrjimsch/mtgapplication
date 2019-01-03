var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
var SettingsService = /** @class */ (function () {
    function SettingsService(firestore) {
        this.firestore = firestore;
        this.settings = 'settings';
    }
    SettingsService.prototype.getLanguage = function () {
        return this.firestore.collection(this.settings).doc('language').get().toPromise();
    };
    SettingsService.prototype.setLanguage = function (l) {
        this.firestore.collection(this.settings).doc('language').update({
            language: l
        });
    };
    SettingsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore])
    ], SettingsService);
    return SettingsService;
}());
export { SettingsService };
//# sourceMappingURL=settings.service.js.map