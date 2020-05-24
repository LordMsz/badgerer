import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { ICell } from '@badgerer/change-detection/models/Cell';
import { CellGeneratorService } from '@badgerer/change-detection/services/cell-generator.service';

@Component({
  selector: 'badgerer-onpush-simple',
  templateUrl: './onpush-simple.component.html',
  styleUrls: ['./onpush-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushSimpleComponent implements OnDestroy {
  public cells: ICell[] = [];
  public intervalTick = 0;

  private interval: number = null;

  public constructor(cellGeneratorService: CellGeneratorService) {
    this.cells = cellGeneratorService.generate(2000);

    this.interval = window.setInterval(() => {
      this.intervalTick++;
    }, 1000);
  }

  public ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }

}
