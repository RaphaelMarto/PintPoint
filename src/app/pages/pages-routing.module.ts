import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerRankingComponent } from './beer-ranking/beer-ranking.component';
import { AddBeerComponent } from './beer-ranking/components/add-beer/add-beer.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

const routes: Routes = [
  {
    path: 'BeerRanking',
    component: BeerRankingComponent,
  },
  {
    path: 'Beer/Add',
    component: AddBeerComponent,
  },
  {
    path: 'Beer/Details/:id',
    component: BeerDetailsComponent,
  },
  {
    path: 'Auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
