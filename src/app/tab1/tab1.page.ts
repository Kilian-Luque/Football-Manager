import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Player } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { League } from '../interfaces/league';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  showSegments: boolean;
  segmentModel: string;

  playerObservable: Observable<Player[]>;
  teamObservable: Observable<Team[]>;
  leagueObservable: Observable<League[]>;
  allObservable: Observable<Array<Player | Team | League>>;

  constructor(
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.showSegments = false;
    this.segmentModel = "all";

    this.searchService.searchInit();
  }

  // Not used by now
  checkFocus(): void {
    this.showSegments = !this.showSegments;
  }

  search(searchString: string): void {
    this.searchService.search(searchString);

    this.playerObservable = this.searchService.playerObservable;
    this.teamObservable = this.searchService.teamObservable;
    this.leagueObservable = this.searchService.leagueObservable;
    this.allObservable = this.searchService.allObservable;
  }

  getPlayerObservable() {
    return this.searchService.playerObservable;
  }

  getTeamObservable() {
    return this.searchService.teamObservable;
  }

  getLeagueObservable() {
    return this.searchService.leagueObservable;
  }

  getAllObservable() {
    return this.searchService.allObservable;
  }

  segmentChanged(segment: string): void {
    this.segmentModel = segment;
  }
}
