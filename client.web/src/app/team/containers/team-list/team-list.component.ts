import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TeamHttpService } from 'app/team/services/team-http.service';
import { ITeam } from 'app/team/models/ITeam';

@Component({
  selector: 'badgerer-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {
  public loading: boolean;
  public teams$: Observable<ITeam[]>;

  public constructor(
    private readonly teamHttpService: TeamHttpService
  ) {
    this.onRefresh();
  }

  public onRefresh(): void {
    this.loading = true;
    this.teams$ = this.teamHttpService.getList().pipe(
      finalize(() => this.loading = false)
    );
  }

}
