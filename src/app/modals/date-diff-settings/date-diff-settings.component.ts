import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { DEFAULT_START_DATE, DEFAULT_NAME_1, DEFAULT_NAME_2, DEFAULT_AVATAR_1, DEFAULT_AVATAR_2 } from '../../../environments/storage.key';
import { DateDiffService } from '../../pages/date-diff/date-diff.service';

@Component({
  selector: 'date-diff-settings',
  templateUrl: './date-diff-settings.component.html',
  styleUrls: ['./date-diff-settings.component.scss'],
})
export class DateDiffSettingsComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private imagePicker: ImagePicker,
    public diffService: DateDiffService,
  ) { }

  ngOnInit() {
  }

  async done() {
    this.diffService.changeDate('start', this.diffService.model.startDate);
    this.diffService.changeDate('until', this.diffService.model.untilDate);
    this.diffService.calculateDiff();

    return await this.modalController.dismiss();
  }

  reset() {
    const startDate = DEFAULT_START_DATE;
    this.diffService.model.startDate = startDate;

    const now = new Date();
    const untilDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.diffService.model.untilDate = untilDate;

    this.diffService.changeName('name1', DEFAULT_NAME_1);
    this.diffService.changeName('name2', DEFAULT_NAME_2);
    this.diffService.changeAvatar('avatar1', DEFAULT_AVATAR_1);
    this.diffService.changeAvatar('avatar2', DEFAULT_AVATAR_2);
  }

  async presentChangeNamePrompt(type: 'name1' | 'name2') {
    const alert = await this.alertCtrl.create({
      header: 'Change info name',
      mode: 'md',
      inputs: [
        {
          name: 'name',
          id: 'name',
          placeholder: 'New name',
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
            const newName: string = data.name.trim();
            return this.diffService.changeName(type, newName);
          }
        }
      ]
    });

    return await alert.present();
  }

  async presentImagePicker(type: 'avatar1' | 'avatar2') {
    const options: any = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 80,
      outputType: 1,
    };

    this.imagePicker.getPictures(options).then((result) => {
      if (result && result.length > 0) {
        this.diffService.changeAvatar(type, 'data:image/jpeg;base64,' + result);
      }
    }, (error) => {
      this.diffService.notify('Fail to load image');
    });
  }
}
