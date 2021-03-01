import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerDetailsPage } from './player-details.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerDetailsPage
  },
  {
    path: 'edit',
    loadChildren: () => import('../player-details-edit/player-details-edit.module').then( m => m.PlayerDetailsEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerDetailsPageRoutingModule {}
