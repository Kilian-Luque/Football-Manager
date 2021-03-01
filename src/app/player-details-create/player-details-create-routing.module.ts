import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerDetailsCreatePage } from './player-details-create.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerDetailsCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerDetailsCreatePageRoutingModule {}
