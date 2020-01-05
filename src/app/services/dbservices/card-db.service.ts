import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Card } from 'src/app/classes/card';

@Injectable({
  providedIn: 'root'
})
export class CardDbService {
  constructor() { }

  readonly cardCollection = 'cards';
  public getCardCollection(doc: AngularFirestoreDocument) {
    return doc.collection(this.cardCollection);
  }

  public getCards(doc: AngularFirestoreDocument) {
    return this.getCardCollection(doc).get().toPromise();
  }

  public deleteCard(doc: AngularFirestoreDocument, cardId: string) {
   return this.getCardCollection(doc).doc(cardId).delete();
  }

  public checkIfCardExists(doc: AngularFirestoreDocument, cardId: string) {
    return this.getCardCollection(doc).doc(cardId).get().toPromise();
  }

  updateCard(doc: AngularFirestoreDocument, card: Card) {
    return this.getCardCollection(doc).doc(card.id).update(Object.assign({}, card));
  }

  addCard(doc: AngularFirestoreDocument,card: Card) {
    return this.getCardCollection(doc).doc(card.id).set(Object.assign({}, card));
  }
}
