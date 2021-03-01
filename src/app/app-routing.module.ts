import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'player-details-create',
    loadChildren: () => import('./player-details-create/player-details-create.module').then( m => m.PlayerDetailsCreatePageModule)
  },
  {
    path: 'team-details-create',
    loadChildren: () => import('./team-details-create/team-details-create.module').then( m => m.TeamDetailsCreatePageModule)
  },
  {
    path: 'league-details-create',
    loadChildren: () => import('./league-details-create/league-details-create.module').then( m => m.LeagueDetailsCreatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
