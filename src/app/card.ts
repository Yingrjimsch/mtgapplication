export class Card {
  constructor(name: string, multiverseId: string, imgPath: string) {
    this.name = name;
    this.multiverseId = multiverseId;
    this.imgPath = imgPath;
    this.own = false;
    this.numberOfCards = 1;
    this.foiled = false;
  }
  private name: string;
  private multiverseId: string;
  private imgPath: string;
  private own: boolean;
  private numberOfCards: number;
  private foiled: boolean;

  getImgPath(): string {
    return this.imgPath;
  }

  getName(): string {
    return this.name;
  }

  getNumberOfCards(): number {
    return this.numberOfCards;
  }
}
