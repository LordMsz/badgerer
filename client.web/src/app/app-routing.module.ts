import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'badge', loadChildren: () => import('@badgerer/badge/badge.module').then(m => m.BadgeModule) },
  { path: 'team', loadChildren: () => import('./team/team.module').then(m => m.TeamModule) },
  { path: 'change-detection', loadChildren: () => import('./change-detection/change-detection.module').then(m => m.ChangeDetectionModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
