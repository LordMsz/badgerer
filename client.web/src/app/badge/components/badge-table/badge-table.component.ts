import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { IBadge } from '../../models/IBadge';

@Component({
  selector: 'badgerer-badge-table',
  templateUrl: './badge-table.component.html',
  styleUrls: ['./badge-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeTableComponent {

  @Input() public badges: IBadge[];

  @Output() public deleteBadge = new EventEmitter<number>();

  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  public constructor() { }

}
