import { Injectable } from '@angular/core';
import { Card } from '../../classes/card';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardPath = 'cards';
  constructor(private firestore: AngularFirestore) { }

  async addCard(card: Card) {
    return this.checkForExistingCard(card.multiverseId).then(c => {
      if (c.size !== 0) {
        return c.docs[0].id;
      }
      return this.firestore.collection(this.cardPath).add({
        name: card.name,
        multiverseId: card.multiverseId,
        imgPath: card.imgPath,
        own: card.own,
        foiled: card.foiled
      }).then(ac => ac.id).catch(() => {throw 'Something went wrong while adding card.'});
    }).catch(() => {throw 'Something went wrong while checking for existing card.'});
  }

  checkForExistingCard(multiverseId: string) {
    return this.firestore.collection(this.cardPath, q => q.where('multiverseId', '==', multiverseId)).get().toPromise();
  }

  // Not used
  getCardById(cardId: string) {
    return this.firestore.collection(this.cardPath).snapshotChanges().pipe(
      map(changes =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    ).toPromise();
  }

  getCardById2(cardId: string) {
    return this.firestore.collection(this.cardPath).doc(cardId);
  }

  getMyCards(): AngularFirestoreCollection<Card> {
    return this.firestore.collection(this.cardPath, ref => ref.where('own', '==', true));
  }
}
