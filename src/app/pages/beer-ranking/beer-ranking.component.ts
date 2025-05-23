import { Component } from '@angular/core';
import { Beer } from '../../interface/ibeer';
import { BeerService } from '../service/beer.service';
import { SelectItem } from 'primeng/api';
import { DataViewLazyLoadEvent } from 'primeng/dataview';

import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OffsetResultBeer } from '../../interface/iOffsetResultBeer';
import { RatingService } from '../service/rating.service';

@Component({
  selector: 'app-beer-ranking',
  templateUrl: './beer-ranking.component.html',
  styleUrl: './beer-ranking.component.scss',
})
export class BeerRankingComponent {
  layout: 'list' | 'grid' = 'list';
  sortField: string = 'name';
  sortOrder: number = 0;
  sortOptions: SelectItem[] = [];
  totalRecords: number = 0;
  showRate: boolean = false;

  products: Beer[] = [];
  searchControl: FormControl = new FormControl();
  loading: boolean = true;

  type: string = 'name';
  order: string = 'ASC';
  offset: number = 0;

  constructor(private beerService: BeerService, private router: Router, private rateService: RatingService) {}

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Nom A à Z', value: 'name' },
      { label: 'Nom Z à A', value: '!name' },
      { label: 'Notes haut à bas', value: '!rating' },
      { label: 'Notes bas à haut', value: 'rating' },
      { label: 'Prix haut à bas', value: '!price' },
      { label: 'Prix bas à haut', value: 'price' },
      { label: 'Genre A à Z', value: 'beerTypeName' },
      { label: 'Genre Z à A', value: '!beerTypeName' },
    ];

    this.searchLink();
    this.rateService.isAddLogShownedSubject.subscribe({
      next: (data: boolean) => (this.showRate = data),
    });
  }

  loadBeer(
    type: string = 'name',
    order: string = 'ASC',
    search: string = '',
    offset: number = 0
  ): void {
    this.beerService.getBeers(type, order, offset, search).subscribe({
      next: (data: OffsetResultBeer) => {
        this.products = data.results;
        this.loading = false;
        if (search == '') this.totalRecords = data.total;
        else this.totalRecords = data.results.length;
      },
      error: (err: any) => console.log(err),
    });
  }

  onSortChange(event: any): void {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  next(event: DataViewLazyLoadEvent): void {
    this.loading = true;
    this.offset = event.first;

    this.type = event.sortField;
    this.order = event.sortOrder == 1 ? 'ASC' : 'DESC';

    this.loadBeer(event.sortField, this.order, '', event.first);
  }

  searchLink(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.filterData(value);
      });
  }

  filterData(search: string = ''): void {
    this.loadBeer(this.type, this.order, search);
  }

  CreateNew(): void {
    this.router.navigate(['Pages/Beer/Add']);
  }

  counterArray(n: number): any[] {
    return Array(n);
  }

  ShowAddLog() {
    this.rateService.emitIsShowned();
   }
}
