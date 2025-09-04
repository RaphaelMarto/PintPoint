import { isMeGuard } from './../guard/is-me.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerRankingComponent } from './beer-ranking/beer-ranking.component';
import { AddBeerComponent } from './beer-ranking/components/add-beer/add-beer.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { UsersRatingListComponent } from './users-rating-list/users-rating-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ParameterComponent } from './parameter/parameter.component';
import { PasswordResetComponent } from './parameter/components/security/components/password-reset/password-reset.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PutBeerComponent } from './beer-details/components/put-beer/put-beer.component';

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
    path: 'Beer/Put/:id',
    component: PutBeerComponent,
  },
  {
    path: 'Beer/Details/:id',
    component: BeerDetailsComponent,
  },
  {
    path: 'Auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Profil/PasswordReset',
    component: PasswordResetComponent,
  },
  {
    path: 'Profil/:nickname',
    component: MyProfileComponent,
  },
  {
    path: 'Profil/Parameters/:nickname',
    component: ParameterComponent,
    canActivate: [isMeGuard],
  },
  {
    path: 'RatingList/:id/:target/:type',
    component: UsersRatingListComponent,
  },
  {
    path: 'RatingList/User/:nickname/:target/:type',
    component: UsersRatingListComponent,
  },
  {
    path: 'TermsAndConditions',
    component: TermsAndConditionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
