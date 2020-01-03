import { Component, OnInit, OnDestroy } from '@angular/core';
import { MagicTheGatheringService } from 'src/app/services/httpservices/magic-the-gathering.service';
import { AlertService } from 'src/app/services/uiservices/alert.service';
import { ModalController, Platform } from '@ionic/angular';
import { CardService } from 'src/app/services/dbservices/card.service';
import { ActionSheetService } from 'src/app/services/uiservices/action-sheet.service';
import { Deck } from 'src/app/classes/deck';
import { Card } from 'src/app/classes/card';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/services/dbservices/deck.service';
import { ActionSheetButton } from '@ionic/core';
import { LoadingService } from 'src/app/services/uiservices/loading.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.page.html',
  styleUrls: ['./deck-detail.page.scss']
})
export class DeckDetailPage implements OnInit, OnDestroy {
  deck: Deck;
  cards: Array<Card> = new Array<Card>();
  constructor(
    private route: ActivatedRoute,
    public plt: Platform,
    private actionSheetService: ActionSheetService,
    private cardService: CardService,
    private modalController: ModalController,
    private alertService: AlertService,
    private mtgService: MagicTheGatheringService,
    private deckService: DeckService,
    private loadingService: LoadingService
  ) {
    this.sub = route.params
      .subscribe(p => {
        this.deckService.getDeckById(p.id).get().toPromise().then(d => this.deck = d.data() as Deck);
        this.cardService
          .getAllCardsByDeck(p.id)
          .then(cards => cards.forEach(c => this.cards.push(c.data() as Card)));
      });
  }

  private sub: any;

  async presentActionSheet(card: Card) {
    const header = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          card.count === 1 ? this.deleteCardFromCollection(card) : this.deleteMultipleCards(card);
        }
      },
      {
        text: 'Add One',
        icon: 'arrow-round-up',
        handler: () => {
          this.changeCardCount(card, ++card.count);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }
    ];
    this.actionSheetService.presentCustomActionSheet(header, buttons);
  }

  private changeCardCount(card: Card, count: number) {
    card.count = count;
    this.cardService.updateCardFromDeck(this.deck.id, card);
  }

  private deleteCardFromCollection(card: Card) {
    this.cardService.deleteCardFromDeck(this.deck.id, card.id).then(() => this.cards.splice(this.cards.indexOf(card), 1));
  }

  async deleteMultipleCards(card: Card) {
    const inputs = [{
      name: 'deleteCount',
      label: 'Delete Count',
      value: card.count,
      type: 'number'
    }];
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Delete',
        handler: (data: { deleteCount: number; }) => {
          card.count <= data.deleteCount ? this.deleteCardFromCollection(card) : this.changeCardCount(card, card.count - data.deleteCount);

        }
      }
    ];
    this.alertService.presentCustomAlert('Delete Card', inputs, buttons);
  }

  async addCardByName() {
    const inputs = [{
      name: 'cardName',
      label: 'Card Name',
      placeholder: 'Opt'
    }];
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Add',
        handler: (data: { cardName: string; }) => {
          if(!data.cardName) {
            return;
          }
          this.loadingService.present('Search Card...');
          this.mtgService.getCardByName(data.cardName)
            .then(c => {
              this.addOrUpdateCard(this.deck, c);
            });
        }
      }
    ];
    this.alertService.presentCustomAlert('Add Card', inputs, buttons);
  }

  private addOrUpdateCard(deck: Deck, c: Card) {
    this.cardService.checkIfCardExistsInDeck(deck.id, c.id).then(c2 => {
      this.loadingService.dismiss();
      c2.exists ? this.showAddCardCopyAlert(deck.id, c2.data() as Card) : this.addCardToCollection(deck, c);
    });
  }

  addCardToCollection(deck: Deck, card: Card) {
    this.loadingService.present('Add Card...');
    this.cardService.addCardToDeck(deck.id, card).then(() => this.cards.push(card)); // .then(() => this.updateDeckByCard(deck, card, 1));
    this.loadingService.dismiss();
  }
  updateDeckByCard(deck: Deck, card: Card, count: number): any {
    // TODO Update Deck Legality and count!
    card.legalities.forEach(l => {
      if (l['legality'] === 'Legal' && !deck.legalities.includes(l['format'])) {
        deck.legalities.push(l['format']);
        console.log(deck);
       }
    });
  }

  async showAddCardCopyAlert(deckId: string, card: Card) {
    this.loadingService.dismiss();
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Ok',
        handler: () => {
          this.loadingService.present('Update Card...');
          card = this.cards.find(c => c.id === card.id);
          this.changeCardCount(card, ++card.count);
          this.loadingService.dismiss();
        }
      }
    ];
    this.alertService.presentCustomAlert('Do you want to add a Copie of ' + card.name + ' to your collection?', [], buttons);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
