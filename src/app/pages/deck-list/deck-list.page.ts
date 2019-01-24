import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { CardCollection } from '../../classes/card-collection';
import { AlertService } from '../../services/uiservices/alert.service';
import { ActionSheetService } from '../../services/uiservices/action-sheet.service';
import { ActionSheetButton } from '@ionic/core';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';
import { Router } from '@angular/router';
import { DeckDetailComponent } from 'src/app/components/deck-detail/deck-detail.component';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.page.html',
  styleUrls: ['./deck-list.page.scss']
})
export class DeckListPage implements OnInit {
  public cardCollections = new Array<CardCollection>();
  constructor(
    public plt: Platform,
    private actionSheetService: ActionSheetService,
    public firestoreService: FirestoreService,
    public router: Router,
    private alertService: AlertService,
    private modalController: ModalController
  ) {
    firestoreService.getDecksByUserId('5Y3LIYvotpzCBXpUcBIv').subscribe(decks => this.cardCollections = decks);
  }

  async presentActionSheet(deck: CardCollection) {
    const header = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.firestoreService.deleteDeck(deck.id);
        }
      }, /*
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Testdraw',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        },*/
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];
    this.actionSheetService.presentCustomActionSheet(header, buttons);
  }

  async addCardCollection() {
    const inputs = [{
      name: 'deckName',
      label: 'Deck Name',
      placeholder: 'Red Burn'
    }];
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Create',
        handler: (data: { deckName: string; }) => {
          if (data.deckName) {
            this.firestoreService.createDeck('5Y3LIYvotpzCBXpUcBIv', data.deckName);
          }
        }
      }
    ];
    this.alertService.presentCustomAlert('New Card Collection', inputs, buttons);
  }

  async openDeckDetail() {
    const data = { message : 'hello world' };

    const modalPage = await this.modalController.create({
      component: DeckDetailComponent,
      componentProps: {values: data}
    });

    return await modalPage.present();
  }

  ngOnInit() { }
}
