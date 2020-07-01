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
  // DOWN HERE IS ALL NEW SHIT FROM UPDATE DECEMBER 2019

  getCardSource(name: string, language: string) {
    return this.http.get('https://api.scryfall.com/cards/search?q=!' + name + '+lang%3A' + language);
  }

  async getCardByName(name: string) {
    const user = await this.userService.getUser();
    const mtgUser = (user.data() as MtgUser);
    return this.getCardByNameAndLanguage(name, mtgUser.language);
  }

  async getCardByNameAndLanguage(name: string, language: string) {
    const response = await this.getCardSource(name, language).toPromise();
    const cardSrc = response.json().data[0];
    const card = new Card(cardSrc.id, cardSrc.printed_name, cardSrc.multiverse_ids[0], cardSrc.rarity, cardSrc.colors, cardSrc.cmc, cardSrc.type_line, cardSrc.legalities);

    // TODO: translate card!
    return card;
  }
}
