import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { TutorialPageRoutingModule } from './tutorial-routing.module';
import { TutorialPage } from './tutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    TutorialPageRoutingModule
  ],
  declarations: [TutorialPage]
})
export class TutorialPageModule {}
