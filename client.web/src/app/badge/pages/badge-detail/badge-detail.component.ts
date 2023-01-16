import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IBadge, IBadgePlaceholder } from '@badgerer/badge/models';
import { BadgeHttpService } from '@badgerer/badge/services';

@Component({
  selector: 'badgerer-badge-detail',
  templateUrl: './badge-detail.component.html',
  styleUrls: ['./badge-detail.component.scss']
})
export class BadgeDetailComponent {

  public badge$: Observable<IBadge>;
  public badgePlaceholder$: Observable<IBadgePlaceholder>;

  public constructor(
    route: ActivatedRoute,
    badgeHttpService: BadgeHttpService,
  ) {
    this.badgePlaceholder$ = route.params.pipe(
      map(p => ({ id: p.id, name: p.badgeUrlName }))
    );

    this.badge$ = this.badgePlaceholder$.pipe(
      switchMap(rd => badgeHttpService.get(rd.id))
    );
  }

}
