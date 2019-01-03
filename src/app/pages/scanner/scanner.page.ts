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
    private vision: GoogleCloudVisionService,
    private alert: AlertService,
    private mtg: MagicTheGatheringService,
    private toast: ToastService,
    settingsService: SettingsService,
    public plt: Platform,
    private alertController: AlertController,
    private cardCollectionService: CardCollectionService,
    private cardService: CardService
  ) {
    settingsService.getLanguage().then(a => {
      this.settings = a.docs.map(a => ({ id: a.id, ...a.data() }) as Settings)[0];
    });
  }

  takePhoto() {
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
        this.vision.getTextDetectionResponse(imageData).subscribe(
          result => {
            this.toast.presentSuccessToast('Text successfully read!');
            const sc: ScannedCard = this.parseTextDetectionResponse(result);
            this.toast.presentSuccessToast(sc.getName() + " " + sc.getLanguage());
            this.parseMTGServiceResponse(sc);
            // CreateItem with databaseService !
            // this.saveResults(imageData, result.json().responses);
          },
          err => {
            this.alert.presentErrorAlert('Error while trying to read Text');
          }
        );
      },
      err => {
        this.alert.presentErrorAlert('Error while trying to make picture');
      }
    );
  }

  parseMTGServiceResponse(scannedCard: ScannedCard) {
    this.mtg.getCard(scannedCard).toPromise().then(response => {
      let c = response.json().cards[0];
      // Hier wird die Karte nach Sprache gesucht.
      c = c.foreignNames.find(f => (f.language as string).toLowerCase() === this.settings.language.toLowerCase());
      this.card = new Card(c.name, c.multiverseid, c.imageUrl);
    }).catch(err => this.alert.presentErrorAlert('Error while trying to find card'));
  }

  parseTextDetectionResponse(textDetectionResponse: any) {
    const responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
    return new ScannedCard(responseToParse.description, responseToParse.locale);
  }

  ngOnInit() {
  }

  async presentCardCollections() {
    this.cardCollectionService.getAllCollections().subscribe((cc: CardCollection[]) => {
      const header: string = 'Collections'
      let inputs: AlertInput[] = [];
      cc.forEach(c => inputs.push({
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
                data.forEach(element => this.cardCollectionService.addCardReference(element, this.card));
              }).catch(err => console.log(err));
          }
        }
      ];
      this.alert.presentCustomAlert(header, inputs, buttons);
    })
  }

}
