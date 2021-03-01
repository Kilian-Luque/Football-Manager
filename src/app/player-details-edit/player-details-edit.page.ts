import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Player } from '../interfaces/player';

@Component({
  selector: 'app-player-details-edit',
  templateUrl: './player-details-edit.page.html',
  styleUrls: ['./player-details-edit.page.scss'],
})
export class PlayerDetailsEditPage implements OnInit, OnDestroy {
  playerDetails: Player;

  routeSuscriptor: Subscription;
  playerSuscriptor: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSuscriptor = this.route.queryParams.subscribe(params => {
      this.playerDetails = JSON.parse(params["playerDetails"]);
    });
  }

  ngOnDestroy() {
    if (this.routeSuscriptor) this.routeSuscriptor.unsubscribe();
    if (this.playerSuscriptor) this.playerSuscriptor.unsubscribe();
  }
}
