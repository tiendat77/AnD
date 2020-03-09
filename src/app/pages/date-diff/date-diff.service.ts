import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DateDiffService {

  model: {
    startDate: string,
    endDate: string,
    daysDiff: string,
    dmyDiff: string,
  };

  constructor(
    private storage: Storage,
  ) { }

  initialize() {
    this.model = { startDate: '', endDate: '', daysDiff: '', dmyDiff: '' };

    this.storage.get('DATE_DIFF_START').then(start => {
      if (start) {
        this.model.startDate = start;
      } else {
        const now = new Date();
        const startDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        this.model.startDate = startDate;
        this.storage.set('DATE_DIFF_START', startDate);
      }
    });

    this.storage.get('DATE_DIFF_END').then(end => {
      if (end) {
        this.model.endDate = end;
      } else {
        const now = new Date();
        const endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        this.model.endDate = endDate;
        this.storage.set('DATE_DIFF_END', endDate);
      }
    });
  }

  changeDate(type: string, value: string) {
    if (type === 'start') {
      console.log('start', value);
      this.storage.set('DATE_DIFF_START', value);
      return;
    }

    if (type === 'end') {
      console.log('end', value);
      this.storage.set('DATE_DIFF_END', value);
      return;
    }
  }
}
