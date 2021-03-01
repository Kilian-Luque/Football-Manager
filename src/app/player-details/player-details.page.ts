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
import { PopoverController } from '@ionic/angular';
import { DetailsPagePopoverComponent } from '../components/details-page-popover/details-page-popover.component';

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
    private popoverCtrl: PopoverController,
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
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

  async showPopover(event: Event): Promise<void> {
    let popover = await this.popoverCtrl.create({
      event,
      component: DetailsPagePopoverComponent,
      componentProps: {
        item: this.playerDetails,
        itemType: "player"
      }
    })
    return await popover.present();
  }

  ngOnDestroy(): void {
    if (this.playerDetailsSuscriptor) this.playerDetailsSuscriptor.unsubscribe();
  }
}
