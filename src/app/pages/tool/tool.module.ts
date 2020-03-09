import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolPageRoutingModule } from './tool-routing.module';

import { ToolPage } from './tool.page';
import { SecureMessageComponent } from './secure-message/secure-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolPageRoutingModule
  ],
  declarations: [
    ToolPage,
    SecureMessageComponent,
  ],
  entryComponents: [SecureMessageComponent]
})
export class ToolPageModule {}
