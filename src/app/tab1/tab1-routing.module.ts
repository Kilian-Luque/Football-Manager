import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Tab1Page,
  },
  {
    path: 'player/:id',
    loadChildren: () => import('./../player-details/player-details.module').then( m => m.PlayerDetailsPageModule)
  },
  {
    path: 'team/:id',
    loadChildren: () => import('./../team-details/team-details.module').then( m => m.TeamDetailsPageModule)
  },
  {
    path: 'league/:id',
    loadChildren: () => import('./../league-details/league-details.module').then( m => m.LeagueDetailsPageModule)
  },
  {
    path: 'addPlayer',
    loadChildren: () => import('./../player-details-create/player-details-create.module').then( m => m.PlayerDetailsCreatePageModule)
  },
  {
    path: 'addTeam',
    loadChildren: () => import('./../team-details-create/team-details-create.module').then( m => m.TeamDetailsCreatePageModule)
  },
  {
    path: 'addLeague',
    loadChildren: () => import('./../league-details-create/league-details-create.module').then( m => m.LeagueDetailsCreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
