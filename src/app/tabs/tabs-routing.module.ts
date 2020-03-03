import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'lunar',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/lunar/lunar.module').then(m => m.LunarPageModule),
          }
        ]
      },
      {
        path: 'date-diff',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/date-diff/date-diff.module').then(m => m.DateDiffPageModule)
          }
        ]
      },
      {
        path: 'tool',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tool/tool.module').then(m => m.ToolPageModule)
          }
        ]
      },
      {
        path: '*',
        redirectTo: 'tabs/lunar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
