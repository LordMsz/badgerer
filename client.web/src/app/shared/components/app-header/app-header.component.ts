import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'badgerer-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  public isProd: boolean = environment.production;
}
