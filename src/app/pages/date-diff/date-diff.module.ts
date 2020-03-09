import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateDiffPageRoutingModule } from './date-diff-routing.module';

import { DateDiffPage } from './date-diff.page';
import { SettingsComponent } from './settings/settings.component';
import { DateDiffService } from './date-diff.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDiffPageRoutingModule
  ],
  declarations: [
    DateDiffPage,
    SettingsComponent
  ],
  providers: [DateDiffService],
  entryComponents: [SettingsComponent]
})
export class DateDiffPageModule {}