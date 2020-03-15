import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ToolPageRoutingModule } from './tool-routing.module';

import { ToolPage } from './tool.page';
import { SecureMessageComponent } from '../../modals/secure-message/secure-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ToolPage,
    SecureMessageComponent,
  ],
  entryComponents: [SecureMessageComponent]
})
export class ToolPageModule {}
