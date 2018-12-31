import { Component, OnInit } from '@angular/core';
import {
  Platform,
  ActionSheetController,
  PopoverController,
  AlertController
} from '@ionic/angular';
import { CardCollection } from '../card-collection';
import { CardCollectionService } from '../card-collection.service';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.page.html',
  styleUrls: ['./deck-list.page.scss']
})
export class DeckListPage implements OnInit {
  // Items durch Array von CardCollections ersetzen.
  // public cardCollection: Array<CardCollection>;
  public cardCollections = new Array<CardCollection>();
  constructor(
    public plt: Platform,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private cardCollectionService: CardCollectionService
  ) {
    this.cardCollections = cardCollectionService.getCardCollections();
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
            this.cardCollections.splice(this.cardCollections.indexOf(item), 1);
          }
        },
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

  async addCardCollection() {
    const alert = await this.alertController.create({
      header: 'New Card Collection',
      inputs: [
        {
          name: 'collectionName',
          label: 'Collection Name',
          placeholder: 'Red Burn'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data.collectionName) {
              this.cardCollections.push(new CardCollection(data.collectionName));
            }
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {}
}
