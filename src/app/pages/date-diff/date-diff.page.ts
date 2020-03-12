import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DateDiffService } from './date-diff.service';
import { DateDiffSettingsComponent } from '../../modals/date-diff-settings/date-diff-settings.component';

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
      component: DateDiffSettingsComponent,
      swipeToClose: true
    });

    return await settings.present();
  }

  show() {
    if (!this.isCalculated) {
      this.diffService.calculateDiff();
    }

    this.days = !this.days;
  }

}
