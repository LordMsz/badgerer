import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IBadge } from '../../models/IBadge';

@Component({
  selector: 'badgerer-badge-table',
  templateUrl: './badge-table.component.html',
  styleUrls: ['./badge-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeTableComponent {

  @Input() public badges: IBadge[];

  public displayedColumns: string[] = ['badgeId', 'name', 'description'];

  public constructor() { }

}
