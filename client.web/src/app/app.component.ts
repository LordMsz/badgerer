import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IWeatherResponse {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'badgerer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public watherTest$: Observable<IWeatherResponse[]>;

  public constructor(private httpClient: HttpClient) {
    this.watherTest$ = httpClient.get<IWeatherResponse[]>('https://localhost:5001/WeatherForecast');

    //TODO: a demo with onpush on root and setInterval and other stuff?
    // window.setInterval(() => {
    //   this.watherTest$ = this.httpClient.get<IWeatherResponse[]>('https://localhost:5001/WeatherForecast');
    // }, 500);
  }

  public onReloadClick(): void {
    this.watherTest$ = this.httpClient.get<IWeatherResponse[]>('https://localhost:5001/WeatherForecast');
  }
}
