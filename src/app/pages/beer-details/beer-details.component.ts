import { Component } from '@angular/core';
import { BeerCompleteInfo } from '../../interface/ibeerCompleteInfo';
import { BeerService } from '../service/beer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrl: './beer-details.component.scss'
})
export class BeerDetailsComponent {
  beer! : BeerCompleteInfo;
  chartData: any;
  chartOptions: any;

  constructor(private beerService: BeerService, private activeRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.activeRoute.params.subscribe(params => this.loadBeerInfo(+params['id']));
    
    this.chartData = {
      labels: ['1★', '2★', '3★', '4★','5★'],
      datasets: [
          {
              label: '',
              data: [0, 0, 0, 1, 0],
              backgroundColor: ['#678'],
              borderColor: [],
              borderWidth: 0
          }
      ]
  };

  this.chartOptions = {
      plugins: {
          legend: {
             display: false
          }
      },
      scales: {
          y: {
            display: false
          },
          x: {
              ticks: {
                  color: "#9ab"
              },
              grid: {
                  color: "#2a323d",
                  drawBorder: false
              }
          }
      }
  };
  }

  loadBeerInfo(id: number){
    this.beerService.getBeerById(id).subscribe({
      next: (data: BeerCompleteInfo) => this.beer = data,
      error: (err: any) => console.log(err)
    })
  }
}
