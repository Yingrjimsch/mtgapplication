import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ScannedCard } from '../../classes/scanned-card';

@Injectable({
  providedIn: 'root'
})
export class MagicTheGatheringService {

  constructor(public http: Http) { }

  getCard(card: ScannedCard) {
    const parameter = card.getLanguage() !== 'english' ? card.getName() + '&language=' + card.getLanguage() : '"' + card.getName() + '"';
    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + parameter);
  }
}
