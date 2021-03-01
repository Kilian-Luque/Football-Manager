import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamDetailsEditPage } from './team-details-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TeamDetailsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamDetailsEditPageRoutingModule {}
