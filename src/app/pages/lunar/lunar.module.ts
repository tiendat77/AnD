import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LunarPageRoutingModule } from './lunar-routing.module';

import { LunarPage } from './lunar.page';
import { CalendarService } from './calendar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LunarPageRoutingModule
  ],
  declarations: [LunarPage],
  providers: [CalendarService]
})
export class LunarPageModule {}
