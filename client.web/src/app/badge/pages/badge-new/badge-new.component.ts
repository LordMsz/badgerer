import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IBadge } from '../../models/IBadge';
import { BadgeHttpService } from '../../services';

@Component({
  selector: 'badgerer-badge-new',
  templateUrl: './badge-new.component.html',
  styleUrls: ['./badge-new.component.scss']
})
export class BadgeNewComponent {

  public constructor(
    private readonly badgeHttpService: BadgeHttpService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) { }

  public onSave(badge: IBadge): void {
    this.badgeHttpService.create(badge).subscribe(
      r => {
        this.router.navigate(['badge', 'list']);
        this.snackBar.open(`Badge id ${r.badgeId} succesfully created`);
      },
      e => this.snackBar.open(`Failed to create a badge! ${e ? e.message : ''}`)
    );
  }
}
