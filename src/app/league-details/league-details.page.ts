import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Team } from '../interfaces/team';
import { League } from '../interfaces/league';
import { TeamService } from '../services/team/team.service';
import { LeagueService } from '../services/league/league.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.page.html',
  styleUrls: ['./league-details.page.scss'],
})
export class LeagueDetailsPage implements OnInit, OnDestroy {
  leagueDetails: League;
  teamsList: Team[];

  leagueDetailsSuscriptor: Subscription;
  teamsListSuscriptor: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.leagueDetailsSuscriptor = this.leagueService.getLeagueById(id)
    .subscribe(
      leagueResults => {
        this.leagueDetails = leagueResults;
      }
    );

    this.teamsListSuscriptor = this.teamService.getTeamsByLeagueId(id)
    .subscribe(
      teamsResults => {
        this.teamsList = teamsResults;
      }
    )
  }

  ngOnDestroy() {
    if (this.leagueDetailsSuscriptor) this.leagueDetailsSuscriptor.unsubscribe();
    if (this.teamsListSuscriptor) this.teamsListSuscriptor.unsubscribe();
  }

}
