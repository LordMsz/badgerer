import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BadgeHttpService } from '../../services';
import { IBadge } from '../../models/IBadge';

@Component({
  selector: 'badgerer-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent {

  public badges$: Observable<IBadge[]>;

  public constructor(private readonly badgeHttpService: BadgeHttpService) {
    this.badges$ = badgeHttpService.getList();
  }

  public onRefresh(): void {
    this.badges$ = this.badgeHttpService.getList();
  }
}
