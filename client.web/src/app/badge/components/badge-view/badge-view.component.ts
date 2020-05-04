import { Component, Input } from '@angular/core';

import { IBadge, IBadgePlaceholder } from '@badgerer/badge/models';

@Component({
  selector: 'badgerer-badge-view',
  templateUrl: './badge-view.component.html',
  styleUrls: ['./badge-view.component.scss']
})
export class BadgeViewComponent {

  @Input() public readonly badge: IBadge;
  @Input() public readonly badgePlaceholder: IBadgePlaceholder;

  public constructor() { }

}
