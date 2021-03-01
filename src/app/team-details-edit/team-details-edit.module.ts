import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamDetailsEditPageRoutingModule } from './team-details-edit-routing.module';

import { TeamDetailsEditPage } from './team-details-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamDetailsEditPageRoutingModule
  ],
  declarations: [TeamDetailsEditPage]
})
export class TeamDetailsEditPageModule {}
