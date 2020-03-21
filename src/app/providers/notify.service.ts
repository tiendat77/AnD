import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastCtrl: ToastController) { }

  async notify(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ],
      duration: 3000,
    });

    return await toast.present();
  }

  async translate(message: string) {
    // TODO:
  }
}
