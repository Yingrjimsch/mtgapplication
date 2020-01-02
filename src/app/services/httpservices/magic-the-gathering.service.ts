import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ScannedCard } from '../../classes/scanned-card';
import { Card } from 'src/app/classes/card';
import { UserService } from '../dbservices/user.service';
import { MtgUser } from 'src/app/classes/mtg-user';

@Injectable({
  providedIn: 'root'
})
export class MagicTheGatheringService {

  constructor(public http: Http, private userService: UserService) { }

  getCard(card: ScannedCard) {
    const parameter = card.getLanguage() !== 'english' ? card.getName() + '&language=' + card.getLanguage() : '"' + card.getName() + '"';
    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + parameter);
  }


  //DOWN HERE IS ALL NEW SHIT FROM UPDATE DECEMBER 2019

  getCardSource(name: string, language: string) {
    const parameter = language !== 'english' ? name + '&language=' + language : '"' + name + '"';
    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + parameter);
  }

  /*parseMTGServiceResponse(name: string, language: string) {
    this.getCard(scannedCard).toPromise().then(response => {
      let card = response.json().cards[0];
      card = new Card(card.id, card.name, card.multiverseId);
      // Hier wird die Karte nach Sprache gesucht.
      const foreignCard = card.foreignNames.find(f => (f.language as string).toLowerCase() === this.mtgUser.language.toLowerCase());
      if (foreignCard) {
        card.translate(foreignCard.name, foreignCard.multiverseId);
      };
    });
  }*/

  async getCardByName(name: string) {
    const user = await this.userService.getUser();
    let mtgUser = (user.data() as MtgUser);
    return this.getCardByNameAndLanguage(name, mtgUser.language); 
  }


  async getCardByNameAndLanguage(name: string, language: string) {
    const response = await this.getCardSource(name, language).toPromise();
    let cardSrc = response.json().cards[0];
    var card = new Card(cardSrc.id, cardSrc.name, cardSrc.multiverseid, cardSrc.rarity, cardSrc.colors, cardSrc.cmc, cardSrc.types);
    // Hier wird die Karte nach Sprache gesucht.
    const foreignCard = cardSrc.foreignNames.find(f => (f.language as string).toLowerCase() === language.toLowerCase());
    if (foreignCard) {
      card.translate(foreignCard.name, foreignCard.multiverseid);
    }
    return card;
  }
    /*this.getCard(scannedCard).toPromise().then(response => {
      let card = response.json().cards[0];
      card = new Card(card.id, card.name, card.multiverseId);
      // Hier wird die Karte nach Sprache gesucht.
      const foreignCard = card.foreignNames.find(f => (f.language as string).toLowerCase() === this.mtgUser.language.toLowerCase());
      if (foreignCard) {
        card.translate(foreignCard.name, foreignCard.multiverseId);
      };
    });
  }*/
}
