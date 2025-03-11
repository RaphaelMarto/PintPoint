import { Component, OnInit } from '@angular/core';
import { RatingService } from '../pages/service/rating.service';
import { Top3 } from '../interface/itop3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  top3: Top3[] = [];

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.ratingService.getTop3Beers().subscribe((top3) => this.top3 = top3);
  }
}
