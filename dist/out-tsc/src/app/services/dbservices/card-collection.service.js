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
import { CardCollection } from '../../classes/card-collection';
import { AngularFirestore } from '@angular/fire/firestore';
var CardCollectionService = /** @class */ (function () {
    function CardCollectionService(firestore) {
        this.firestore = firestore;
        this.cardCollectionsPath = 'cardCollections';
    }
    CardCollectionService.prototype.getAllCollections = function () {
        return this.firestore.collection(this.cardCollectionsPath);
    };
    CardCollectionService.prototype.createCollection = function (cardCollection) {
        this.firestore.collection(this.cardCollectionsPath).add({
            name: cardCollection.name
        });
    };
    CardCollectionService.prototype.updateCollection = function (cardCollection) {
        this.firestore.collection(this.cardCollectionsPath).doc(cardCollection.id).update({
            name: cardCollection.name,
            legality: cardCollection.legality,
        });
        // cardCollection.cards.forEach(c => this.firestore.collection(this.cardCollectionsPath).doc(cardCollection.id).collection('cards').doc());
    };
    CardCollectionService.prototype.getCardsByCollection = function (collectionId) {
        this.firestore.collection(this.cardCollectionsPath)
            .doc(collectionId)
            .collection('cards').get().toPromise()
            .then(function (c) { return c.docs.map(function (c) { return c.id; }).forEach(function (c) { return console.log(c); }); });
    };
    CardCollectionService.prototype.getCardCollections = function () {
        return [
            new CardCollection('Test Deck 1'),
            new CardCollection('Test Deck 2'),
            new CardCollection('Test Deck 3'),
            new CardCollection('Test Deck 4')
        ];
    };
    CardCollectionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore])
    ], CardCollectionService);
    return CardCollectionService;
}());
export { CardCollectionService };
//# sourceMappingURL=card-collection.service.js.map