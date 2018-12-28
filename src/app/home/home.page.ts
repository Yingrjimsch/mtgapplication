import { Component } from '@angular/core';
import { MagicTheGatheringService } from '../magic-the-gathering.service';
import { ScannedCard } from '../scanned-card';
import { Card } from '../card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor() { }
}
