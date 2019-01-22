import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../../services/httpservices/google-cloud-vision.service';
import { AlertService } from '../../services/uiservices/alert.service';
import { ScannedCard } from '../../classes/scanned-card';
import { Platform } from '@ionic/angular';
import { MagicTheGatheringService } from '../../services/httpservices/magic-the-gathering.service';
import { Card } from '../../classes/card';
import { ToastService } from '../../services/uiservices/toast.service';
import { SettingsService } from '../../services/dbservices/settings.service';
import { CardCollectionService } from '../../services/dbservices/card-collection.service';
import { map } from 'rxjs/operators';
import { CardCollection } from '../../classes/card-collection';
import { Settings } from '../../classes/settings';
import { AlertInput, AlertButton } from '@ionic/core';
import { CardService } from '../../services/dbservices/card.service';
import { FirestoreService } from 'src/app/services/dbservices/firestore.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  public card: Card;
  private settings: Settings = new Settings();

  constructor(
    private camera: Camera,
    private visionService: GoogleCloudVisionService,
    private alertService: AlertService,
    private mtgService: MagicTheGatheringService,
    private toastService: ToastService,
    private settingsService: SettingsService,
    public plt: Platform,
    private cardCollectionService: CardCollectionService,
    private firestoreService: FirestoreService,
    private cardService: CardService,
  ) {
    settingsService.getLanguage().then(a => {
      this.settings = a.docs.map(a => ({ id: a.id, ...a.data() }) as Settings)[0];
      this.takePhoto();
    }).catch(() => toastService.presentErrorToast('Could not find Settings.'));
  }

  takePhoto() {
    // this.card = new Card('Angelic Rocket', '439528')
    const options: CameraOptions = {
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
    );
  }

  parseMTGServiceResponse(scannedCard: ScannedCard) {
    this.mtgService.getCard(scannedCard).toPromise().then(response => {
      const card = response.json().cards[0];
      this.card = new Card(card.id, card.name, card.multiverseId);
      // Hier wird die Karte nach Sprache gesucht.
      const foreignCard = card.foreignNames.find(f => (f.language as string).toLowerCase() === this.settings.language.toLowerCase());
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

  async presentCardCollections() {
    this.firestoreService.getDecksByUserId('5Y3LIYvotpzCBXpUcBIv').toPromise().then(decks => {
      const header = 'Collections';
      const inputs: AlertInput[] = [];
      decks.forEach(c => inputs.push({
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
  }
}
