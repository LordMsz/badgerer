import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeComponent } from './badge.component';
import { BadgeListComponent } from './pages/badge-list/badge-list.component';
import { BadgeNewComponent } from './pages/badge-new/badge-new.component';

const routes: Routes = [
  {
    path: '',
    component: BadgeComponent,
    children: [
      {
        path: 'list',
        component: BadgeListComponent
      },
      {
        path: 'new',
        component: BadgeNewComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadgeRoutingModule { }
