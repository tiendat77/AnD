import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { NotifyService } from 'src/app/providers/notify.service';

@Component({
  selector: 'app-secret-key',
  templateUrl: './secret-key.component.html',
  styleUrls: ['./secret-key.component.scss'],
})
export class SecretKeyComponent implements OnInit {

  key = '';
  keyLength = 0;

  constructor(
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
  }

  changeSecretKey(input: any) {
    const value = input.toString();
    if (value.length !== 16) {
      this.notifyService.notify('Secret key must contain 16 characters');
      return;
    }
    this.popoverCtrl.dismiss({ newKey: value });
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  updateLength(value) {
    this.keyLength = value.length;
  }

}
