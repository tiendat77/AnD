import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecureMessagePage } from './secure-message.page';

const routes: Routes = [
  {
    path: '',
    component: SecureMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureMessagePageRoutingModule {}
