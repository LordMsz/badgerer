import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { IBadge } from '../models/IBadge';
import { GraphqlBaseHttpService } from 'app/shared/services';
import { IOffsetPaging } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class BadgeHttpService {

  public constructor(private httpClient: HttpClient, private graphql: GraphqlBaseHttpService) { }

  public get(id: number): Observable<IBadge> {
    return this.httpClient.get<IBadge>(`${environment.apiUrl}/Badges/${id}`);
  }

  public getList(skip: number = 0, take: number = 50): Observable<IBadge[]> {
    const listProjection = '{ id name description }'
    const listQuery = `query badges($skip: Int!, $take: Int!) { badges(skip: $skip, take: $take) { items ${listProjection} hasPreviousPage hasNextPage totalItems } }`;
    const variables = { skip: skip, take: take };
    return this.graphql.query<{badges: IOffsetPaging<IBadge>}>(listQuery, variables).pipe(
      map(d => d.badges.items)
    );
  }

  public create(badge: IBadge): Observable<IBadge> {
    return this.httpClient.post<IBadge>(`${environment.apiUrl}/Badges`, { name: badge.name, description: badge.description });
  }

  public update(badge: IBadge) {
    return this.httpClient.put<IBadge>(`${environment.apiUrl}/Badges/${badge.id}`, badge);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/Badges/${id}`);
  }

  public getTotal(): Observable<number> {
    return this.graphql.query<{badges: {totalItems: number}}>(`{ badges { totalItems } }`).pipe(
      map(d => d.badges.totalItems)
    );
  }
}
