import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-player-details-editor',
  templateUrl: './player-details-editor.component.html',
  styleUrls: ['./player-details-editor.component.scss'],
})
export class PlayerDetailsEditorComponent implements OnInit, OnDestroy {
  @Input() playerDetails: Player;
  @Output() playerDetailsEmitter = new EventEmitter<Player>();

  playerForm: FormGroup;
  teamsList: Team[];

  teamsSuscriptor: Subscription;
  playerUpdateSuscriptor: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    //private router: Router,
    private playerService: PlayerService,
    private teamService: TeamService
  ) {
  }

  ngOnInit() {
    if (this.playerDetails) {
      this.playerForm = this.formBuilder.group({
        "Nombre del Jugador": [this.playerDetails['Nombre del Jugador'], Validators.required],
        description: [this.playerDetails.descripcion],
        teamId: [this.playerDetails.teamId, Validators.required]
      });
    } else {
      this.playerForm = this.formBuilder.group({
        "Nombre del Jugador": ["", Validators.required],
        description: [""],
        teamId: ["", Validators.required]
      });
    }

    this.teamsSuscriptor = this.teamService.getTeams().subscribe(
      teams => {
        this.teamsList = teams;
      }
    );
  }

  getTeamPosition(): number {
    if (this.playerDetails) {
      return this.teamsList.map(
        team => team.id
      )
      .indexOf(this.playerDetails.teamId) + 1;
    } else {
      return null;
    }
  }

  changeTeam(e): void {
    let newTeamId = this.teamsList[e.target.value - 1].id;

    this.playerForm.controls['teamId'].setValue(newTeamId);
  }

  submit(): void {
    if (this.playerDetails) {
      this.playerUpdateSuscriptor = this.playerService.updatePlayer(this.playerDetails.id, this.playerForm.value).subscribe(
        newPlayerDetails => {
          this.playerDetails = newPlayerDetails;
          this.playerDetailsEmitter.emit(this.playerDetails);
          this.navCtrl.back();
          //this.router.navigateByUrl('/tabs/tab1/player/' + this.playerDetails.id, {skipLocationChange: true})
        }
      );
    } else {
      this.playerUpdateSuscriptor = this.playerService.createPlayer(this.playerForm.value).subscribe(
        newPlayerDetails => {
          this.playerDetails = newPlayerDetails;
          this.playerDetailsEmitter.emit(this.playerDetails);
          this.navCtrl.back();
          //this.router.navigateByUrl('/tabs/tab1/player/' + this.playerDetails.id, {skipLocationChange: true})
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.teamsSuscriptor) this.teamsSuscriptor.unsubscribe();
    if (this.playerUpdateSuscriptor) this.playerUpdateSuscriptor.unsubscribe();
  }
}
