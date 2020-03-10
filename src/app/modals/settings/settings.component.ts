import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DEFAULT_START_DATE } from '../../../environments/storage.key';
import { DateDiffService } from '../../pages/date-diff/date-diff.service';

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
  }

  async done() {
    this.diffService.changeDate('start', this.diffService.model.startDate);
    this.diffService.changeDate('end', this.diffService.model.endDate);
    this.diffService.calculateDiff();

    return await this.modalController.dismiss();
  }

  reset() {
    const startDate = DEFAULT_START_DATE;
    this.diffService.model.startDate = startDate;

    const now = new Date();
    const endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    this.diffService.model.endDate = endDate;
  }
}
