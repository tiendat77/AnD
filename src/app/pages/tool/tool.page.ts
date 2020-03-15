import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SecureMessageComponent } from '../../modals/secure-message/secure-message.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.page.html',
  styleUrls: ['./tool.page.scss'],
})
export class ToolPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async openSecureMessage() {
    const secureMessage = await this.modalCtrl.create({
      component: SecureMessageComponent,
      swipeToClose: true,
    });

    await secureMessage.present();
  }

}
