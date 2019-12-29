import { Injectable } from '@angular/core';
import { Card } from '../../classes/card';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CachedResourceLoader } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_cache';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  
  cardCollection = 'cards';
  constructor(private firestore: AngularFirestore, private authentication: AngularFireAuth, private userService: UserService) { }

  async addCard(card: Card) {
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

  public getCardCollectionDoc() {
    return this.userService.getUserDoc().collection(this.cardCollection);
  }

  getCardCollectionOfLoggedInUser() {
    return this.getCardCollectionDoc().get().toPromise();
  }

  public deleteCardFromCollection(id: string) {
   console.log(id); 
   return this.getCardCollectionDoc().doc(id).delete();
  }

  updateCard(card: Card) {
    return this.getCardCollectionDoc().doc(card.id).update(card);
  }
}
