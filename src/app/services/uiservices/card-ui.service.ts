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
      const confirm = await this.alertService.confirmationAlert('Test');
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

  async showAddCardCopyAlert(doc: AngularFirestoreDocument, card: Card) {
    const buttons = [
      {
        text: 'No',
        handler: () => { }
      },
      {
        text: 'Yes',
        handler: () => {
          this.loadingService.present('Update Card...');
          card.count++;
          this.cardDbService.updateCard(doc, card);
          this.loadingService.dismiss();
        }
      }
    ];
    return this.alertService.presentCustomAlert('Do you want to add a copy of ' + card.name + ' to this collection?', [], buttons);
  }
}
