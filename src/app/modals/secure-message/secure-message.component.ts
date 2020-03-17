import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, ToastController, AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { STORAGE_SECRET_KEY, DEFAULT_SECRET_KEY } from '../../../environments/storage.key';
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
  secretKey: string;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private clipboard: Clipboard,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    private storage: Storage,
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

    this.storage.get(STORAGE_SECRET_KEY).then(key => {
      if (key) {
        this.secretKey = key;
      } else {
        this.secretKey = DEFAULT_SECRET_KEY;
        this.storage.set(STORAGE_SECRET_KEY, DEFAULT_SECRET_KEY);
      }
    });
  }

  async goBack() {
    return await this.modalCtrl.dismiss();
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Change secret key',
      subHeader: 'Current key: ' + this.secretKey,
      mode: 'md',
      inputs: [
        {
          name: 'key',
          id: 'key',
          placeholder: '16 characters',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            return this.changeSecretKey(data);
          }
        }
      ]
    });

    return await alert.present();
  }

  async notify(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
    });

    return await toast.present();
  }

  // From: https://github.com/ricmoo/aes-js
  encrypt() {
    const key = new TextEncoder().encode(this.secretKey);

    const text = this.model.inMessage.trim();
    const textBytes = aesjs.utils.utf8.toBytes(text);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    this.model.outMessage = encryptedHex;
  }

  decrypt() {
    const key = new TextEncoder().encode(this.secretKey);

    const encryptedHex = this.model.inMessage.trim();
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    this.model.outMessage = decryptedText;
  }

  copyText() {
    this.clipboard.copy(this.model.outMessage);
    this.notify('Copied to clipboard');
  }

  pasteText() {
    this.clipboard.paste().then(
      (resolve: string) => {
        this.model.inMessage = resolve;
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
      return;
    } else if (this.platform.is('android')) {
      this.appAvailability.check(packageName).then(
        (yes: boolean) => {
          this.inAppBrowser.create('android-app://' + packageName, '_system');
        },
        (no: boolean) => {
          this.inAppBrowser.create('https://chat.zalo.me', '_system');
        }
      );
    }
  }

  changeSecretKey(data): boolean {
    const newkey: string = data.key.trim();
    if (newkey.length !== 16) {
      this.notify('Secret key must contain 16 characters!');
      return false;
    }

    this.alertCtrl.dismiss();
    this.storage.set(STORAGE_SECRET_KEY, newkey).then(() => {
      this.notify('Success');
    });
    return true;
  }
}
