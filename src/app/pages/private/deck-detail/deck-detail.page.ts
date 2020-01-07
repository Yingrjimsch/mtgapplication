import { Component, OnInit, OnDestroy } from '@angular/core';
import { MagicTheGatheringService } from 'src/app/services/httpservices/magic-the-gathering.service';
import { AlertService } from 'src/app/services/uiservices/alert.service';
import { Platform } from '@ionic/angular';
import { ActionSheetService } from 'src/app/services/uiservices/action-sheet.service';
import { Deck } from 'src/app/classes/deck';
import { Card } from 'src/app/classes/card';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/services/dbservices/deck.service';
import { ActionSheetButton } from '@ionic/core';
import { LoadingService } from 'src/app/services/uiservices/loading.service';
import { CardUiService } from 'src/app/services/uiservices/card-ui.service';
import { CardDbService } from 'src/app/services/dbservices/card-db.service';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

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
    private cardDbService: CardDbService,
    private alertService: AlertService,
    private mtgService: MagicTheGatheringService,
    private deckService: DeckService,
    private loadingService: LoadingService,
    private cardUiService: CardUiService
  ) {
    this.sub = route.params
      .subscribe(p => {
        this.deckService.getDeckById(p.id).get().toPromise().then(d => this.deck = d.data() as Deck);
        this.cardDbService
          .getCards(deckService.getDeckById(p.id))
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
        handler: async () => {
          const c = await this.cardUiService.deleteCards(this.deckService.getDeckById(this.deck.id), card);
          if (!c) {
            return;
          }
          c.count === 0 ? this.cards.splice(this.cards.indexOf(c), 1) : this.cards[this.cards.indexOf(c)] = c;
          this.updateDeckByCard(this.deck, this.cards);
          // card.count === 1 ? this.deleteCardFromCollection(card) : this.deleteMultipleCards(card);
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
    this.cardDbService.updateCard(this.deckService.getDeckById(this.deck.id), card);
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
        handler: async (data: { cardName: string; }) => {
          if (!data.cardName) {
            return;
          }
          this.loadingService.present('Search Card...');
            let card = await this.mtgService.getCardByName(data.cardName);
            this.loadingService.dismiss();
            card = await this.cardUiService.addOrUpdateCard(this.deckService.getDeckById(this.deck.id), card);
            if (!card) {
              return;
            }
            const oldCard = this.cards.find(c => c.id === card.id);
            if (oldCard) {
              this.cards[this.cards.indexOf(oldCard)] = card;
              return;
            }
            this.cards.push(card);
            this.updateDeckByCard(this.deck, this.cards);
        }
      }
    ];
    this.alertService.presentCustomAlert('Add Card', inputs, buttons);
  }

  updateDeckByCard(deck: Deck, cards: Array<Card>) {
    const legalities = cards.map(c => c.legalities.map(l => JSON.stringify(l)));
    deck.legalities = legalities.shift().filter(v => legalities.every(a => a.indexOf(v) !== -1));
    deck.numberOfCards = cards.map(c => c.count).reduce((a, b) => a + b, 0);
    console.log(deck);
    //TODO update deck deckdbservice!
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
