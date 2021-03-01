import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';

import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';
import { LeagueService } from 'src/app/services/league/league.service';
import { SearchService } from 'src/app/services/search/search.service';

import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { League } from 'src/app/interfaces/league';

@Component({
  selector: 'app-details-page-popover',
  templateUrl: './details-page-popover.component.html',
  styleUrls: ['./details-page-popover.component.scss'],
})
export class DetailsPagePopoverComponent implements OnInit {
  item: Player | Team | League;
  itemType: string;

  deleteSuscriptor: Subscription;

  constructor(
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
    private navCtrl: NavController,
    private playerService: PlayerService,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.item = this.navParams.get('item');
    this.itemType = this.navParams.get('itemType');
  }

  editItem(): void {
    this.closePopover();

    if (this.itemType === "player") {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          playerDetails: JSON.stringify(this.item)
        }
      }
      this.navCtrl.navigateForward(['/tabs/tab1/player/' + this.item.id + '/edit'], navigationExtras);
    } else if (this.itemType === "team") {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          teamDetails: JSON.stringify(this.item)
        }
      }
      this.navCtrl.navigateForward(['/tabs/tab1/team/' + this.item.id + '/edit'], navigationExtras);
    } else {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          leagueDetails: JSON.stringify(this.item)
        }
      }
      this.navCtrl.navigateForward(['/tabs/tab1/league/' + this.item.id + '/edit'], navigationExtras);
    }
  }

  deleteItem(): void {
    if (this.itemType === "player") {
      this.deleteSuscriptor = this.playerService.deletePlayer(this.item.id).subscribe();
    } else if (this.itemType === "team") {
      this.deleteSuscriptor = this.teamService.deleteTeam(this.item.id).subscribe();
    } else {
      this.deleteSuscriptor = this.leagueService.deleteLeague(this.item.id).subscribe();
    }

    this.refreshSearch();
    this.closePopover();
    this.navCtrl.back();
  }

  refreshSearch(): void {
    this.searchService.search();
  }

  closePopover(): void {
    this.popoverCtrl.dismiss();
  }

  ngOnDestroy(): void {
    if (this.deleteSuscriptor) this.deleteSuscriptor.unsubscribe();
  }
}
