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
  public searchstring = '';
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

  ngOnInit() {
  }
}
