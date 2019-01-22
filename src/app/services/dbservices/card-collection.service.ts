import { Injectable } from '@angular/core';
import { CardCollection } from '../../classes/card-collection';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Card } from 'src/app/classes/card';
import { CardService } from './card.service';
import { pipe, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionService {
  private cardCollectionsPath = this.firestore.collection('cardCollections');
  private card_collectionPath = this.firestore.collection('card_collection');

  constructor(private firestore: AngularFirestore, public cardService: CardService) {
  }

  addCardTOCollection2(collectionId: string, card: Card) {
    this.firestore.collection('cardCollections').doc(collectionId)
      .collection('cards', q => q.where('multiverseId', '==', card.multiverseId)).get()
      .toPromise().then(c => {
        if (c.size === 0) {
          this.firestore.collection('cardCollections').doc(collectionId)
            .collection('cards').doc(card.multiverseId).set({ count: 1, ...card });
        } else {
          this.firestore.collection('cardCollections').doc(collectionId)
            .collection('cards').doc(card.multiverseId).update({
              number: ++c.docs[0].data()['number']
            });
        }
        this.updateCollectionCardNumber(collectionId);
      });
  }


  addCardToCollection(collectionId: string, card: Card) {
    this.firestore.collection('card_collection', q => q.where('cardCollectionId', '==', collectionId)
      .where('cardId', '==', card.id))
      .get().toPromise().then(c => {
        if (c.size === 0) {
          this.card_collectionPath.add({
            number: 1,
            cardCollectionId: collectionId,
            cardId: card.id
          });
        } else {
          const doc = c.docs[0];
          this.card_collectionPath.doc(doc.id).update({
            number: ++doc.data()['number']
          });
        }
        this.updateCollectionCardNumber(collectionId);
      }).catch(() => { throw 'Something went wrong while adding card to collection(' + collectionId + ')' });
  }

  private updateCollectionCardNumber(collectionId: string): any {
    const doc = this.cardCollectionsPath.doc(collectionId);
    doc.get().toPromise().then(d => {
      doc.update({
        numberOfCards: ++d.data()['numberOfCards']
      });

    });
  }

  // Usable to display all collection which can change.
  getAllCollectionsToSubscribe() {
    return this.cardCollectionsPath.snapshotChanges().pipe(
      map(changes => changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    );
  }

  // Usable to display all Collection once
  getAllCollectionsAsPromise() {
    return this.cardCollectionsPath.get().toPromise();
  }

  createCollection(cardCollection: CardCollection): void {
    this.cardCollectionsPath.add({
      name: cardCollection.name,
      numberOfCards: cardCollection.numberOfCards
    });
  }

  updateCollection(cardCollection: CardCollection): void {
    this.cardCollectionsPath.doc(cardCollection.id).update({
      name: cardCollection.name,
    });
    // cardCollection.cards.forEach(c => this.firestore.collection(this.cardCollectionsPath)
    // .doc(cardCollection.id).collection('cards').doc());
  }

  getCardsByCollection(collectionId: string) {
    return this.firestore.collection('card_collection', q => q.where('cardCollectionId', '==', collectionId)).snapshotChanges()
      .pipe(
        map(c => /*{*/
          c.map(a => ({ cardId: a.payload.doc.data()['cardId'], ...this.cardService.getCardById2(a.payload.doc.data()['cardId'])}))
        // this.cardService.getCardById2('hVDpwIEn1P4xxqVYJWeg').toPromise()
        // .then(c2 => c.map(d => ({numberOfCards: d.payload.doc.data()['number'], ...c2})))
        // c.map(d => ({numberOfCards: d.payload.doc.data()['number'],
        // ...this.cardService.getCardById2(d.payload.doc.data()['cardId']).toPromise().then(c => {return c as Card})[0]} as Card))})
      ));
  }

  deleteCardCollection(collectionId: string) {
    // Deletes the collection
    this.cardCollectionsPath.doc(collectionId).delete();
    // Deletes all relations between the collection and its cards
    this.firestore.collection('card_collection', q => q.where('cardCollectionId', '==', collectionId))
      .get().toPromise()
      .then(c => c.docs.forEach(d => this.card_collectionPath.doc(d.id).delete()));
  }

}
