import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { League } from '../../interfaces/league';

import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  getLeagues(searchTerm?: string): Observable<League[]> {
    if (searchTerm === undefined) {
      return this.http.get<League[]>(`${environment.leaguesUrl}`)
    } else {
      return this.http.get<League[]>(`${environment.leaguesUrl}`).pipe(
        map(results => {
          return results.filter(league => {
            return league["Nombre De La Liga"].toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase());
          });
        })
      )
    }
  }

  getLeagueById(id: string): Observable<League> {
    return this.http.get<League>(`${environment.leaguesUrl}/${id}`);
  }

  deleteLeague(id: string): Observable<League> {
    return this.http.delete<League>(`${environment.leaguesUrl}/${id}`);
  }
}
