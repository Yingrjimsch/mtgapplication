export class Card {
  constructor(id: string, name: string, multiverseId: string) {
    this.id = id;
    this.name = name;
    this.multiverseId = multiverseId;
  }

  public id: string;
  public name: string;
  public multiverseId: string;
  public foiled = false;
  public count: number;

  public translate(name: string, multiverseId: string): void {
    this.name = name;
    this.multiverseId = multiverseId;
  }
}
