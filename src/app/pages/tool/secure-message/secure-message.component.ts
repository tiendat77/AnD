import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, ToastController } from '@ionic/angular';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import * as aesjs from 'aes-js';

@Component({
  selector: 'app-secure-message',
  templateUrl: './secure-message.component.html',
  styleUrls: ['./secure-message.component.scss'],
})
export class SecureMessageComponent implements OnInit {

  model: {
    inMessage: string,
    outMessage: string,
  };

  mode: 'encrypt' | 'decrypt';
  secretKey = 'thesecretkey1234';
  encryptedHex = '';

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private clipboard: Clipboard,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.model = {
      inMessage: '',
      outMessage: '',
    };

    this.mode = 'encrypt';
  }

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
    this.clipboard.copy(this.model.inMessage);
    this.notify('Copied to clipboard');
  }

  // From: https://github.com/ricmoo/aes-js
  encrypt() {
    const key = new TextEncoder().encode(this.secretKey);

    const text = this.model.inMessage.trim();
    const textBytes = aesjs.utils.utf8.toBytes(text);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

    this.encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(this.encryptedHex);
  }

  decrypt() {
    const key = new TextEncoder().encode(this.secretKey);

    const encryptedHex = this.model.inMessage.trim();
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
  }

  pasteText() {
    this.clipboard.paste().then(
      (resolve: string) => {
        this.model.outMessage = resolve;
        this.notify('Pasted from clipboard');
      },
      (reject: string) => {
        this.notify('Paste error: ' + reject);
      }
    );
  }

  launchZalo() {
    const packageName = 'com.zing.zalo';

    if (this.platform.is('ios')) {
      this.notify(`Not support ios`);
    } else if (this.platform.is('android')) {
      this.inAppBrowser.create('android-app://' + packageName, '_system');
    }
  }
}
