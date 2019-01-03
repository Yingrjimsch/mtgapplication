import { Injectable } from '@angular/core';
import { CardCollection } from '../../classes/card-collection';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Card } from '../../classes/card';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionService {
  private cardCollectionsPath = this.firestore.collection('cardCollections');

  constructor(private firestore: AngularFirestore) {
  }

  addCardReference(collectionId: string, card: Card) {
    this.cardCollectionsPath.doc(collectionId).
      collection('cards').get().toPromise().then(d => {
        const doc = d.docs.find(d => d.id === card.id);
        if (!doc.exists) {
          this.cardCollectionsPath.doc(collectionId).collection('cards').doc(card.id).set({});
        }
        else {
          let numberOfCards = doc.data()['numberOfCards'];
          this.cardCollectionsPath.doc(collectionId).collection('cards').doc(card.id).update({
            numberOfCards:  numberOfCards ? ++numberOfCards : 1
          })
        }
      })
  }

  getAllCollections() {
    return this.cardCollectionsPath.snapshotChanges().pipe(
      map(changes => changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    );
  }

  createCollection(cardCollection: CardCollection): void {
    this.cardCollectionsPath.add({
      name: cardCollection.name
    });
  }

  updateCollection(cardCollection: CardCollection): void {
    this.cardCollectionsPath.doc(cardCollection.id).update({
      name: cardCollection.name,
      legality: cardCollection.legality,
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
    this.cardCollectionsPath.doc(collectionId).delete()
  }
}
