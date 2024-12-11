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

@NgModule({
  declarations: [BeerRankingComponent],
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
    SkeletonModule
],
})
export class PagesModule {}
