import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../google-cloud-vision.service';
import { AlertService } from '../alert.service';
import { DatabaseService } from '../database.service';
import { ScannedCard } from '../scanned-card';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  constructor(
    private camera: Camera,
    private vision: GoogleCloudVisionService,
    private alert: AlertService,
    private db: DatabaseService,
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
            const sc: ScannedCard = this.parseTextDetectionResponse(result);
            this.alert.showAlert(sc.getName() + '\n' + sc.getLanguage());
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

  parseTextDetectionResponse(textDetectionResponse: any) {
    const responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
    console.log(responseToParse);
    return new ScannedCard(responseToParse.description, responseToParse.locale);
  }

  ngOnInit() {
  }

}
