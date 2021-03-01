import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeagueDetailsCreatePageRoutingModule } from './league-details-create-routing.module';

import { LeagueDetailsCreatePage } from './league-details-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeagueDetailsCreatePageRoutingModule
  ],
  declarations: [LeagueDetailsCreatePage]
})
export class LeagueDetailsCreatePageModule {}
