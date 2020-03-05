import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DateDiffService {

  model: {
    startDate: string,
    endDate: string
  };

  constructor(
    private storage: Storage,
  ) { }

  initialize() {
    this.storage.get('DATE_DIFF_START').then(start => {
      if (start) {
        this.model.startDate = start;
      }
    });

    this.storage.get('DATE_DIFF_END').then(end => {
      if (end) {
        this.model.endDate = end;
      }
    });
  }

  changeDate(event: any, type: string) {
    const value: string = event.target.value;

    if (type === 'start') {
      this.storage.set('DATE_DIFF_START', value);
      return;
    }

    if (type === 'end') {
      this.storage.set('DATE_DIFF_END', value);
    }
  }
}
