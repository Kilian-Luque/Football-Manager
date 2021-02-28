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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
