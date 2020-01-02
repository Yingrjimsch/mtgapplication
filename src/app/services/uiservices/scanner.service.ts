import { Injectable } from '@angular/core';
import { GoogleCloudVisionService } from '../httpservices/google-cloud-vision.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ScannedCard } from 'src/app/classes/scanned-card';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  readonly options: CameraOptions = {
    quality: 100,
    targetHeight: 700,
    targetWidth: 500,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  };
  constructor(private camera: Camera,
    private visionService: GoogleCloudVisionService, private toastService: ToastService) { }


  public async scannCard() {
    const imageData = await this.camera.getPicture(this.options).catch(error => this.toastService.presentErrorToast('error on get picture'));
    const result = await this.visionService.getTextDetectionResponse(imageData).toPromise().catch(error => this.toastService.presentErrorToast('error on get tdr'));
    return this.parseTextDetectionResponse(result);
  }

  scannCard2() {
    return this.camera.getPicture(this.options)
      .then(imageData => {
        return this.visionService.getTextDetectionResponse(imageData).toPromise().then(//subscribe(
          result => {
            //this.toastService.presentSuccessToast('Text successfully read!');
            return this.parseTextDetectionResponse(result);
            //this.parseMTGServiceResponse(sc);
          }//,
          /*() => {
            this.toastService.presentErrorToast('Error while trying to read Text');
          }
        );
      },
      () => {
        this.toastService.presentErrorToast('Error while trying to make picture');
      }*/
        );
      });
  }
  private parseTextDetectionResponse(textDetectionResponse: any) {
    const responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
    return new ScannedCard(responseToParse.description, responseToParse.locale);
  }
}