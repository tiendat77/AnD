import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DateDiffPageRoutingModule } from './date-diff-routing.module';

import { DateDiffPage } from './date-diff.page';
import { DateDiffSettingsComponent } from '../../modals/date-diff-settings/date-diff-settings.component';
import { DateDiffService } from './date-diff.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateDiffPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    DateDiffPage,
    DateDiffSettingsComponent
  ],
  providers: [DateDiffService],
  entryComponents: [DateDiffSettingsComponent]
})
export class DateDiffPageModule {}
