import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from '../../interfaces/team'

import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(searchTerm?: string): Observable<Team[]> {
    if (searchTerm === undefined) {
      return this.http.get<Team[]>(`${environment.teamsUrl}`);
    } else {
      return this.http.get<Team[]>(`${environment.teamsUrl}`).pipe(
        map(results => {
          return results.filter(team => {
            return team["Nombre del equipo"].toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase());
          });
        })
      )
    }
  }

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${environment.teamsUrl}/${id}`);
  }

  getTeamsByLeagueId(leagueId: string): Observable<Team[]> {
    return this.getTeams().pipe(
      map(results => {
        return results.filter(team => team["Liga"] === leagueId);
      })
    )
  }

  deleteTeam(id: string): Observable<Team> {
    return this.http.delete<Team>(`${environment.teamsUrl}/${id}`);
  }
}
