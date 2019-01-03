var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { map } from 'rxjs/operators';
var CardService = /** @class */ (function () {
    function CardService(firestore) {
        this.firestore = firestore;
        this.cardPath = 'cards';
    }
    CardService.prototype.getCardById = function (id) {
        var cards;
        this.firestore.collection(this.cardPath).snapshotChanges().pipe(map(function (changes) {
            return changes.map(function (a) { return (__assign({ id: a.payload.doc.id }, a.payload.doc.data())); });
        })).toPromise().then(function (c) { return cards = c; });
        return cards;
    };
    CardService.prototype.getMyCards = function () {
        return this.firestore.collection(this.cardPath, function (ref) { return ref.where('own', '==', true); });
    };
    CardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore])
    ], CardService);
    return CardService;
}());
export { CardService };
//# sourceMappingURL=card.service.js.map