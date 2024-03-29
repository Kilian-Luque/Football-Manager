import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeagueDetailsEditPage } from './league-details-edit.page';

const routes: Routes = [
  {
    path: '',
    component: LeagueDetailsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueDetailsEditPageRoutingModule {}
