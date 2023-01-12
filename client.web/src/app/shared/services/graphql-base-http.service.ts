import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlBaseHttpService {
  public constructor(private httpClient: HttpClient) { }

  public query<T>(query: string, variables?: Record<string, any>): Observable<T> {
    return this.httpClient.post<{ data: T }>(environment.graphQLUrl, {
      query: query,
      variables: variables
    }).pipe(
      map(r => r.data)
    );
  }
}
