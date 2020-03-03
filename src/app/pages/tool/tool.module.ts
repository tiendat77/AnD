import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolPageRoutingModule } from './tool-routing.module';

import { ToolPage } from './tool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolPageRoutingModule
  ],
  declarations: [ToolPage]
})
export class ToolPageModule {}
