import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BeerRankingComponent } from './beer-ranking/beer-ranking.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ShareModule } from "../shared/shared.module";
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { AddBeerComponent } from './beer-ranking/components/add-beer/add-beer.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddBreweryComponent } from './beer-ranking/components/add-brewery/add-brewery.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { ChartModule } from 'primeng/chart';
import { UsersRatingComponent } from './beer-details/components/users-rating/users-rating.component';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { PipesModule } from '../pipes/pipes.module';
import { ErrorComponent } from './error/error.component';
import { UsersRatingListComponent } from './users-rating-list/users-rating-list.component';

@NgModule({
  declarations: [BeerRankingComponent, AddBeerComponent, AddBreweryComponent, BeerDetailsComponent, UsersRatingComponent, ErrorComponent, UsersRatingListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    DataViewModule,
    ButtonModule,
    SelectButtonModule,
    ShareModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SkeletonModule,
    DialogModule,
    InputNumberModule,
    InputTextareaModule,
    ChartModule,
    PanelModule,
    AvatarModule,
    PipesModule
],
})
export class PagesModule {}
