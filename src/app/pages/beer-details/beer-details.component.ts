import { Component } from '@angular/core';
import { BeerCompleteInfo } from '../../interface/ibeerCompleteInfo';
import { BeerService } from '../service/beer.service';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../service/rating.service';
import { IRated } from '../../interface/iRated';
import { AverageBeer } from '../../interface/iAverageBeer';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrl: './beer-details.component.scss',
})
export class BeerDetailsComponent {
  beer!: BeerCompleteInfo;
  chartData: any;
  chartOptions: any;
  ratesPopular: IRated[] = [];
  ratesNewest: IRated[] = [];

  dataValue: number[] = [];

  constructor(
    private beerService: BeerService,
    private activeRoute: ActivatedRoute,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) =>
      this.loadBeerInfo(+params['id'])
    );
    this.loadRating();

    this.chartData = {
      labels: ['1★', '2★', '3★', '4★', '5★'],
      datasets: [
        {
          label: '',
          data: this.dataValue,
          backgroundColor: ['#678'],
          borderColor: [],
          borderWidth: 0,
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          ticks: {
            color: '#9ab',
          },
          grid: {
            color: '#2a323d',
            drawBorder: false,
          },
        },
      },
    };
  }

  loadBeerInfo(id: number) {
    this.beerService.getBeerById(id).subscribe({
      next: (data: BeerCompleteInfo) => (this.beer = data),
      error: (err: any) => console.log(err),
    });

    this.ratingService.getAverageRating(id).subscribe({
      next: (data: AverageBeer[]) => {
        for (let item of data) {
          this.dataValue.push(item.ratingCount);
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  loadRating() {
    this.ratingService.getRatingPopular().subscribe({
      next: (data: IRated[]) => (this.ratesPopular = data),
      error: (err: any) => console.log(err),
    });

    this.ratingService.getRatingNewest().subscribe({
      next: (data: IRated[]) => (this.ratesNewest = data),
      error: (err: any) => console.log(err),
    });
  }
}
