import { Component } from '@angular/core';
import { RatingService } from '../service/rating.service';
import { OffsetRating } from '../../interface/iOffsetRating';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { IRated } from '../../interface/iRated';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-rating-list',
  templateUrl: './users-rating-list.component.html',
  styleUrl: './users-rating-list.component.scss',
})
export class UsersRatingListComponent {
  sortField: string = 'rate'; // get from route rate like recent
  sortOrder: number = 0;
  nbLikes: number = 666;
  products: IRated[] = [];
  sortOptions: SelectItem[] = [];
  totalRecords: number = 0;
  offset: number = 0;
  order: string = 'DESC';
  idBeer: number = 0;

  constructor(
    private ratingService: RatingService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.sortOptions = [
      { label: 'Croissant', value: 'ASC' },
      { label: 'Décroissant', value: 'DESC' },
    ];
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.idBeer = +params['id'];
      this.sortField = params['type'];
    });
  }
  counterArray(n: number): any[] {
    return Array(n);
  }

  getRatingList(
    type: string,
    idBeer: number,
    order: string = 'ASC',
    offset: number = 0,
    limit: number = 20
  ): void {
    this.ratingService.getRating(type, idBeer, order, offset, limit).subscribe({
      next: (data: OffsetRating) => {
        this.products = data.results;
        this.totalRecords = data.total;
      },
      error: (err: any) => console.log(err),
    });
  }

  next(event: DataViewLazyLoadEvent) {
    this.offset = event.first;

    this.getRatingList(this.sortField, this.idBeer, this.order, event.first);
  }

  onSortChange(event: any): void {
    this.order = event.value;
    this.getRatingList(this.sortField, this.idBeer, this.order, this.offset);
  }

  onClickSort(name: string): void {
    this.sortField = name;
    this.router.navigate(['Pages/RatingList', this.idBeer, this.sortField]);
  }

  LikeDislike(id: number, index: number): void {
    this.ratingService
      .postLikeDislike(!this.products[index].liked, id)
      .subscribe({
        next: (data: boolean) => {
          this.getRatingList(
            this.sortField,
            this.idBeer,
            this.order,
            this.offset
          );
        },
        error: (err: any) => console.log(err),
      });
  }
}
