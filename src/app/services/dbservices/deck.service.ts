import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Deck } from 'src/app/classes/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  
  readonly deckCollection = 'decks'

  constructor(private userService: UserService) { }

  public getDeckDoc() {
    return this.userService.getUserDoc().collection(this.deckCollection);
  }

  getDecksOfLoggedInUser() {
    return this.getDeckDoc().get().toPromise();
  }

  createDeck(deck: Deck) {
    return this.getDeckDoc().doc(deck.id).set(Object.assign({}, deck));
  }

  deleteDeck(id: string) {
    return this.getDeckDoc().doc(id).delete();
  }
}
