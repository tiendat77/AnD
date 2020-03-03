import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDiffPageRoutingModule } from './date-diff-routing.module';

import { DateDiffPage } from './date-diff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDiffPageRoutingModule
  ],
  declarations: [DateDiffPage]
})
export class DateDiffPageModule {}
