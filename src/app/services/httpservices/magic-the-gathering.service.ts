import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ScannedCard } from '../../classes/scanned-card';
import { Card } from 'src/app/classes/card';
import { UserService } from '../dbservices/user.service';

@Injectable({
  providedIn: 'root'
})
export class MagicTheGatheringService {

  constructor(public http: Http, private userService: UserService) { }

  getCard(card: ScannedCard) {
    const parameter = card.getLanguage() !== 'english' ? card.getName() + '&language=' + card.getLanguage() : '"' + card.getName() + '"';
    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + parameter);
  }

  parseMTGServiceResponse(name: string, language: string) {
    this.getCard(scannedCard).toPromise().then(response => {
      let card = response.json().cards[0];
      card = new Card(card.id, card.name, card.multiverseId);
      // Hier wird die Karte nach Sprache gesucht.
      const foreignCard = card.foreignNames.find(f => (f.language as string).toLowerCase() === this.mtgUser.language.toLowerCase());
      if (foreignCard) {
        card.translate(foreignCard.name, foreignCard.multiverseId);
      };
    });
  }

  parseMTGServiceResponse(name: string) {
    this.getCard(scannedCard).toPromise().then(response => {
      let card = response.json().cards[0];
      card = new Card(card.id, card.name, card.multiverseId);
      // Hier wird die Karte nach Sprache gesucht.
      const foreignCard = card.foreignNames.find(f => (f.language as string).toLowerCase() === this.mtgUser.language.toLowerCase());
      if (foreignCard) {
        card.translate(foreignCard.name, foreignCard.multiverseId);
      };
    });
  }
}
