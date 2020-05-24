import { Component, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';

import { ICell } from '@badgerer/change-detection/models/Cell';
import { CellGeneratorService } from '@badgerer/change-detection/services/cell-generator.service';

@Component({
  selector: 'badgerer-interval-outside-angular',
  templateUrl: './interval-outside-angular.component.html',
  styleUrls: ['./interval-outside-angular.component.scss']
})
export class IntervalOutsideAngularComponent implements OnDestroy {
  public cells: ICell[] = [];
  public intervalTick = 0;
  public intervalTimeout = 100;

  public interval: number = null;

  public constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,

    cellGeneratorService: CellGeneratorService,
  ) {
    changeDetectorRef.detach();

    this.cells = cellGeneratorService.generate(10);

    this.startIntervalOutsideAngular();
  }

  public ngOnDestroy(): void {
    this.stopInterval();
  }

  public toggleInterval(): void {
    if (!this.interval) {
      this.startIntervalOutsideAngular();
    } else {
      this.stopInterval();
    }
  }

  public toggleIntervalInAngularZone(): void {
    if (!this.interval) {
      this.startIntervalInsideAngular();
    } else {
      this.stopInterval();
    }
  }

  private startIntervalOutsideAngular(): void {
    this.zone.runOutsideAngular(() => {
      this.interval = window.setInterval(() => {
        this.intervalTick++;
        this.changeDetectorRef.detectChanges();
      }, this.intervalTimeout);
    });
  }

  private startIntervalInsideAngular(): void {
    this.interval = window.setInterval(() => {
      this.intervalTick++;
      this.changeDetectorRef.detectChanges();
    }, this.intervalTimeout);
  }

  private stopInterval(): void {
    window.clearInterval(this.interval);
    this.interval = null;
    this.changeDetectorRef.detectChanges();
  }
}
