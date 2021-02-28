import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit, OnDestroy {
  playerDetails: Player;
  teamDetails: Team;
  leagueDetails: League;

  playerDetailsSuscriptor: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.playerDetailsSuscriptor = this.playerService.getPlayerById(id).pipe(
      mergeMap(
        playerResults => {
          this.playerDetails = playerResults;
          return this.teamService.getTeamById(playerResults["teamId"]);
        }
      ),
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
  }

  ngOnDestroy() {
    if (this.playerDetailsSuscriptor) this.playerDetailsSuscriptor.unsubscribe();
  }
}
