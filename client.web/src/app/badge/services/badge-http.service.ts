import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBadge } from '../models/IBadge';

@Injectable({
  providedIn: 'root'
})
export class BadgeHttpService {
  public constructor(private httpClient: HttpClient) { }

  public get(badgeId: number): Observable<IBadge> {
    return this.httpClient.get<IBadge>(`https://localhost:5001/Badges/${badgeId}`);
  }

  public getList(): Observable<IBadge[]> {
    return this.httpClient.get<IBadge[]>('https://localhost:5001/Badges');
  }

  public create(badge: IBadge): Observable<IBadge> {
    return this.httpClient.post<IBadge>('https://localhost:5001/Badges', badge);
  }

  public update(badge: IBadge) {
    return this.httpClient.put<IBadge>(`https://localhost:5001/Badges/${badge.badgeId}`, badge);
  }

  public delete(badgeId: number): Observable<any> {
    return this.httpClient.delete(`https://localhost:5001/Badges/${badgeId}`);
  }
}