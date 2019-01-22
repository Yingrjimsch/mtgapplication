import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Card } from 'src/app/classes/card';
import { CardCollection } from 'src/app/classes/card-collection';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getDecksByUserId(id: string, isArchive: boolean = false) {
    return this.firestore.collection('decks', q => q.where('userId', '==', id).where('isArchive', '==', isArchive)).snapshotChanges().pipe(
      map(changes => changes.map(deck => ({ id: deck.payload.doc.id, ...deck.payload.doc.data() }) as CardCollection)
      )
    );
  }

  getCardsByDeckId(id: string) {
    return this.firestore.collection('decks').doc(id).collection('cards').snapshotChanges().pipe(
      map(changes => changes.map(card => ({ id: card.payload.doc.id, ...card.payload.doc.data() }))
      )
    );
  }

  createDeck(userId: string, deckName: string) {
    this.firestore.collection('decks').add({
      userId: userId,
      numberOfCards: 0,
      deckName: deckName
    });
  }

  updateDeck(deck: CardCollection) {
    this.firestore.collection('decks').doc(deck.id).update(Object.assign({}, deck));
  }

  deleteDeck(deckId: string) {
    this.firestore.collection('decks').doc(deckId).delete();
  }

  addCardToDeck(deck: CardCollection, card: Card) {
    const deckRef = this.firestore.collection('decks').doc(deck.id).ref;
    const cardRef = deckRef.collection('cards').doc(card.id);
    return this.firestore.firestore.runTransaction(async transaction => {
      const c = await transaction.get(cardRef);
      if (c.exists) {
        card.count++;
      }
      deck.numberOfCards++;
      transaction.update(deckRef, { numberOfCards: deck.numberOfCards });
      transaction.set(cardRef, Object.assign({}, card));
    });
  }

  updateCard(deck: CardCollection, card: Card) {
    const deckRef = this.firestore.collection('decks').doc(deck.id).ref;
    const cardRef = deckRef.collection('cards').doc(card.id);
    return this.firestore.firestore.runTransaction(async transaction => {
      const c = await transaction.get(cardRef);
      if (c.data()['number'] <= card.count) {
        deck.numberOfCards--;
      }
      transaction.update(deckRef, { numberOfCards: deck.numberOfCards });
      transaction.update(cardRef, Object.assign({}, card));
    });
  }

  removeCardsFromDeck(deck: CardCollection, cardId: string) {
    const deckRef = this.firestore.collection('decks').doc(deck.id).ref;
    const cardRef = deckRef.collection('cards').doc(cardId);
    return this.firestore.firestore.runTransaction(async transaction => {
      deck.numberOfCards--;
      transaction.update(deckRef, { numberOfCards: deck.numberOfCards });
      transaction.delete(cardRef);
    });
  }
}
