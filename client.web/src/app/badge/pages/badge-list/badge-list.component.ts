import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

import { IBadge } from '@badgerer/badge/models';
import { BadgeHttpService } from '@badgerer/badge/services';
import { withLoading } from 'app/shared/operators/withLoading';
import { ILoadable } from 'app/shared/operators/ILoadable';

@Component({
  selector: 'badgerer-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent {
  @ViewChild('confirmDialogTemplate') public confirmDialogTemplate: TemplateRef<any>;

  public badges$: Observable<ILoadable<IBadge[]>>;
  public badgesTotal$: Observable<ILoadable<number>>;

  public name: string = null;

  public constructor(
    private readonly badgeHttpService: BadgeHttpService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.onRefresh();
  }

  public onRefresh(name: string = null): void {
    this.name = name;
    this.badges$ = this.badgeHttpService.getList(name).pipe(
      withLoading()
    );

    this.badgesTotal$ = this.badgeHttpService.getTotal().pipe(
      withLoading()
    );
  }

  public onDeleteBadge(id: number): void {
    const dialogRef = this.dialog.open(this.confirmDialogTemplate, {
      data: {
        title: 'Delete badge?',
        message: 'Are you sure you want to delete this badge?'
      }
    });
    dialogRef.afterClosed().pipe(
      filter(r => !!r),
      switchMap(r => this.badgeHttpService.delete(id))
    ).subscribe(
      result => {
        this.onRefresh();
      },
      error => {
        this.snackBar.open(`Failed to delete the badge! ${error ? error.message : ''}`);
      }
    );
  }

  public onFilter() {
    this.onRefresh(this.name);
  }
}
