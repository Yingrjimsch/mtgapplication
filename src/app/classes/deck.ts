export class Deck {
  
  constructor(id: string, deckName: string) {
    this.id = id;
    this.deckName = deckName;
  }

  public id: string;
  public deckName: string;
  public numberOfCards = 0;
}
