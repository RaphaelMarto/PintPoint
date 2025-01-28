import { Component, HostListener } from '@angular/core';
import { fRateForm } from '../../../../models/fRateFrom';
import { RatingService } from '../../../service/rating.service';
import { BeerService } from '../../../service/beer.service';
import { OffsetResultBeer } from '../../../../interface/iOffsetResultBeer';
import { Beer } from '../../../../interface/ibeer';
import { PostRate } from '../../../../interface/iPostRate';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrl: './add-rating.component.scss',
})
export class AddRatingComponent {
  rateForm = fRateForm();
  showRate: boolean = true;
  submit: boolean = false;
  searched: boolean = false;
  searchData: Beer[] = [];
  typingTimeout: any;
  toSearch: string = '';
  beerSelected!: Beer;
  alreadyRated: boolean = false;

  constructor(
    private ratingService: RatingService,
    private beerService: BeerService
  ) {}

  onSubmit(): void {
    this.submit = true; // add like a beer
    if (this.rateForm.invalid) return;
    this.ratingService
      .postRate(this.rateForm.value as PostRate, this.beerSelected.id)
      .subscribe({
        next: (data: boolean) => {
          this.ratingService.emitIsShowned();
        },
        error: (err: any) => console.log(err),
      });
  }

  onSubmitUpdate() {
    this.submit = true; // add like a beer
    if (this.rateForm.invalid) return;
    this.ratingService
      .putRate(this.rateForm.value as PostRate, this.beerSelected.id)
      .subscribe({
        next: (data: boolean) => {
          this.ratingService.emitIsShowned();
        },
        error: (err: any) => console.log(err),
      });
  }

  hideModal(): void {
    this.ratingService.emitIsShowned();
  }

  @HostListener('keyup')
  onKeyUp() {
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.searchBeers();
    }, 500);
  }

  searchBeers() {
    this.beerService.getBeers('name', 'ASC', 0, this.toSearch).subscribe({
      next: (data: OffsetResultBeer) => {
        this.searchData = data.results;
      },
      error: (err: any) => console.log(err),
    });
  }

  selectResult(beer: Beer) {
    this.searched = true;
    this.beerSelected = beer;
    this.ratingService.getOneRating(beer.id).subscribe({
      next: (data: PostRate) => {
        if (data) {
          this.alreadyRated = true;
          this.rateForm.controls.Comment.patchValue(data.comment),
            this.rateForm.controls.Rate.patchValue(data.rate);
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  goBack() {
    this.searched = false;
    this.alreadyRated = false;
    this.searchData = [];
    this.toSearch = '';
  }
}
