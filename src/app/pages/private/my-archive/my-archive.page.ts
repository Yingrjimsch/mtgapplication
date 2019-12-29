import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { CardService } from '../../../services/dbservices/card.service';
import { Card } from '../../../classes/card';
import { map } from 'rxjs/operators';
import { ActionSheetService } from '../../../services/uiservices/action-sheet.service';
import { ActionSheetButton } from '@ionic/core';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { CardFilter } from 'src/app/classes/card-filter';

@Component({
  selector: 'app-my-archive',
  templateUrl: './my-archive.page.html',
  styleUrls: ['./my-archive.page.scss'],
})
export class MyArchivePage implements OnInit {
  public searchstring = '';
  public cards: Array<Card> = new Array<Card>();
  private cardFilter = new CardFilter();

  constructor(public plt: Platform, private actionSheetService: ActionSheetService, private cardService: CardService, private modalController: ModalController) {
    this.cardService.getCardCollectionOfLoggedInUser().then(cards => cards.forEach(c => this.cards.push(c.data() as Card)));
  }

  getMyCards(): Array<Card> {
    return this.cards.filter(c => c.name.toLowerCase().includes(this.searchstring.toLowerCase())
      && this.cardFilter.cardTypes.includes(c.cardType)
      && c.colors.every((c2: string) => this.cardFilter.colors.includes(c2))
      && this.cardFilter.manaCosts.includes(c.manaCost)
      && this.cardFilter.rarities.includes(c.rarity));
  }

  async openFilter() {
    const modalPage = await this.modalController.create({
      component: FilterComponent,
      componentProps: { cardFilter: this.cardFilter }
    });
    await modalPage.present();
    const { data } = await modalPage.onWillDismiss();
    this.cardFilter = data.cardFilter;
  }
  
  ngOnInit() {
  }
}
