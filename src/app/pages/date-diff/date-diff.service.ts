import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { STORAGE_START_DATE, STORAGE_UNTIL_DATE, DEFAULT_START_DATE } from '../../../environments/storage.key';
import { DateDiffModel } from 'src/app/interfaces/date-diff';
import * as moment from 'moment';

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
        days: 0,
        months: 0,
        years: 0
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
    const untilDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.model.untilDate = untilDate;
    this.storage.set(STORAGE_UNTIL_DATE, untilDate);
  }

  changeDate(type: string, value: string) {
    if (type === 'start') {
      console.log('start', value);
      this.storage.set(STORAGE_START_DATE, value);
      return;
    }

    if (type === 'until') {
      console.log('until', value.slice(0, 10));
      this.storage.set(STORAGE_UNTIL_DATE, value.slice(0, 10));
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
}
