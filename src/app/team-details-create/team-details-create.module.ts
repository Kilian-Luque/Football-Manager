import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamDetailsCreatePageRoutingModule } from './team-details-create-routing.module';

import { TeamDetailsCreatePage } from './team-details-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamDetailsCreatePageRoutingModule
  ],
  declarations: [TeamDetailsCreatePage]
})
export class TeamDetailsCreatePageModule {}
