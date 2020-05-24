import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeDetectionComponent } from './change-detection.component';
import { DefaultSimpleComponent } from './pages/default-simple/default-simple.component';
import { OnPushSimpleComponent } from './pages/nested/onpush-simple.component';
import { ContentProjectedComponent } from './pages/content-projected/content-projected.component';

const routes: Routes = [
  { path: '', component: ChangeDetectionComponent },
  { path: 'default-simple', component: DefaultSimpleComponent },
  {
    path: 'nested',
    component: OnPushSimpleComponent,
    children: [
      { path: '', component: DefaultSimpleComponent }
    ]
  },
  {
    path: 'content-projected',
    component: ContentProjectedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDetectionRoutingModule { }
