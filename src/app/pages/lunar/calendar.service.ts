import { Injectable } from '@angular/core';

import * as moment from 'moment';
import * as lodash from 'lodash';

@Injectable()
export class CalendarService {

  options: any;
  year: number;
  month: number;
  weeks: any[];

  constructor() { }

  initialize(year: number, month: number, options?: any) {
    this.year = year;
    this.month = month;

    let monthLength = moment().year(year).month(month).startOf('month').daysInMonth();
    const date: Date = new Date(year, month, 1);

    while (date.getDay() !== 1) {
      date.setDate(date.getDate() - 1);
      monthLength++;
    }

    while (monthLength % 7 !== 0) {
      monthLength++;
    }

    this.weeks = [];
    for (let i = 0; i < monthLength; i++) {
      if (i % 7 === 0) {
        this.weeks.push([]);
      }

      this.weeks[this.weeks.length - 1].push(lodash.cloneDeep(date));
      date.setDate(date.getDate() + 1);
    }
  }
}
