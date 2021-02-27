import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from '../../interfaces/player'

import { environment } from './../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayers(search?: string): Observable<Player[]> {
    if (search === undefined) {
      return this.http.get<Player[]>(`${environment.playersUrl}`);
    } else {
      return this.http.get<Player[]>(`${environment.playersUrl}`).pipe(
        map(results => {
          return results.filter(player => {
            return player["Nombre del Jugador"].toLocaleLowerCase().startsWith(search.toLocaleLowerCase());
          });
        })
      )
    }
  }

  getPlayersByString() {}
}
