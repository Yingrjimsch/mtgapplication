import { Injectable } from '@angular/core';
import { CardCollection } from './card-collection';

@Injectable({
  providedIn: 'root'
})
export class CardCollectionService {
  constructor() {}

  getCardCollections() {
    return [
      new CardCollection('Test Deck 1'),
      new CardCollection('Test Deck 2'),
      new CardCollection('Test Deck 3'),
      new CardCollection('Test Deck 4')
    ];
  }
}
