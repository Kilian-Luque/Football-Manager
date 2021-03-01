import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeagueDetailsPage } from './league-details.page';

const routes: Routes = [
  {
    path: '',
    component: LeagueDetailsPage
  },
  {
    path: 'edit',
    loadChildren: () => import('../league-details-edit/league-details-edit.module').then( m => m.LeagueDetailsEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueDetailsPageRoutingModule {}
