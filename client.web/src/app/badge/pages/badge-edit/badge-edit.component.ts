import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IBadge, IBadgePlaceholder } from '@badgerer/badge/models';
import { BadgeHttpService } from '@badgerer/badge/services';

@Component({
  selector: 'badgerer-badge-edit',
  templateUrl: './badge-edit.component.html',
  styleUrls: ['./badge-edit.component.scss']
})
export class BadgeEditComponent {

  public badge$: Observable<IBadge>;
  public badgePlaceholder$: Observable<IBadgePlaceholder>;

  public constructor(
    route: ActivatedRoute,
    private readonly badgeHttpService: BadgeHttpService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.badgePlaceholder$ = route.params.pipe(
      map(p => ({ badgeId: p.id, name: p.badgeUrlName }))
    );

    this.badge$ = this.badgePlaceholder$.pipe(
      switchMap(rd => badgeHttpService.get(rd.badgeId))
    );
  }

  public onSave(badge: IBadge): void {
    this.badgeHttpService.update(badge).subscribe(
      r => {
        this.router.navigate(['badge', 'list']);
        this.snackBar.open(`Badge id ${r.badgeId} succesfully created`);
      },
      e => this.snackBar.open(`Failed to create a badge! ${e ? e.message : ''}`)
    );
  }

  public onCancel(): void {
    this.router.navigate(['badge', 'list']);
  }
}
