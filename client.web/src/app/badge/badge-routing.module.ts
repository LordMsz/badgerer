import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeComponent } from './badge.component';
import { BadgeListComponent } from './pages/badge-list/badge-list.component';
import { BadgeNewComponent } from './pages/badge-new/badge-new.component';
import { BadgeDetailComponent } from './pages/badge-detail/badge-detail.component';

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
        path: 'detail/:id/:badgeUrlName',
        component: BadgeDetailComponent
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
