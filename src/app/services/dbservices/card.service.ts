import { Injectable } from '@angular/core';
import { Card } from '../../classes/card';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardPath: string = 'cards';
  constructor(private firestore: AngularFirestore) { }
  
  addCard(card: Card) {
    return this.checkForExistingCard(card.multiverseId).then(c => {
      if (c.size !== 0) {
        return c.docs[0].id;
      }
      return this.firestore.collection(this.cardPath).add({
        name: card.name,
        multiverseId: card.multiverseId,
        imgPath: card.imgPath,
        own: card.own,
        numberOfCards: card.numberOfCards,
        foiled: card.foiled
      }).then(ac => { return ac.id;});
    })
  }

  checkForExistingCard(multiverseId: string) {
    return this.firestore.collection(this.cardPath, q => q.where('multiverseId', '==', multiverseId)).get().toPromise();
  }

  // Not used
  getCardById(id: string): Card[] {
    let cards: Card[];
    this.firestore.collection(this.cardPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    ).toPromise().then((c: Card[]) => cards = c)
    return cards;
  }

  getMyCards(): AngularFirestoreCollection<Card> {
    return this.firestore.collection(this.cardPath, ref => ref.where('own', '==', true));
  }
}
