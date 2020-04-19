import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BadgeRoutingModule } from './badge-routing.module';
import { BadgeComponent } from './badge.component';
import { BadgeListComponent } from './pages/badge-list/badge-list.component';
import { BadgeTableComponent } from './components/badge-table/badge-table.component';
import { MaterialModule } from '../material.module';
import { BadgeEditorComponent } from './components/badge-editor/badge-editor.component';
import { BadgeNewComponent } from './pages/badge-new/badge-new.component';


@NgModule({
  declarations: [BadgeComponent, BadgeListComponent, BadgeTableComponent, BadgeEditorComponent, BadgeNewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MaterialModule,

    BadgeRoutingModule
  ]
})
export class BadgeModule { }
