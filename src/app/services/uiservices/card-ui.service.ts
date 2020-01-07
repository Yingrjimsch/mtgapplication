import { Injectable } from '@angular/core';
import { CardDbService } from '../dbservices/card-db.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Card } from 'src/app/classes/card';
import { LoadingService } from './loading.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CardUiService {

  constructor(private cardDbService: CardDbService, private loadingService: LoadingService, private alertService: AlertService) { }

  public async addOrUpdateCard(doc: AngularFirestoreDocument, card: Card) {
    const cardPromise = await this.cardDbService.checkIfCardExists(doc, card.id);
    if (cardPromise.exists) {
      card = cardPromise.data() as Card;
      const confirm = await this.alertService.confirmationAlert('Do you really want to add one copy of this card?');
      if (confirm) {
        card.count++;
        await this.cardDbService.updateCard(doc, card);
        return card;
      }
      return null;
    }
    await this.cardDbService.addCard(doc, card);
    return card;
  }

  public async deleteCards(doc: AngularFirestoreDocument, card: Card) {
    if (card.count > 1) {
      const count = await this.alertService.presentNumberAlert('How many copies of this card would you like to delete?', card.count);
      if (count === 0) {
        return;
      }
      if (card.count > count) {
        card.count = card.count - count;
        this.cardDbService.updateCard(doc, card);
        return card;
      }
    }
      card.count = 0;
      this.cardDbService.deleteCard(doc, card.id);
      return card;
  }
}
