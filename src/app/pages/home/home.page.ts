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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(c: CardService) {
    // c.addCard(new Card('Black Lotus', '382866', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=382866&type=card')).then(v => console.log(v.id)).catch(c => console.log(c));
  }
}
