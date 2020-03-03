import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolPage } from './tool.page';

const routes: Routes = [
  {
    path: '',
    component: ToolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolPageRoutingModule {}
