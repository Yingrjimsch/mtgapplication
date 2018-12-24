import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alert: AlertController) { }

  async showAlert(message: string) {
    const alert = await this.alert.create({
      header: 'Error',
      subHeader: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
