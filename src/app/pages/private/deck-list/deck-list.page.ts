import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { CardCollection } from '../../../classes/card-collection';
import { AlertService } from '../../../services/uiservices/alert.service';
import { ActionSheetService } from '../../../services/uiservices/action-sheet.service';
import { ActionSheetButton } from '@ionic/core';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';
import { Router } from '@angular/router';
import { DeckService } from 'src/app/services/dbservices/deck.service';
import { Deck } from 'src/app/classes/deck';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.page.html',
  styleUrls: ['./deck-list.page.scss']
})
export class DeckListPage implements OnInit {
  public decks: Array<Deck>;
  constructor(
    public plt: Platform,
    private actionSheetService: ActionSheetService,
    public firestoreService: FirestoreService,
    public router: Router,
    private alertService: AlertService,
    private modalController: ModalController,
    private deckService: DeckService
  ) {}

  async presentActionSheet(deck: Deck) {
    const header = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.ensureDeckDeletion(deck);
        }
      } /*
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
        },*/,
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

  async addDeck() {
    const inputs = [
      {
        name: 'deckName',
        label: 'Deck Name',
        placeholder: 'Red Burn'
      }
    ];
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {}
      },
      {
        text: 'Create',
        handler: (data: { deckName: string }) => {
          if (!data.deckName) {
            return;
            // TODO: add toast. Same in my-archive addcard!
          }
          const deck = new Deck(Guid.create().toString(), data.deckName);
          this.deckService.createDeck(deck).then(() => this.decks.push(deck));
        }
      }
    ];
    this.alertService.presentCustomAlert('New Deck', inputs, buttons);
  }

  async ensureDeckDeletion(deck: Deck) {
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {}
      },
      {
        text: 'Delete',
        handler: () => {
          this.deckService.deleteDeck(deck.id).then(() => this.decks.splice(this.decks.indexOf(deck), 1));
        }
      }
    ];
    this.alertService.presentCustomAlert('Are you sure you want to delete ' + deck.deckName + '?', [], buttons);
  }

  openDeckDetail(deckId: string) {
    return this.router.navigate(['private', 'deck-detail' , deckId]);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.decks = new Array<Deck>();
    this.deckService
      .getDecksOfLoggedInUser()
      .then(decks => decks.forEach(d => this.decks.push(d.data() as Deck)));
  }

  public getLegalities(deck: Deck): string {
    return deck.legalities.map(l => JSON.parse(l).format).join(', ');
  }
}
