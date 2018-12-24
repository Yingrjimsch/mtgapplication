import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MagicTheGatheringService {

  constructor(public http: Http) { }

  getCard(name: string, language: string) {
    const l = language ? language : '';
    return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + name + '&language=' + l);
  }
}
