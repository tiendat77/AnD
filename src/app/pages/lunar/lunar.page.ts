import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IDate } from 'src/app/interfaces/date';
import { getLunarDate, getSolarDate } from './solar2lunar';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-lunar',
  templateUrl: './lunar.page.html',
  styleUrls: ['./lunar.page.scss'],
})
export class LunarPage implements OnInit {

  selectedDate: IDate;
  weekdays: string[] = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', ];
  quoteOfDay = '';

  constructor(
    public calendarService: CalendarService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.refresh();
    // this.getQuote();
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

  getQuote() {
    this.http.get('https://quotes.rest/qod').subscribe((res: any) => {
      if (res && res.contents && res.contents.quotes) {
        const quote = res.contents.quotes[0];
        this.quoteOfDay = quote.quote + ' - ' + quote.author;
      }
    });
  }

}
