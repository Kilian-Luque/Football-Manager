import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Player } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { League } from '../interfaces/league';
import { PlayerService } from '../services/player/player.service';
import { TeamService } from '../services/team/team.service';
import { LeagueService } from '../services/league/league.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit, OnDestroy {
  teamDetails: Team;
  leagueDetails: League;
  playersList: Player[];

  teamDetailsSuscriptor: Subscription;
  playersListSuscriptor: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.teamDetailsSuscriptor = this.teamService.getTeamById(id).pipe(
      mergeMap(
        teamResults => {
          this.teamDetails = teamResults;
          return this.leagueService.getLeagueById(teamResults["Liga"]);
        }
      )
    )
    .subscribe(
      leagueResults => {
        this.leagueDetails = leagueResults;
      }
    );

    this.playersListSuscriptor = this.playerService.getPlayersByTeamId(id)
    .subscribe(
      playersResults => {
        this.playersList = playersResults;
      }
    )
  }

  ngOnDestroy() {
    if (this.teamDetailsSuscriptor) this.teamDetailsSuscriptor.unsubscribe();
    if (this.playersListSuscriptor) this.playersListSuscriptor.unsubscribe();
  }

}
