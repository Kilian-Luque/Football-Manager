import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamDetailsPage } from './team-details.page';

const routes: Routes = [
  {
    path: '',
    component: TeamDetailsPage
  },
  {
    path: 'edit',
    loadChildren: () => import('../team-details-edit/team-details-edit.module').then( m => m.TeamDetailsEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamDetailsPageRoutingModule {}
