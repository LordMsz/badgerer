import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

import { BadgeHttpService } from '../../services';
import { IBadge } from '../../models/IBadge';

@Component({
  selector: 'badgerer-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent {
  @ViewChild('confirmDialogTemplate') public confirmDialogTemplate: TemplateRef<any>;

  public badges$: Observable<IBadge[]>;

  public constructor(
    private readonly badgeHttpService: BadgeHttpService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.badges$ = badgeHttpService.getList();
  }

  public onRefresh(): void {
    this.badges$ = this.badgeHttpService.getList();
  }

  public onDeleteBadge(badgeId: number): void {
    const dialogRef = this.dialog.open(this.confirmDialogTemplate, {
      data: {
        title: 'Delete badge?',
        message: 'Are you sure you want to delete this badge?'
      }
    });
    dialogRef.afterClosed().pipe(
      filter(r => !!r),
      switchMap(r => this.badgeHttpService.delete(badgeId))
    ).subscribe(
      result => {
        this.onRefresh();
      },
      error => {
        this.snackBar.open(`Failed to delete the badge! ${error ? error.message : ''}`);
      }
    );
  }
}
