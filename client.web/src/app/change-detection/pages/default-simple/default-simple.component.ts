import { Component, OnDestroy, Input, OnInit } from '@angular/core';

import { Cell, ICell } from '@badgerer/change-detection/models/Cell';
import { CellGeneratorService } from '@badgerer/change-detection/services/cell-generator.service';

@Component({
  selector: 'badgerer-default-simple',
  templateUrl: './default-simple.component.html',
  styleUrls: ['./default-simple.component.scss']
})
export class DefaultSimpleComponent implements OnDestroy, OnInit {
  @Input() public readonly gridSize = 4000;

  public cells: ICell[] = [];
  public intervalTimeout = 5000;
  public intervalTick = 0;

  private interval: number = null;

  public constructor(private cellGeneratorService: CellGeneratorService) {
    this.interval = window.setInterval(() => {
      this.intervalTick++;
    }, this.intervalTimeout);
  }

  public ngOnInit(): void {
    this.cells = this.cellGeneratorService.generate(this.gridSize);
  }

  public ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }

}
