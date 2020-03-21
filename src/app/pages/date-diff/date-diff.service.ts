import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DateDiffModel, InfoModel } from 'src/app/interfaces/date-diff';

import {
  STORAGE_START_DATE, STORAGE_UNTIL_DATE,
  DEFAULT_START_DATE,
  STORAGE_NAME_1, STORAGE_NAME_2,
  DEFAULT_NAME_1, DEFAULT_NAME_2,
  STORAGE_AVATAR_1, STORAGE_AVATAR_2,
  DEFAULT_AVATAR_1, DEFAULT_AVATAR_2
} from '../../../environments/storage.key';

import * as moment from 'moment';

@Injectable()
export class DateDiffService {

  model: DateDiffModel;
  infoModel: InfoModel;

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
  ) {
    this.initModel();
  }

  initModel() {
    this.model = {
      startDate: '',
      untilDate: '',
      days: '',
      dmy: {
        days: 0,
        months: 0,
        years: 0
      }
    };

    this.infoModel = {
      name1: '',
      name2: '',
      avatar1: '',
      avatar2: ''
    };
  }

  async initDate() {

    await this.storage.get(STORAGE_START_DATE).then(start => {
      if (start) {
        this.model.startDate = start;
      } else {
        this.model.startDate = DEFAULT_START_DATE;
        this.storage.set(STORAGE_START_DATE, DEFAULT_START_DATE);
      }
    });

    const now = new Date();
    const untilDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.model.untilDate = untilDate;

    return await this.storage.set(STORAGE_UNTIL_DATE, untilDate);
  }

  async initAvatarAndName() {

    await this.storage.get(STORAGE_NAME_1).then(name => {
      if (name) {
        this.infoModel.name1 = name;
      } else {
        this.infoModel.name1 = DEFAULT_NAME_1;
      }
    });

    await this.storage.get(STORAGE_NAME_2).then(name => {
      if (name) {
        this.infoModel.name2 = name;
      } else {
        this.infoModel.name2 = DEFAULT_NAME_2;
      }
    });

    await this.storage.get(STORAGE_AVATAR_1).then(avatar => {
      if (avatar) {
        this.infoModel.avatar1 = avatar;
      } else {
        this.infoModel.avatar1 = DEFAULT_AVATAR_1;
      }
    });

    await this.storage.get(STORAGE_AVATAR_2).then(avatar => {
      if (avatar) {
        this.infoModel.avatar2 = avatar;
      } else {
        this.infoModel.avatar2 = DEFAULT_AVATAR_2;
      }
    });
  }

  changeDate(type: string, value: string) {
    if (type === 'start') {
      this.storage.set(STORAGE_START_DATE, value);
      return;
    }

    if (type === 'until') {
      this.storage.set(STORAGE_UNTIL_DATE, value.slice(0, 10));
      return;
    }
  }

  changeName(type: 'name1' | 'name2', value: string): boolean {
    if (value.length > 40) {
      this.notify('Name is too long!');
      return false;
    }

    if (value.length === 0) {
      return true;
    }

    if (type === 'name1') {
      this.storage.set(STORAGE_NAME_1, value);
      this.infoModel.name1 = value;
      return true;
    }

    if (type === 'name2') {
      this.storage.set(STORAGE_NAME_2, value);
      this.infoModel.name2 = value;
      return true;
    }

    return false;
  }

  changeAvatar(type: 'avatar1' | 'avatar2', value: string) {
    if (type === 'avatar1') {
      this.storage.set(STORAGE_AVATAR_1, value);
      this.infoModel.avatar1 = value;
      return;
    }

    if (type === 'avatar2') {
      this.storage.set(STORAGE_AVATAR_2, value);
      this.infoModel.avatar2 = value;
      return;
    }
  }

  calculateDiff() {
    if (this.model.startDate.length === 0) { return; }

    const startDate = moment(this.model.startDate, 'YYYY/MM/DD');
    const untilDate = moment(this.model.untilDate, 'YYYY/MM/DD');

    const diffDays  = untilDate.diff(startDate, 'days');
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = Math.floor((diffDays % 365) % 30);

    this.model.days = diffDays.toString();
    this.model.dmy = { days, months, years };
  }

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
}
