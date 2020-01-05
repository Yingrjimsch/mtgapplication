import { Injectable } from '@angular/core';
import { Card } from '../../classes/card';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { DeckService } from './deck.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private firestore: AngularFirestore, private authentication: AngularFireAuth, private userService: UserService, private deckService: DeckService) { }

  readonly cardCollection = 'cards';

  /*async addCard(card: Card) {
    return this.checkForExistingCard(card.multiverseId).then(c => {
      if (c.size !== 0) {
        return c.docs[0].id;
      }
      return this.firestore.collection(this.cardCollection).add({
        name: card.name,
        multiverseId: card.multiverseId,
        imgPath: card.multiverseId,
        foiled: card.foiled
      }).then(ac => ac.id).catch(() => {throw 'Something went wrong while adding card.'});
    }).catch(() => {throw 'Something went wrong while checking for existing card.'});
  }

  checkForExistingCard(multiverseId: string) {
    return this.firestore.collection(this.cardCollection, q => q.where('multiverseId', '==', multiverseId)).get().toPromise();
  }

  getCardById2(cardId: string) {
    return this.firestore.collection(this.cardCollection).doc(cardId);
  }

  getMyCards(): AngularFirestoreCollection<Card> {
    return this.firestore.collection(this.cardCollection, ref => ref.where('own', '==', true));
  }
*/

  // After Update December 2019

  public getCardCollection(doc: AngularFirestoreDocument) {
    //return this.userService.getUserDoc()
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
    //return this.getCardCollection().doc(card.id).update(Object.assign({}, card));
  }

  addCard(doc: AngularFirestoreDocument,card: Card) {
    return this.getCardCollection(doc).doc(card.id).set(Object.assign({}, card));
  }
/*
  getAllCardsByDeck(id: string) {
    return this.deckService.getDeckById(id).collection(this.cardCollection).get().toPromise();
  }

  updateCardFromDeck(id: string, card: Card) {
    return this.deckService.getDeckById(id).collection(this.cardCollection).doc(card.id).update(Object.assign({}, card));
  }

  deleteCardFromDeck(deckId: string, cardId: string) {
    return this.deckService.getDeckById(deckId).collection(this.cardCollection).doc(cardId).delete();
  }

  addCardToDeck(deckId: string, card: Card) {
    return this.deckService.getDeckById(deckId).collection(this.cardCollection).doc(card.id).set(Object.assign({}, card));
  }

  checkIfCardExistsInDeck(deckId: string, cardId: string) {
    return this.deckService.getDeckById(deckId).collection(this.cardCollection).doc(cardId).get().toPromise();
  }*/
}
