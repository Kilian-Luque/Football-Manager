import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeagueDetailsCreatePage } from './league-details-create.page';

const routes: Routes = [
  {
    path: '',
    component: LeagueDetailsCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueDetailsCreatePageRoutingModule {}
