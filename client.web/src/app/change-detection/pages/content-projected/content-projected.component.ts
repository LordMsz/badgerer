import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ICell } from '@badgerer/change-detection/models/Cell';
import { CellGeneratorService } from '@badgerer/change-detection/services/cell-generator.service';

@Component({
  selector: 'badgerer-content-projected',
  templateUrl: './content-projected.component.html',
  styleUrls: ['./content-projected.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ContentProjectedComponent implements OnDestroy {
  public cells: ICell[] = [];
  public intervalTick = 0;
  public intervalTimeout = 4000;

  public displayContent1 = true;
  public displayContent2 = true;
  public displayContent3 = true;

  public interval: number = null;

  public constructor(cellGeneratorService: CellGeneratorService) {
    this.cells = cellGeneratorService.generate(10);

    this.startInterval();
  }

  public ngOnDestroy(): void {
    this.stopInterval();
  }

  public toggleInterval(): void {
    if (!this.interval) {
      this.startInterval();
    } else {
      this.stopInterval();
    }
  }

  private startInterval(): void {
    this.interval = window.setInterval(() => {
      this.intervalTick++;
    }, this.intervalTimeout);
  }

  private stopInterval(): void {
    window.clearInterval(this.interval);
    this.interval = null;
  }
}
