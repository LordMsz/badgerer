import { Component, Input, AfterViewChecked, NgZone, ElementRef } from '@angular/core';

import { ICell } from '@badgerer/change-detection/models/Cell';

@Component({
  selector: 'badgerer-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements AfterViewChecked {

  @Input() public data: ICell;

  private lastValue: number;

  public constructor(
    private el: ElementRef,
    private zone: NgZone,
  ) {
  }

  public onClick() {
    if (this.data) {
      this.data.flipped = !this.data.flipped;
    }
  }

  public ngAfterViewChecked(): void {
    const elem = this.el.nativeElement.querySelectorAll('div')[0] as HTMLElement;
    if (!elem) { return; }

    const attr = elem.attributes.getNamedItem('data-value');
    const currentValue = attr ? Number(attr.value) : NaN;
    if (this.lastValue !== currentValue) {
      this.lastValue = currentValue;
      this.zone.runOutsideAngular(() => {
        // Trigger a highlight for visualization
        const highlightCSS = 'changed';
        elem.classList.add(highlightCSS);

        setTimeout(() => {
          elem.classList.remove(highlightCSS);
        }, 500);
      });
    }
  }

}
