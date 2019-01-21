import { Component, OnInit } from '@angular/core';
import { MagicTheGatheringService } from '../../services/httpservices/magic-the-gathering.service';
import { ScannedCard } from '../../classes/scanned-card';
import { Card } from '../../classes/card';
import { CardCollectionService } from '../../services/dbservices/card-collection.service';
import { CardCollection } from '../../classes/card-collection';
import { map } from 'rxjs/operators';
import { CardService } from '../../services/dbservices/card.service';
import { SettingsService } from '../../services/dbservices/settings.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private c: FirestoreService, private c3: CardService) {
    let card: Card = new Card('test', 'xnxx', 'path');
    card.id = '09987';
    let deck: CardCollection = new CardCollection('TestDeck');
    deck.id = 'JdT5KwAyo5Jd8OqRUDit';
    deck.numberOfCards = 0;
    c.addCardToDeck(deck, card);
    // c.getCardsByDeckId('JdT5KwAyo5Jd8OqRUDit').subscribe(l => console.log(l))
  }
}
