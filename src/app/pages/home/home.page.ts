import { Component, OnInit } from '@angular/core';
import { MagicTheGatheringService } from '../../services/httpservices/magic-the-gathering.service';
import { Card } from '../../classes/card';
import { CardCollectionService } from '../../services/dbservices/card-collection.service';
import { CardCollection } from '../../classes/card-collection';
import { map } from 'rxjs/operators';
import { CardService } from '../../services/dbservices/card.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';
import { Languages } from 'src/app/enums/languages';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private c: FirestoreService, private c3: CardService) {
    console.log(Languages['en']);
    }
}
