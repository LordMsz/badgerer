import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { IBadge } from '../models/IBadge';

@Injectable({
  providedIn: 'root'
})
export class BadgeHttpService {
  public constructor(private httpClient: HttpClient) { }

  public get(badgeId: number): Observable<IBadge> {
    return this.httpClient.get<IBadge>(`${environment.apiUrl}/Badges/${badgeId}`);
  }

  public getList(): Observable<IBadge[]> {
    return this.httpClient.get<IBadge[]>(`${environment.apiUrl}/Badges`);
  }

  public create(badge: IBadge): Observable<IBadge> {
    return this.httpClient.post<IBadge>(`${environment.apiUrl}/Badges`, { name: badge.name, description: badge.description });
  }

  public update(badge: IBadge) {
    return this.httpClient.put<IBadge>(`${environment.apiUrl}/Badges/${badge.badgeId}`, badge);
  }

  public delete(badgeId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/Badges/${badgeId}`);
  }
}
