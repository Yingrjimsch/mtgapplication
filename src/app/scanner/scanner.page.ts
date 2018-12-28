import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../google-cloud-vision.service';
import { AlertService } from '../alert.service';
import { DatabaseService } from '../database.service';
import { ScannedCard } from '../scanned-card';
import { Platform } from '@ionic/angular';
import { MagicTheGatheringService } from '../magic-the-gathering.service';
import { Card } from '../card';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  public card: Card;

  constructor(
    private camera: Camera,
    private vision: GoogleCloudVisionService,
    private alert: AlertService,
    private db: DatabaseService,
    private mtg: MagicTheGatheringService,
    private toast: ToastService,
    public plt: Platform
  ) {}

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
            this.parseMTGServiceResponse(sc);
            // CreateItem with databaseService !
            // this.saveResults(imageData, result.json().responses);
          },
          err => {
            this.alert.showAlert(err);
          }
        );
      },
      err => {
        this.alert.showAlert(err);
      }
    );
  }

  parseMTGServiceResponse(scannedCard: ScannedCard) {
    this.mtg.getCard(scannedCard).toPromise().then(response => {
      this.toast.presentSuccessToast('Card successfully found!');
      const c = response.json().cards[0];
      this.card = new Card(c.name, c.multiverseid, c.imageUrl);
    });
  }

  parseTextDetectionResponse(textDetectionResponse: any) {
    const responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
    console.log(responseToParse);
    return new ScannedCard(responseToParse.description, responseToParse.locale);
  }

  ngOnInit() {
  }

}
