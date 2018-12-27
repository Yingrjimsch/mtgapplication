import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ScannedCard } from './scanned-card';

@Injectable({
  providedIn: 'root'
})
export class MagicTheGatheringService {

  constructor(public http: Http) { }

  getCard(card: ScannedCard) {
    const l = card.getLanguage() !== 'english' ? '&language=' + card.getLanguage() : '';
    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + card.getName() + l);
  }
}
