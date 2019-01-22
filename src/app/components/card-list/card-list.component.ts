import { Component, OnInit, Input } from '@angular/core';
import { CardCollection } from 'src/app/classes/card-collection';
import { ActionSheetButton } from '@ionic/core';
import { ActionSheetService } from 'src/app/services/uiservices/action-sheet.service';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';
import { Card } from 'src/app/classes/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() public deck: CardCollection;
  public cards: Array<Card> = new Array();
  constructor(public actionSheetService: ActionSheetService, public firestoreService: FirestoreService) {
    firestoreService.getCardsByDeckId(this.deck.id).subscribe((cards: Card[]) => this.cards = cards);
   }

  ngOnInit() {
  }

  async presentActionSheet(card: Card) {
    const header = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.firestoreService.removeCardsFromDeck(this.deck, card.id);
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
    ];
    this.actionSheetService.presentCustomActionSheet(header, buttons);
  }

}
