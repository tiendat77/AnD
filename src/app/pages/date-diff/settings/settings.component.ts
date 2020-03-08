import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DateDiffService } from '../date-diff.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    public diffService: DateDiffService
  ) { }

  ngOnInit() {
    this.diffService.model = {
      startDate: '2013-09-30',
      endDate: '2020-03-08'
    };
  }

  async goBack() {
    return await this.modalController.dismiss();
  }

  reset() {
  }

  // TODO: change start date, end date
}
