export class CardCollection {
  public id: string;
  public deckName: string;
  public numberOfCards = 0;

  constructor(deckName: string) {
    this.deckName = deckName;
  }
}
