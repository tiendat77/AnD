import { Component, OnInit } from '@angular/core';

import { SolarDate, IDate, LunarDate } from 'src/app/interfaces/date';
import { Solar2Lunar } from './solar2lunar';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-lunar',
  templateUrl: './lunar.page.html',
  styleUrls: ['./lunar.page.scss'],
})
export class LunarPage implements OnInit {

  selectedDate: {
    date: number,
    month: number,
  };

  lunar: LunarDate;

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    this.selectedDate = { date, month };

    this.lunar = Solar2Lunar(date, month, year);
    console.log(this.lunar.lunarYear + ' ' + this.lunar.month + ' ' + this.lunar.date);
    this.calendarService.initialize(year, month);
  }

  refresh() {
    console.log('refresh', this.calendarService.weeks);
  }

  selectDate(date: IDate) {
    console.log('selected date: ', date);
    this.selectedDate = {
      date: date.solar.date,
      month: date.solar.month,
    };

    // TODO: SHOW LUNAR CALENDAR
    this.lunar = date.lunar;
  }

}
