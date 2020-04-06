import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IBadge } from '../models/IBadge';

@Injectable({
  providedIn: 'root'
})
export class BadgeHttpService {
  public constructor(private httpClient: HttpClient) { }

  public getList(): Observable<IBadge[]> {
    return this.httpClient.get<IBadge[]>('https://localhost:5001/Badges');
  }
}
