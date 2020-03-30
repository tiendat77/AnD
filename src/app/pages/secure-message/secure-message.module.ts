import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecureMessagePageRoutingModule } from './secure-message-routing.module';

import { SecureMessagePage } from './secure-message.page';
import { SecretKeyComponent } from 'src/app/modals/secret-key/secret-key.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecureMessagePageRoutingModule
  ],
  declarations: [
    SecureMessagePage,
    SecretKeyComponent
  ],
  entryComponents: [
    SecretKeyComponent
  ]
})
export class SecureMessagePageModule {}
