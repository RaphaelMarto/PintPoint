import { Component } from '@angular/core';
import { RatingService } from '../service/rating.service';
import { OffsetRating } from '../../interface/iOffsetRating';
import { DataViewLazyLoadEvent } from 'primeng/dataview';
import { IRated } from '../../interface/iRated';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-rating-list',
  templateUrl: './users-rating-list.component.html',
  styleUrl: './users-rating-list.component.scss',
})
export class UsersRatingListComponent {
  sortField: string = 'rate';
  sortOrder: number = 0;
  nbLikes: number = 666;
  products: IRated[] = [];
  sortOptions: SelectItem[] = [];
  totalRecords: number = 0;
  offset: number = 0;
  order: string = 'DESC';
  idBeer: number = 0;
  target: number = 0;
  nickname: string = '';

  constructor(
    private ratingService: RatingService,
    private userService: UserService,
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
      this.target = +params['target'];
      +params['target'] == 0
        ? (this.idBeer = +params['id'])
        : (this.nickname = params['nickname']);
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

  getUserRating(
    type: string,
    nickname: string,
    order: string = 'ASC',
    offset: number = 0,
    limit: number = 20
  ): void {
    this.userService
      .getUserRatings(nickname, type, offset, limit, order)
      .subscribe({
        next: (data: OffsetRating) => {
          this.products = data.results;
          this.totalRecords = data.total;
        },
        error: (err: any) => console.log(err),
      });
  }

  next(event: DataViewLazyLoadEvent) {
    this.offset = event.first;
    if (this.target == 0)
      this.getRatingList(this.sortField, this.idBeer, this.order, event.first);
    else
      this.getUserRating(
        this.sortField,
        this.nickname,
        this.order,
        event.first
      );
  }

  onSortChange(event: any): void {
    this.order = event.value;
    if (this.target == 0)
      this.getRatingList(this.sortField, this.idBeer, this.order, this.offset);
    else
      this.getUserRating(
        this.sortField,
        this.nickname,
        this.order,
        this.offset
      );
  }

  onClickSort(name: string): void {
    this.sortField = name;
    if (this.target == 0)
    this.router.navigate([
      'Pages/RatingList',
      this.idBeer,
      this.target,
      this.sortField,
    ]);
    else
    this.router.navigate([
      'Pages/RatingList/User',
      this.nickname,
      this.target,
      this.sortField,
    ]);
  }
}
