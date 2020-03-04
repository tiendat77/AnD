import { Component, OnInit } from '@angular/core';

import { Solar2Lunar } from './solar2lunar';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-lunar',
  templateUrl: './lunar.page.html',
  styleUrls: ['./lunar.page.scss'],
})
export class LunarPage implements OnInit {

  solar: any;
  lunar: any;
  result = '';

  constructor(public calendarService: CalendarService) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    const lunar = Solar2Lunar(24, 4, 2020);
    console.log(lunar.canchi + ' ' + lunar.month + ' ' + lunar.date);
    this.calendarService.initialize(2020, 3);
  }

  refresh() {
    console.log('refresh');
  }

}
