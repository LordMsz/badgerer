import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITeam } from 'app/team/models/ITeam';

@Component({
  selector: 'badgerer-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent {
  @Input() public teams: ITeam[];

  @Output() public deleteTeam = new EventEmitter<number>();

  public displayedColumns: string[] = ['teamId', 'name', 'description', 'actions'];

  public constructor() { }
}
