import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'badgerer-change-detection-template',
  templateUrl: './change-detection-template.component.html',
  styleUrls: ['./change-detection-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionTemplateComponent {

  public constructor() { }

}
