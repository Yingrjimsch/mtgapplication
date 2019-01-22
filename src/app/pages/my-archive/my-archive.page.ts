import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CardService } from '../../services/dbservices/card.service';
import { Card } from '../../classes/card';
import { map } from 'rxjs/operators';
import { ActionSheetService } from '../../services/uiservices/action-sheet.service';
import { ActionSheetButton } from '@ionic/core';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';

@Component({
  selector: 'app-my-archive',
  templateUrl: './my-archive.page.html',
  styleUrls: ['./my-archive.page.scss'],
})
export class MyArchivePage implements OnInit {
  public searchstring = '';
  public cards: Array<Card> = new Array<Card>();

  constructor(public plt: Platform, private actionSheetService: ActionSheetService, private firestoreService: FirestoreService) {
    firestoreService.getCardsByDeckId('vqG4oLttNyxtOmfgML58').subscribe((c: Card[]) => this.cards = c);
  }

  getMyCards(): Array<Card> {
    return this.cards.filter(c => c.name.toLowerCase().includes(this.searchstring.toLowerCase()));
  }

  ngOnInit() {
  }
}
