import { Injectable } from '@angular/core';

import { IDate } from '../../interfaces/date';
import { getLunarDate, getSolarDate } from './solar2lunar';

import * as moment from 'moment';

@Injectable()
export class CalendarService {

  options: any;
  year: number;
  month: number;
  weeks: any[];

  weekDays: string[] = [ 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN' ];

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

      iDate = {
        solar: getSolarDate(date),
        lunar: getLunarDate(date),
        isDisabled: date.getMonth() !== month,
        isToday: isToday(date)
      };

      this.weeks[this.weeks.length - 1].push(iDate);
      date.setDate(date.getDate() + 1);
    }

    function isToday(day: Date) {
      const now = new Date();
      return now.getDate() === day.getDate() && now.getMonth() === day.getMonth();
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
