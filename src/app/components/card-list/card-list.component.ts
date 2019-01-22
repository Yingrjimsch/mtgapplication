import { Component, OnInit, Input } from '@angular/core';
import { CardCollection } from 'src/app/classes/card-collection';
import { ActionSheetButton } from '@ionic/core';
import { ActionSheetService } from 'src/app/services/uiservices/action-sheet.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() public cardCollection: CardCollection;

  constructor(public actionSheetService: ActionSheetService) { }

  ngOnInit() {
  }

  async presentActionSheet(item) {
    const header = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.cardCollection.cards.splice(this.cardCollection.cards.indexOf(item), 1);
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
