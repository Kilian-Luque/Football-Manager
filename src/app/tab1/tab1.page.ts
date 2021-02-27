import { Component } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';

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

  allResults: Array<any>;

  playerSuscription: Subscription;
  teamSuscription: Subscription;
  leagueSuscription: Subscription;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) {}

  ionViewWillEnter(): void {
    this.showSegments = false;
    this.searchTerm = "";
    this.segmentModel = "all"; 

    this.playerSearchInit();
    this.teamSearchInit();
    this.leagueSearchInit();
    this.allSearchInit();
  }

  checkFocus(): void {
    this.showSegments = !this.showSegments;
  }

  search(searchString: string): void {
    this.allSearchInit();

    if (searchString.length === 0) {     
      this.searchTerm = "";
      this.playerSearchInit();
      this.teamSearchInit();
      this.leagueSearchInit();
    } else {
      this.searchTerm = searchString; 
      this.playerSearch();
      this.teamSearch();
      this.leagueSearch();
      this.allSearch();
    }
  }

  playerSearchInit() {
    this.playerObservable = EMPTY;
  }

  teamSearchInit() {
    this.teamObservable = EMPTY;
  }

  leagueSearchInit() {
    this.leagueObservable = EMPTY;
  }

  allSearchInit() {
    this.allResults = [];
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
    this.playerSuscription = this.playerObservable.subscribe(results => this.allResults = this.allResults.concat(results));
    this.teamSuscription = this.teamObservable.subscribe(results => this.allResults = this.allResults.concat(results));
    this.leagueSuscription = this.leagueObservable.subscribe(results => this.allResults = this.allResults.concat(results));
    
  }

  segmentChanged(segment: string): void {
    this.segmentModel = segment;
  }

  ionViewWillLeave(): void {
    if (this.playerSuscription) {
      this.playerSuscription.unsubscribe();
    }

    if (this.teamSuscription) {
      this.teamSuscription.unsubscribe();
    }

    if (this.leagueSuscription) {
      this.leagueSuscription.unsubscribe();
    }
  }
}
