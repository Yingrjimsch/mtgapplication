import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CardService } from '../../services/dbservices/card.service';
import { Card } from '../../classes/card';
import { map } from 'rxjs/operators';
import { ActionSheetService } from '../../services/uiservices/action-sheet.service';
import { ActionSheetButton } from '@ionic/core';

@Component({
  selector: 'app-my-archive',
  templateUrl: './my-archive.page.html',
  styleUrls: ['./my-archive.page.scss'],
})
export class MyArchivePage implements OnInit {
  public searchstring: string = '';
  public cards: Array<Card> = new Array<Card>();
  constructor(public plt: Platform, cardService: CardService, private actionSheetService: ActionSheetService) {
    cardService.getMyCards().snapshotChanges().pipe(
      map(changes =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    ).subscribe((c: Card[]) => this.cards = c);
  }

  getMyCards(): Card[] {
    return this.cards.filter(c => c.name.toLowerCase().includes(this.searchstring.toLowerCase()));
  }

  async presentActionSheet(item) {
    const header: string = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
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
    ];
    this.actionSheetService.presentCustomActionSheet(header, buttons);
  }

  ngOnInit() {
  }

}
