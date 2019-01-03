import { Card } from './card';

export class CardCollection {
  public id: string;
  public name: string;
  public cards: Array<Card> = new Array<Card>();
  public legality: string;

  constructor(name: string) {
    this.name = name;
  }

  getNumberOfCards(): number {
    return this.cards.length;
  }
}
