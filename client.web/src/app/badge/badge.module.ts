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
import { BadgeDetailComponent } from './pages/badge-detail/badge-detail.component';
import { BadgeViewComponent } from './components/badge-view/badge-view.component';
import { BadgeEditComponent } from './pages/badge-edit/badge-edit.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    BadgeComponent,
    BadgeListComponent,
    BadgeTableComponent,
    BadgeEditorComponent,
    BadgeNewComponent,
    BadgeDetailComponent,
    BadgeViewComponent,
    BadgeEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MaterialModule,

    SharedModule,
    BadgeRoutingModule
  ]
})
export class BadgeModule { }
