import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamDetailsCreatePage } from './team-details-create.page';

const routes: Routes = [
  {
    path: '',
    component: TeamDetailsCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamDetailsCreatePageRoutingModule {}
