import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../../../services/httpservices/google-cloud-vision.service';
import { AlertService } from '../../../services/uiservices/alert.service';
import { ScannedCard } from '../../../classes/scanned-card';
import { Platform } from '@ionic/angular';
import { MagicTheGatheringService } from '../../../services/httpservices/magic-the-gathering.service';
import { Card } from '../../../classes/card';
import { ToastService } from '../../../services/uiservices/toast.service';
import { CardCollectionService } from '../../../services/dbservices/card-collection.service';
import { map } from 'rxjs/operators';
import { CardCollection } from '../../../classes/card-collection';
import { Settings } from '../../../classes/settings';
import { AlertInput, AlertButton } from '@ionic/core';
import { CardService } from '../../../services/dbservices/card.service';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';
import { UserService } from 'src/app/services/dbservices/user.service';
import { MtgUser } from 'src/app/classes/mtg-user';
import { ScannerService } from 'src/app/services/uiservices/scanner.service';
import { Deck } from 'src/app/classes/deck';
import { LoadingService } from 'src/app/services/uiservices/loading.service';
import { DeckService } from 'src/app/services/dbservices/deck.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  public card: Card;
  public mtgUser: MtgUser = new MtgUser();

  constructor(
    private alertService: AlertService,
    private mtgService: MagicTheGatheringService,
    private toastService: ToastService,
    userService: UserService,
    public plt: Platform,
    private firestoreService: FirestoreService,
    private scannerService: ScannerService,
    private cardService: CardService,
    private loadingService: LoadingService,
    private deckService: DeckService
  ) {
    userService.getUser().then(user => {
      this.mtgUser = (user.data() as MtgUser);
      this.scannCard();
    }).catch(err => toastService.presentErrorToast('Could not find Loggedin User.'));
  }

  scannCard() {
    this.scannerService.scannCard()
    .then(card => this.mtgService.getCardByNameAndLanguage(card.getName(), card.getLanguage()))
    .then(card => this.card = card);
    // this.card = new Card('Angelic Rocket', '439528')
    /*const options: CameraOptions = {
      quality: 100,
      targetHeight: 700,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.visionService.getTextDetectionResponse(imageData).subscribe(
          result => {
            this.toastService.presentSuccessToast('Text successfully read!');
            const sc: ScannedCard = this.parseTextDetectionResponse(result);
            this.parseMTGServiceResponse(sc);
          },
          () => {
            this.toastService.presentErrorToast('Error while trying to read Text');
          }
        );
      },
      () => {
        this.toastService.presentErrorToast('Error while trying to make picture');
      }
    );*/
  }

  /*parseMTGServiceResponse(scannedCard: ScannedCard) {
    this.mtgService.getCard(scannedCard).toPromise().then(response => {
      const card = response.json().cards[0];
      this.card = new Card(card.id, card.name, card.multiverseId, card.rarity, card.colors, card.cmc, card.types);
      // Hier wird die Karte nach Sprache gesucht.
      const foreignCard = card.foreignNames.find(f => (f.language as string).toLowerCase() === this.mtgUser.language.toLowerCase());
      if (foreignCard) {
        this.card.translate(foreignCard.name, foreignCard.multiverseId);
      }
      this.toastService.presentSuccessToast('Card successfully found!');
    }).catch(() => this.toastService.presentErrorToast('Error while trying to find card'));
  }

  parseTextDetectionResponse(textDetectionResponse: any) {
    const responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
    return new ScannedCard(responseToParse.description, responseToParse.locale);
  }
*/
  ngOnInit() {
  }

  /*async presentCardCollections() {
    this.cardCollectionService.getAllCollectionsAsPromise().then(a => {
      const cardCollection = a.docs.map(a => ({ id: a.id, ...a.data() }) as CardCollection);
      const header = 'Collections';
      const inputs: AlertInput[] = [];
      cardCollection.forEach(c => inputs.push({
        name: c.deckName,
        type: 'checkbox',
        label: c.deckName,
        value: c.id
      }));
      const buttons: AlertButton[] = [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            data.forEach((deck: CardCollection) => this.firestoreService.addCardToDeck(deck, this.card));
          }
        }
      ];
      this.alertService.presentCustomAlert(header, inputs, buttons);
    }).catch(() => this.toastService.presentErrorToast('Could not find Settings.'));
  }*/

  async presentDecks() {
    this.deckService.getDecksOfLoggedInUser().then(decks => {
      const header = 'Decks';
      const inputs: AlertInput[] = [];
      decks.forEach(d => inputs.push({
        name: d.data().deckName,
        type: 'checkbox',
        label: d.data().deckName,
        value: d.data().id
      }));
      const buttons: AlertButton[] = [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            data.forEach((deck: Deck) => this.addOrUpdateCard(deck, this.card));
          }
        }
      ];
      this.alertService.presentCustomAlert(header, inputs, buttons);
    }).catch(() => this.toastService.presentErrorToast('Could not find Settings.'));
  }

  private addOrUpdateCard(deck: Deck, c: Card) {
    this.cardService.getCardById(this.deckService.getDeckById(deck.id), c.id).then(c2 => {
      this.loadingService.dismiss();
      c2.exists ? this.showAddCardCopyAlert(deck.id, c2.data() as Card) : this.addCardToCollection(deck.id, c);
    });
  }

  addCardToCollection(deckId: string, card: Card) {
    this.loadingService.present('Add Card...');
    this.cardService.addCard(this.deckService.getDeckById(deckId), card);
    this.loadingService.dismiss();
  }

  async showAddCardCopyAlert(deckId: string, card: Card) {
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
          this.changeCardCount(card, ++card.count, deckId);
          this.loadingService.dismiss();
        }
      }
    ];
    this.alertService.presentCustomAlert('Do you want to add a Copie of ' + card.name + ' to your collection?', [], buttons);
  }

  private changeCardCount(card: Card, count: number, deckId: string) {
    card.count = count;
    this.cardService.updateCard(this.deckService.getDeckById(deckId), card);
  }
}
