import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITeam } from '../models/ITeam';

@Injectable({
  providedIn: 'root'
})
export class TeamHttpService {
  public constructor(private httpClient: HttpClient) { }

  public getList(): Observable<ITeam[]> {
    return this.httpClient.get<ITeam[]>('https://localhost:5001/api/Teams');
  }
}
