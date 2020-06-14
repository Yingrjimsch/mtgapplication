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
import { AlertService } from 'src/app/services/uiservices/alert.service';
import { MagicTheGatheringService } from 'src/app/services/httpservices/magic-the-gathering.service';
import { ScannerService } from 'src/app/services/uiservices/scanner.service';
import { Languages } from 'src/app/enums/languages';
import { LoadingService } from 'src/app/services/uiservices/loading.service';
import { MtgUser } from 'src/app/classes/mtg-user';
import { UserService } from 'src/app/services/dbservices/user.service';
import { ToastService } from 'src/app/services/uiservices/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-archive',
  templateUrl: './my-archive.page.html',
  styleUrls: ['./my-archive.page.scss'],
})
export class MyArchivePage implements OnInit {
  public searchstring = '';
  public cards: Array<Card> = new Array<Card>();
  private cardFilter = new CardFilter();
  public mtgUser: MtgUser = new MtgUser();

  constructor(public plt: Platform, private actionSheetService: ActionSheetService, private cardService: CardService,
    private modalController: ModalController, private alertService: AlertService, private mtgService: MagicTheGatheringService,
    private scannerService: ScannerService, private loadingService: LoadingService, private userService: UserService,
    private toastService: ToastService, private router: Router) {
      // TODO maybe store User in cache or something!
    userService.getUser().then(user => this.mtgUser = (user.data() as MtgUser))
      .catch(() => toastService.presentErrorToast('Could not find Loggedin User.'));
    this.cardService.getCards(userService.getUserDoc()).then(cards => cards.forEach(c => this.cards.push(c.data() as Card)));
  }

  getFilteredCards(): Array<Card> {
    return this.cards.filter(c => this.hasSameName(c)
      && this.hasSameType(c)
      && this.hasSameColor(c)
      && this.hasSameCMC(c)
      && this.hasSameRarity(c));
  }

  private hasSameRarity(c: Card): boolean {
    return this.cardFilter.rarities.length === 0 || this.cardFilter.rarities.includes(c.rarity.toLowerCase());
  }

  private hasSameCMC(c: Card): boolean {
    return this.cardFilter.cmcs.length === 0 || this.cardFilter.cmcs.includes(c.cmc);
  }

  private hasSameColor(c: Card): boolean {
    return this.cardFilter.colors.length === 0 || c.colors.every((c2: string) => this.cardFilter.colors.includes(c2.toLowerCase()));
  }

  private hasSameType(c: Card): boolean {
    return this.cardFilter.types.length === 0 || c.types.every((c2: string) => this.cardFilter.types.includes(c2.toLowerCase()));
  }

  private hasSameName(c: Card): boolean {
    return c.name.toLowerCase().includes(this.searchstring.toLowerCase());
  }

  // TODO decide if filterservice is maybe a good idea?
  async openFilter() {
    const modalPage = await this.modalController.create({
      component: FilterComponent,
      componentProps: { cardFilter: this.cardFilter }
    });
    await modalPage.present();
    const { data } = await modalPage.onWillDismiss();
    this.cardFilter = data.cardFilter;
  }

  async presentActionSheet(card: Card) {
    const header = 'Actions';
    const buttons: ActionSheetButton[] = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          card.count === 1 ? this.deleteCardFromCollection(card) : this.deleteMultipleCards(card);
        }
      },
      {
        text: 'Add One',
        icon: 'arrow-round-up',
        handler: () => {
          this.changeCardCount(card, ++card.count);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }
      // TODO add Card to Deck
    ];
    this.actionSheetService.presentCustomActionSheet(header, buttons);
  }

  private changeCardCount(card: Card, count: number) {
    card.count = count;
    this.cardService.updateCard(this.userService.getUserDoc(), card);
  }

  private deleteCardFromCollection(card: Card) {
    this.cardService.deleteCard(this.userService.getUserDoc(), card.id).then(() => this.cards.splice(this.cards.indexOf(card), 1));
  }

  async addCardByName() {
    const inputs = [{
      name: 'cardName',
      label: 'Card Name',
      placeholder: 'Opt'
    }];
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Add',
        handler: (data: { cardName: string; }) => {
          if (!data.cardName) {
            return;
          }
          this.loadingService.present('Search Card...');
          this.mtgService.getCardByName(data.cardName)
            .then(c => {
              this.addOrUpdateCard(c);
            });
        }
      }
    ];
    this.alertService.presentCustomAlert('Add Card', inputs, buttons);
  }

  async deleteMultipleCards(card: Card) {
    const inputs = [{
      name: 'deleteCount',
      label: 'Delete Count',
      value: card.count,
      type: 'number'
    }];
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Delete',
        handler: (data: { deleteCount: number; }) => {
          card.count <= data.deleteCount ? this.deleteCardFromCollection(card) : this.changeCardCount(card, card.count - data.deleteCount);

        }
      }
    ];
    this.alertService.presentCustomAlert('Delete Card', inputs, buttons);
  }

  private addOrUpdateCard(c: Card) {
    this.cardService.getCardById(this.userService.getUserDoc(), c.id).then(c2 => {
      this.loadingService.dismiss();
      c2.exists ? this.showAddCardCopyAlert(c2.data() as Card) : this.addCardToCollection(c);
    });
  }

  addCardToCollection(card: Card) {
    this.loadingService.present('Add Card...');
    this.cardService.addCard(this.userService.getUserDoc(), card).then(() => this.cards.push(card));
    this.loadingService.dismiss();
  }

  async showAddCardCopyAlert(card: Card) {
    this.loadingService.dismiss();
    const buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => { }
      },
      {
        text: 'Ok',
        handler: () => {
          this.loadingService.present('Update Card...');
          card = this.cards.find(c => c.id === card.id);
          card.count++;
          this.cardService.updateCard(this.userService.getUserDoc(), card);
          this.loadingService.dismiss();
        }
      }
    ];
    this.alertService.presentCustomAlert('Do you want to add a Copie of ' + card.name + ' to your collection?', [], buttons);
  }

  scannCard() {
    this.loadingService.present('Search Card...');
    this.scannerService.scannCard()
      .then(card => this.mtgService.getCardByNameAndLanguage(card.getName(), this.mtgUser.language))
      .then(card => this.addOrUpdateCard(card)).catch(error => this.loadingService.dismiss());
  }

  addCardsFile() {
    // TODO import cards of file in clipboard
    console.log('adding cards by file not done yet!');
  }

  ngOnInit() {
  }

  public openCardDetail(card: Card) {
    this.router.navigate(['private', 'card-detail', card.id]);
  }
}
