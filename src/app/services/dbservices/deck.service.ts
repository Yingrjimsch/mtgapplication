import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Deck } from 'src/app/classes/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  
  readonly deckCollection = 'decks'

  constructor(private userService: UserService) { }

  public getDeckCollection() {
    return this.userService.getUserDoc().collection(this.deckCollection);
  }

  public getDeckDocById(deckId: string) {
    return this.getDeckCollection().doc(deckId);
  }

  public getCardCollectionByDeckId(deckId: string) {
    return this.getDeckCollection().doc(deckId);
  }

  getDecksOfLoggedInUser() {
    return this.getDeckCollection().get().toPromise();
  }

  createDeck(deck: Deck) {
    return this.getDeckCollection().doc(deck.id).set(Object.assign({}, deck));
  }

  deleteDeck(id: string) {
    return this.getDeckCollection().doc(id).delete();
  }

  getDeckById(id: string) {
    return this.getDeckCollection().doc(id);
  }
}
