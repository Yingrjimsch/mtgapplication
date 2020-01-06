import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  
  constructor(private alertController: AlertController) {}

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: "Error",
      subHeader: message,
      buttons: ["OK"]
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
  
  async confirmationAlert(message: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: () => resolveFunction(false)
        },
        {
          text: 'Yes',
          handler: () => resolveFunction(true)
        }
      ]
    });
    await alert.present();
    return promise;
  }

  async presentNumberAlert(message: string, count: number) {
    let resolveFunction: (count: number) => void;
    const promise = new Promise<number>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      header: 'Delete Card',
      message,
      backdropDismiss: false,
      inputs: [{
        name: 'deleteCount',
        label: 'Delete Count',
        value: count,
        type: 'number'
      }],
      buttons: [
        {
          text: 'No',
          handler: () => resolveFunction(0)
        },
        {
          text: 'Yes',
          handler: (data: { deleteCount: number; }) => resolveFunction(data.deleteCount),
        }
      ]
    });
    await alert.present();
    return promise;
  }
  
}
