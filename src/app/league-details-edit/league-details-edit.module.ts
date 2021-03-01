import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeagueDetailsEditPageRoutingModule } from './league-details-edit-routing.module';

import { LeagueDetailsEditPage } from './league-details-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeagueDetailsEditPageRoutingModule
  ],
  declarations: [LeagueDetailsEditPage]
})
export class LeagueDetailsEditPageModule {}
