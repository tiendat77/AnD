import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { STORAGE_START_DATE, STORAGE_END_DATE } from '../../../environments/storage.key';

@Injectable()
export class DateDiffService {

  model: {
    startDate: string,
    endDate: string,
    days: string,
    dmy: string
  };

  constructor(
    private storage: Storage,
  ) { }

  initialize() {
    this.model = { startDate: '', endDate: '', days: '', dmy: '' };
    const now = new Date();

    this.storage.get(STORAGE_START_DATE).then(start => {
      if (start) {
        this.model.startDate = start;
      } else {
        const startDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        this.model.startDate = startDate;
        this.storage.set(STORAGE_START_DATE, startDate);
      }
    });

    const endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.model.endDate = endDate;
    this.storage.set(STORAGE_END_DATE, endDate);

    // this.storage.get('DATE_DIFF_END').then(end => {
    //   if (end) {
    //     this.model.endDate = end;
    //   } else {
    //   }
    // });
  }

  changeDate(type: string, value: string) {
    if (type === 'start') {
      console.log('start', value);
      this.storage.set(STORAGE_START_DATE, value);
      return;
    }

    if (type === 'end') {
      console.log('end', value);
      this.storage.set(STORAGE_END_DATE, value);
      return;
    }
  }

  calculateDiff() {
    if (this.model.startDate.length === 0) { return; }

    const startDate = new Date(this.model.startDate);
    const endDate = new Date(this.model.endDate);

    const timestamp = endDate.getTime() - startDate.getTime();
    const daysDiff  = Math.round(timestamp / (24 * 60 * 60 * 1000));

    const years = Math.round(daysDiff / 365);
    const months = Math.round((daysDiff % 365) / 30);
    const days = Math.round((daysDiff % 365) % 30);

    this.model.days = daysDiff + ' days';
    this.model.dmy = years + ' years ' + months + ' months ' + days + ' days';
  }
}
