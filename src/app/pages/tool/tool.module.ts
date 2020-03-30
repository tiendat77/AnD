import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ToolPageRoutingModule } from './tool-routing.module';

import { ToolPage } from './tool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ToolPage],
})
export class ToolPageModule {}
