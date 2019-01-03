export class Card {
  constructor(name: string, multiverseId: string, imgPath: string) {
    this.name = name;
    this.multiverseId = multiverseId;
    this.imgPath = imgPath;
    this.own = false;
    this.foiled = false;
  }
  
  public id: string;
  public name: string;
  public multiverseId: string;
  public imgPath: string;
  public own: boolean;
  public foiled: boolean;
}