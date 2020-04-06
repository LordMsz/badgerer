import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeRoutingModule } from './badge-routing.module';
import { BadgeComponent } from './badge.component';
import { BadgeListComponent } from './pages/badge-list/badge-list.component';
import { BadgeTableComponent } from './components/badge-table/badge-table.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [BadgeComponent, BadgeListComponent, BadgeTableComponent],
  imports: [
    CommonModule,
    MaterialModule,

    BadgeRoutingModule
  ]
})
export class BadgeModule { }
