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

  ngOnInit() {}

  async goBack() {
    return await this.modalController.dismiss();
  }

  // TODO: change start date, end date
}
