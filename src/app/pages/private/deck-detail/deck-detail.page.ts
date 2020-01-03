import { Component, OnInit } from "@angular/core";
import { MagicTheGatheringService } from "src/app/services/httpservices/magic-the-gathering.service";
import { AlertService } from "src/app/services/uiservices/alert.service";
import { ModalController, Platform } from "@ionic/angular";
import { CardService } from "src/app/services/dbservices/card.service";
import { ActionSheetService } from "src/app/services/uiservices/action-sheet.service";
import { Deck } from "src/app/classes/deck";
import { Card } from "src/app/classes/card";
import { ActivatedRoute } from "@angular/router";
import { DeckService } from "src/app/services/dbservices/deck.service";
import { ActionSheetButton } from '@ionic/core';

@Component({
  selector: "app-deck-detail",
  templateUrl: "./deck-detail.page.html",
  styleUrls: ["./deck-detail.page.scss"]
})
export class DeckDetailPage implements OnInit {
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
    private deckService: DeckService
  ) {
    route.params
      .toPromise()
      .then(p =>
        this.cardService
          .getAllCardsByDeck(p.id)
          .then(cards => cards.forEach(c => this.cards.push(c.data() as Card)))
      );
  }

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
          card.count <= data.deleteCount ? this.deleteCardFromCollection(card) : this.changeCardCount(card, card.count - data.deleteCount)

        }
      }
    ];
    this.alertService.presentCustomAlert('Delete Card', inputs, buttons);
  }

  ngOnInit() {}
}
