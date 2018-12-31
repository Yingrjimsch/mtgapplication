import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-my-archive',
  templateUrl: './my-archive.page.html',
  styleUrls: ['./my-archive.page.scss'],
})
export class MyArchivePage implements OnInit {

  public cards: Array<Card> = new Array<Card>();
  constructor(public plt: Platform, cardService: CardService, private actionSheetController: ActionSheetController) {
    this.cards = cardService.getMyCards();
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log(item);
            this.cards.splice(this.cards.indexOf(item), 1);
          }
        },
        {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  ngOnInit() {
  }

}
