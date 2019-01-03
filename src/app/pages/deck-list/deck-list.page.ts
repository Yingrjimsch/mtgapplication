import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CardCollection } from '../../classes/card-collection';
import { CardCollectionService } from '../../services/dbservices/card-collection.service';
import { map } from 'rxjs/operators';
import { AlertService } from '../../services/uiservices/alert.service';
import { ActionSheetService } from '../../services/uiservices/action-sheet.service';
import { ActionSheetButton } from '@ionic/core';

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
    public cardCollectionService: CardCollectionService,
    private alertService: AlertService
  ) {
    cardCollectionService.getAllCollectionsToSubscribe().subscribe((cc: CardCollection[]) => this.cardCollections = cc);
  }

  async presentActionSheet(item) {
    const header: string = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.cardCollectionService.deleteCardCollection(item.id);
          this.cardCollections.splice(this.cardCollections.indexOf(item), 1);
        }
      },/*
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
      name: 'collectionName',
      label: 'Collection Name',
      placeholder: 'Red Burn'
    }];
    const buttons = [
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
            const cc = new CardCollection(data.collectionName);
            this.cardCollectionService.createCollection(cc);
          }
        }
      }
    ];
    this.alertService.presentCustomAlert('New Card Collection', inputs, buttons);
  }

  ngOnInit() { }
}
