import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerDetailsEditPageRoutingModule } from './player-details-edit-routing.module';

import { PlayerDetailsEditPage } from './player-details-edit.page';
import { PlayerDetailsEditorComponent } from '../components/player-details-editor/player-details-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlayerDetailsEditPageRoutingModule
  ],
  declarations: [PlayerDetailsEditPage, PlayerDetailsEditorComponent]
})
export class PlayerDetailsEditPageModule {}
