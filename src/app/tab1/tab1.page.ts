import { Component } from '@angular/core';
import { EMPTY, Observable, Subscription, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player/player.service';
import { Team } from '../interfaces/team';
import { TeamService } from '../services/team/team.service';
import { League } from '../interfaces/league';
import { LeagueService } from '../services/league/league.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  showSegments: boolean;
  searchTerm: string;
  segmentModel: string;

  playerObservable: Observable<Player[]>;
  teamObservable: Observable<Team[]>;
  leagueObservable: Observable<League[]>;
  allObservable: Observable<Array<Player | Team | League>>;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) {}

  ngOnInit(): void {
    this.showSegments = false;
    this.searchTerm = "";
    this.segmentModel = "all";

    this.playerSearchInit();
    this.teamSearchInit();
    this.leagueSearchInit();
    this.allSearchInit();
  }

  // Not used by now
  checkFocus(): void {
    this.showSegments = !this.showSegments;
  }

  search(searchString: string): void {
    this.searchTerm = searchString;

    if (searchString.length > 0) {     
      this.playerSearch();
      this.teamSearch();
      this.leagueSearch();
      this.allSearch();
    } else {
      this.playerSearchInit();
      this.teamSearchInit();
      this.leagueSearchInit();
      this.allSearchInit();
    }
  }

  playerSearchInit() {
    this.playerObservable = undefined;
  }

  teamSearchInit() {
    this.teamObservable = undefined;
  }

  leagueSearchInit() {
    this.leagueObservable = undefined;
  }

  allSearchInit() {
    this.allObservable = undefined;
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

  segmentChanged(segment: string): void {
    this.segmentModel = segment;
  }
}
