import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamListComponent } from './containers/team-list/team-list.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { MaterialModule } from 'app/material.module';


@NgModule({
  declarations: [TeamComponent, TeamListComponent, TeamTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TeamRoutingModule,
  ]
})
export class TeamModule { }
