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
    private cardService: CardService,
  ) {
    settingsService.getLanguage().then(a => {
      this.settings = a.docs.map(a => ({ id: a.id, ...a.data() }) as Settings)[0];
      this.takePhoto();
    }).catch(() => toastService.presentErrorToast('Could not find Settings.'));
  }

  takePhoto() {
    //this.card = new Card('Angelic Rocket', '439528', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=439528&type=card')
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
      let c = response.json().cards[0];
      // Hier wird die Karte nach Sprache gesucht.
      c = c.foreignNames.find(f => (f.language as string).toLowerCase() === this.settings.language.toLowerCase());
      this.card = new Card(c.name, c.multiverseid, c.imageUrl);
      this.toastService.presentSuccessToast('Card successfully found!');
    }).catch(() => this.toastService.presentErrorToast('Error while trying to find card'));
  }

  parseTextDetectionResponse(textDetectionResponse: any) {
    const responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
    return new ScannedCard(responseToParse.description, responseToParse.locale);
  }

  ngOnInit() {
  }

  async presentCardCollections() {
    this.cardCollectionService.getAllCollectionsAsPromise().then(a => {
      const cardCollection = a.docs.map(a => ({ id: a.id, ...a.data() }) as CardCollection);
      const header: string = 'Collections'
      let inputs: AlertInput[] = [];
      cardCollection.forEach(c => inputs.push({
        name: c.name,
        type: 'checkbox',
        label: c.name,
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
            this.cardService.addCard(this.card)
              .then(v => {
                this.card.id = v
                data.forEach(element => this.cardCollectionService.addCardToCollection(element, this.card));
                this.toastService.presentSuccessToast('Card successfully added to all lists');
              }).catch(err => this.toastService.presentErrorToast(err));
          }
        }
      ];
      this.alertService.presentCustomAlert(header, inputs, buttons);
    }).catch(() => this.toastService.presentErrorToast('Could not find Settings.'));
  }
}
