import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IWeatherResponse {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface IBadge {
  badgeId: number;
  name: string;
  description: string;
}

@Component({
  selector: 'badgerer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public watherTest$: Observable<IWeatherResponse[]>;
  public firstBadge$: Observable<IBadge>;

  public constructor(private httpClient: HttpClient) {
    this.watherTest$ = httpClient.get<IWeatherResponse[]>('https://localhost:5001/WeatherForecast');
    this.firstBadge$ = httpClient.get<IBadge>('https://localhost:5001/Badges');
  }

  public onReloadClick(): void {
    this.watherTest$ = this.httpClient.get<IWeatherResponse[]>('https://localhost:5001/WeatherForecast');
  }
}
