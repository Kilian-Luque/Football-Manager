import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerDetailsEditPage } from './player-details-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerDetailsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerDetailsEditPageRoutingModule {}
