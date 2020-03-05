import { Injectable } from '@angular/core';

import { IDate } from '../../interfaces/date';
import { Solar2Lunar } from './solar2lunar';

import * as moment from 'moment';
import * as lodash from 'lodash';

@Injectable()
export class CalendarService {

  options: any;
  year: number;
  month: number;
  weeks: any[];

  weekHeader: string[] = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ];
  monthHeader: string[] = [  ];

  model = {
    selectedCalendar: '',
    selectedDate: new Date(),
  };

  constructor() { }

  // MONTH START FROM 0
  initialize(year: number, month: number, options?: any) {
    this.year = year;
    this.month = month;
    this.model.selectedCalendar = year + '-' + (month + 1) + '-' + '1';

    let monthLength = moment().year(year).month(month).daysInMonth();
    const date: Date = new Date(year, month, 1);
    let iDate: IDate;
    let tempDate: number;
    let tempMonth: number;
    let tempYear: number;

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
      tempDate = date.getDate();
      tempMonth = date.getMonth();
      tempYear = date.getFullYear();

      iDate = {
        solar: {
          year: tempYear,
          month: tempMonth,
          date: tempDate,
        },
        lunar: Solar2Lunar(tempDate, tempMonth, tempYear),
        isDisabled: tempMonth !== month,
        isToday: isToday(tempDate, tempMonth)
      };

      this.weeks[this.weeks.length - 1].push(iDate);
      date.setDate(date.getDate() + 1);
    }

    function isToday(d: number, m: number) {
      const now = new Date();
      return now.getDate() === d && now.getMonth() === m;
    }
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }

    this.initialize(this.year, this.month);
  }

  previousMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }

    this.initialize(this.year, this.month);
  }

  chooseMonth(event) {
    const value: string = event.target.value;
    const selected = new Date(value);

    this.initialize(selected.getFullYear(), selected.getMonth());
  }

}
