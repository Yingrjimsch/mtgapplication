
export class Card {

  constructor(id: string, name: string, multiverseId: string, rarity: string, colors: string[], cmc: number, types: string[]) {
    this.id = id;
    this.name = name;
    this.multiverseId = multiverseId;
    this.rarity = rarity;
    this.colors = colors;
    this.cmc = cmc >= 7 ? '7+' : cmc.toString();
    this.types = types;
    this.count = 1;
  }

  public count: number;
  public foiled = false;
  
  public id: string;
  public name: string;
  public multiverseId: string;
  public rarity: string;
  public colors: string[];
  public cmc: string;
  public types: string[];

  public translate(name: string, multiverseId: string): void {
    this.name = name;
    this.multiverseId = multiverseId;
  }
}
