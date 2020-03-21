import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, PopoverController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { STORAGE_SECRET_KEY, DEFAULT_SECRET_KEY } from '../../../environments/storage.key';
import { SecretKeyComponent } from '../secret-key/secret-key.component';
import { NotifyService } from 'src/app/providers/notify.service';
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
    private popoverCtrl: PopoverController,
    private clipboard: Clipboard,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    private storage: Storage,
    private notifyService: NotifyService,
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

  async presentChangeKeyPrompt() {
    const popover = await this.popoverCtrl.create({
      component: SecretKeyComponent,
      componentProps: {
        key: this.secretKey,
      }
    });

    popover.onDidDismiss().then((res) => {
      if (res.data && res.data.newKey) {
        const newKey = res.data.newKey;
        console.log('newle', newKey);
        this.changeSecretKey(newKey);
      }
    });

    return await popover.present();
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
    const encryptedHex = this.model.inMessage.trim();

    for (const char of encryptedHex) {
      if (!isHex(char)) {
        return;
      }
    }

    const key = new TextEncoder().encode(this.secretKey);

    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    this.model.outMessage = decryptedText;

    function isHex(h) {
      var a = parseInt(h, 16);
      return (a.toString(16) === h.toLowerCase());
    }
  }

  copyText() {
    this.clipboard.copy(this.model.outMessage);
    this.notifyService.notify('Copied to clipboard');
  }

  pasteText() {
    this.clipboard.paste().then(
      (resolve: string) => {
        this.model.inMessage = resolve;
        this.notifyService.notify('Pasted from clipboard');
      },
      (reject: string) => {
        this.notifyService.notify('Paste error: ' + reject);
      }
    );
  }

  launchZalo() {
    const packageName = 'com.zing.zalo';

    if (this.platform.is('ios')) {
      this.notifyService.notify(`Not support ios`);
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

  changeSecretKey(value): boolean {
    const newkey: string = value.trim();

    if (newkey.length !== 16) {
      return false;
    }

    this.secretKey = newkey;
    this.storage.set(STORAGE_SECRET_KEY, newkey).then(() => {
      this.notifyService.notify('Success');
    });

    return true;
  }
}
