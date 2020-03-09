import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DateDiffService } from './date-diff.service';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-date-diff',
  templateUrl: './date-diff.page.html',
  styleUrls: ['./date-diff.page.scss'],
})
export class DateDiffPage implements OnInit {

  isCalculated = false;
  days = true;
  diff = '';

  constructor(
    private modalController: ModalController,
    public diffService: DateDiffService
  ) { }

  ngOnInit() {
    this.diffService.initialize();
  }

  async openSettings() {
    const settings = await this.modalController.create({
      component: SettingsComponent,
      swipeToClose: true
    });

    return await settings.present();
  }

  calDiff() {
    const endDate = new Date(this.diffService.model.endDate);
    const startDate = new Date(this.diffService.model.startDate);
    console.log({startDate, endDate});

    const timestamp = endDate.getTime() - startDate.getTime();
    const daysDiff  = Math.round(timestamp / (24 * 60 * 60 * 1000));
    this.diffService.model.daysDiff = daysDiff + ' days';

    const years = Math.round(daysDiff / 365);
    const months = Math.round((daysDiff % 365) / 30);
    const days = Math.round((daysDiff % 365) % 30);

    this.diffService.model.dmyDiff = years + ' years ' + months + ' months ' + days + ' days';
    this.isCalculated = true;
  }

  show() {
    if (!this.isCalculated) {
      this.calDiff();
    }

    if (this.days) {
      this.diff = this.diffService.model.daysDiff;
    } else {
      this.diff = this.diffService.model.dmyDiff;
    }

    this.days = !this.days;
  }

}
