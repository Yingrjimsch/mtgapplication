export class Deck {

  constructor(id: string, deckName: string) {
    this.id = id;
    this.deckName = deckName;
    this.numberOfCards = 0;
  }

  public id: string;
  public deckName: string;
  public numberOfCards: number;
  public legality: string;
}
