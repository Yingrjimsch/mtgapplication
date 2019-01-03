import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {

  constructor(private actionSheetController: ActionSheetController) { }

  async presentCustomActionSheet(header: string, buttons) {
    const actionSheet = await this.actionSheetController.create({
      header: header,
      buttons: buttons
    });
    await actionSheet.present();
  }
}
