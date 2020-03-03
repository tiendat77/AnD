import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateDiffPage } from './date-diff.page';

const routes: Routes = [
  {
    path: '',
    component: DateDiffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateDiffPageRoutingModule {}
