import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/material.module';
import { ChangeDetectionRoutingModule } from './change-detection-routing.module';
import { ChangeDetectionComponent } from './change-detection.component';
import { DefaultSimpleComponent } from './pages/default-simple/default-simple.component';
import { OnPushSimpleComponent } from './pages/nested/onpush-simple.component';
import { CellComponent } from './components/cell/cell.component';
import { CellOnPushComponent } from './components/cell-on-push/cell-on-push.component';
import { ContentProjectedComponent } from './pages/content-projected/content-projected.component';
import { ChangeDetectionTemplateComponent } from './components/change-detection-template/change-detection-template.component';
import { IntervalOutsideAngularComponent } from './pages/interval-outside-angular/interval-outside-angular.component';


@NgModule({
  declarations: [
    ChangeDetectionComponent,
    DefaultSimpleComponent,
    CellComponent,
    OnPushSimpleComponent,
    CellOnPushComponent,
    ContentProjectedComponent,
    ChangeDetectionTemplateComponent,
    IntervalOutsideAngularComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ChangeDetectionRoutingModule
  ]
})
export class ChangeDetectionModule { }
