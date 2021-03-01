import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player/player.service';
import { Team } from '../../interfaces/team';
import { TeamService } from '../../services/team/team.service';
import { League } from '../../interfaces/league';
import { LeagueService } from '../../services/league/league.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  playerObservable: Observable<Player[]>;
  teamObservable: Observable<Team[]>;
  leagueObservable: Observable<League[]>;
  allObservable: Observable<Array<Player | Team | League>>;

  searchTerm: string;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  searchInit() {
    this.searchTerm = "";
    this.playerObservable = undefined;
    this.teamObservable = undefined;
    this.leagueObservable = undefined;
    this.allObservable = undefined;
  }

  search(searchString?: string): void {
    if (searchString !== undefined) {
      this.searchTerm = searchString;
    }

    if (this.searchTerm.length > 0) {     
      this.playerSearch();
      this.teamSearch();
      this.leagueSearch();
      this.allSearch();
    } else {
      this.searchInit();
    }
  }

  playerSearch() {
    this.playerObservable = this.playerService.getPlayers(this.searchTerm);
  }

  teamSearch() {
    this.teamObservable = this.teamService.getTeams(this.searchTerm);
  }

  leagueSearch() {
    this.leagueObservable = this.leagueService.getLeagues(this.searchTerm);
  }

  allSearch() {
    this.allObservable = zip(this.playerObservable, this.teamObservable, this.leagueObservable).pipe(
      map(results => {
        results[0].map(result => result["tipo"] = 'player');
        results[1].map(result => result["tipo"] = 'team');
        results[2].map(result => result["tipo"] = 'league');
        return [].concat(results[0], results[1], results[2]);
      })
    )
  }
}
