import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerRankingComponent } from './beer-ranking/beer-ranking.component';

const routes: Routes = [
  {
    path: 'BeerRanking',
    component: BeerRankingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
