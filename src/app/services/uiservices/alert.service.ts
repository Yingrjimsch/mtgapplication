import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentCustomAlert(header, input, buttons) {
    const alert = await this.alertController.create({
      header: header,
      inputs: input,
      buttons: buttons
    });
    await alert.present();
  }
}
