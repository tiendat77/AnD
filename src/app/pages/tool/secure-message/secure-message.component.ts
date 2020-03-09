import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-secure-message',
  templateUrl: './secure-message.component.html',
  styleUrls: ['./secure-message.component.scss'],
})
export class SecureMessageComponent implements OnInit {

  model = {
    copy: 'test copy',
    paste: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private clipboard: Clipboard,
  ) { }

  ngOnInit() {}

  async goBack() {
    return await this.modalCtrl.dismiss();
  }

  async notify(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
    });

    return await toast.present();
  }

  copyText() {
    this.clipboard.copy(this.model.copy);
    this.notify('Copied to clipboard');
  }

  pasteText() {
    this.clipboard.paste().then(
      (resolve: string) => {
        this.model.paste = resolve;
        this.notify('Pasted from clipboard');
      },
      (reject: string) => {
        this.notify('Error: ' + reject);
      }
    );
  }
}
