import { Component, OnInit } from '@angular/core';

import { SolarDate, IDate } from 'src/app/interfaces/date';
import { Solar2Lunar } from './solar2lunar';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-lunar',
  templateUrl: './lunar.page.html',
  styleUrls: ['./lunar.page.scss'],
})
export class LunarPage implements OnInit {

  selectedCalendar: SolarDate;
  selectedDate: number;
  result = '';

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    const now = new Date();
    this.selectedCalendar = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate()
    };

    this.selectedDate = now.getDate();

    const lunar = Solar2Lunar(now.getDate(), now.getMonth(), now.getFullYear());
    console.log(lunar.lunarYear + ' ' + lunar.month + ' ' + lunar.date);
    this.calendarService.initialize(now.getFullYear(), now.getMonth());
  }

  refresh() {
    console.log('refresh', this.calendarService.weeks);
  }

  selectDate(date: IDate) {
    console.log('selected date: ', date);
    this.selectedDate = date.solar.date;
  }

}
