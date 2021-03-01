import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerDetailsCreatePageRoutingModule } from './player-details-create-routing.module';

import { PlayerDetailsCreatePage } from './player-details-create.page';
import { PlayerDetailsEditorComponent } from '../components/player-details-editor/player-details-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlayerDetailsCreatePageRoutingModule
  ],
  declarations: [PlayerDetailsCreatePage, PlayerDetailsEditorComponent]
})
export class PlayerDetailsCreatePageModule {}
