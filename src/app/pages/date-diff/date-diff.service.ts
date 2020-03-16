import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { STORAGE_START_DATE, STORAGE_END_DATE, DEFAULT_START_DATE } from '../../../environments/storage.key';
import { DateDiffModel } from 'src/app/interfaces/date-diff';

@Injectable()
export class DateDiffService {

  model: DateDiffModel;

  constructor(
    private storage: Storage,
  ) { }

  initialize() {
    this.model = {
      startDate: '',
      untilDate: '',
      days: '',
      dmy: {
        days: '',
        months: '',
        years: ''
      }
    };

    this.storage.get(STORAGE_START_DATE).then(start => {
      if (start) {
        this.model.startDate = start;
      } else {
        this.model.startDate = DEFAULT_START_DATE;
        this.storage.set(STORAGE_START_DATE, DEFAULT_START_DATE);
      }
    });

    const now = new Date();
    const endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.model.untilDate = endDate;
    this.storage.set(STORAGE_END_DATE, endDate);
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
    const endDate = new Date(this.model.untilDate);

    const timestamp = endDate.getTime() - startDate.getTime();
    const daysDiff  = Math.round(timestamp / (24 * 60 * 60 * 1000));

    const years = Math.round(daysDiff / 365);
    const months = Math.round((daysDiff % 365) / 30);
    const days = Math.round((daysDiff % 365) % 30);

    this.model.days = daysDiff.toString();
    this.model.dmy = { days: days.toString(), months: months.toString(), years: years.toString() };
  }
}
