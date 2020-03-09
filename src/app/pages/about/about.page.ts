import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private inAppBrowser: InAppBrowser,
    private clipboard: Clipboard,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  async goBack() {
    return await this.navCtrl.pop();
  }

  openGitHub(type: string = 'project' || 'person') {
    let url = 'https://github.com/attain7710/';

    if (type === 'project') {
      url = url + 'AnD2';
    }

    this.inAppBrowser.create(url, '_system');
  }

  openEmail() {
    window.open('mailto:huynhztienzdat@gmail.com', '_system');
  }

  async openShare() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share',
      buttons: [
        {
          text: 'Copy link',
          handler: () => {
            this.clipboard.copy('https://github.com/attain7710/AnD2');
            this.notify('Copied to clipboard');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async notify(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
    });

    return await toast.present();
  }
}
