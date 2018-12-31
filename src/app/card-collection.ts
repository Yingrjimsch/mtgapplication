import { Card } from './card';

export class CardCollection {
  private name: string;
  private cards: Array<Card> = new Array<Card>();
  private legality: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getNumberOfCards(): number {
    return this.cards.length;
  }

  getLegality() {
    return this.legality;
  }
}
