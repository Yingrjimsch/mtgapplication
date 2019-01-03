import { Injectable } from '@angular/core';
import { CardCollection } from '../../classes/card-collection';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Card } from 'src/app/classes/card';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionService {
  private cardCollectionsPath = this.firestore.collection('cardCollections');
  private card_collectionPath = this.firestore.collection('card_collection');

  constructor(private firestore: AngularFirestore) {
  }

  addCardToCollection(collectionId: string, card: Card) {
    this.firestore.collection('card_collection', q => q.where('cardCollectionId', '==', collectionId).where('cardId', '==', card.id))
      .get().toPromise().then(c => {
        if (c.size === 0) {
          this.card_collectionPath.add({
            number: 1,
            cardCollectionId: collectionId,
            cardId: card.id
          })
        }
        else {
          const doc = c.docs[0];
          this.card_collectionPath.doc(doc.id).update({
            number: ++doc.data()['number']
          })
        }
        this.updateCollectionCardNumber(collectionId);
      }).catch(() => { throw 'Something went wrong while adding card to collection(' + collectionId + ')' })
  }

  updateCollectionCardNumber(collectionId: string): any {
    const doc = this.cardCollectionsPath.doc(collectionId);
    doc.get().toPromise().then(d => {
      doc.update({
        numberOfCards: ++d.data()['numberOfCards']
      })

    })
  }

  /*addCardReference(collectionId: string, card: Card) {
    this.cardCollectionsPath.doc(collectionId).
      collection('cards').get().toPromise().then(d => {
        const doc = d.docs.find(d => d.id === card.id);
        const cardDocument = this.cardCollectionsPath.doc(collectionId).collection('cards').doc(card.id);
        if (!doc.exists) {
          cardDocument.set({});
        }
        else {
          let numberOfCards = doc.data()['numberOfCards'];
          cardDocument.update({
            numberOfCards: numberOfCards ? ++numberOfCards : 1
          })
        }
      })
  }*/

  getAllCollectionsToSubscribe() {
    return this.cardCollectionsPath.snapshotChanges().pipe(
      map(changes => changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    );
  }

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
    })
    // cardCollection.cards.forEach(c => this.firestore.collection(this.cardCollectionsPath).doc(cardCollection.id).collection('cards').doc());
  }

  getCardsByCollection(collectionId: string) {
    this.cardCollectionsPath
      .doc(collectionId)
      .collection('cards').get().toPromise()
      .then(c => c.docs.map(c => c.id).forEach(c => console.log(c)));
  }

  deleteCardCollection(collectionId: string) {
    this.cardCollectionsPath.doc(collectionId).delete();
    this.firestore.collection('card_collection', q => q.where('cardCollectionId', '==', collectionId)).get().toPromise().then(c => c.docs.forEach(d => this.card_collectionPath.doc(d.id).delete()))

  }

}
