import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../google-cloud-vision.service';
import { AlertService } from '../alert.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    private camera: Camera,
    private vision: GoogleCloudVisionService,
    private alert: AlertService,
    private db: DatabaseService
  ) {}

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.vision.getText(imageData).subscribe(
          result => {
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
}
