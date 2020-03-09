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

  constructor(
    private modalController: ModalController,
    public diffService: DateDiffService
  ) { }

  ngOnInit() {
  }

  async openSettings() {
    const settings = await this.modalController.create({
      component: SettingsComponent,
      swipeToClose: true
    });

    return await settings.present();
  }

}