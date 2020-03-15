import { Component, OnInit } from '@angular/core';

import { IDate } from 'src/app/interfaces/date';
import { getLunarDate, getSolarDate, WEEKDAY } from './solar2lunar';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-lunar',
  templateUrl: './lunar.page.html',
  styleUrls: ['./lunar.page.scss'],
})
export class LunarPage implements OnInit {

  selectedDate: IDate;
  weekdays: string[] = WEEKDAY;

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.refresh();
  }

  refresh() {
    const now = new Date();

    this.calendarService.initialize(now.getFullYear(), now.getMonth());

    this.selectedDate = {
      solar: getSolarDate(now),
      lunar: getLunarDate(now),
      isDisabled: false,
      isToday: true,
    };
  }

  selectDate(date: IDate) {
    this.selectedDate = date;
  }

  trackById(index, item) {
    if (!item) {
      if (index) { return index; }
      return null;
    }

    return item.solar.date;
  }

}
