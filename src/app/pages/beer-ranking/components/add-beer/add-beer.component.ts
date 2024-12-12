import { Component, Input, output } from '@angular/core';
import { fBeerAddForm } from '../../../../models/fBeerForm';
import { Router } from '@angular/router';
import { BeerService } from '../../service/beer.service';
import { IBeerType } from '../../../../interface/iBeerType';
import { IBrewery } from '../../../../interface/iBrewery';
import { IPostBeer } from '../../../../interface/iPostBeer';

@Component({
  selector: 'app-add-beer',
  templateUrl: './add-beer.component.html',
  styleUrl: './add-beer.component.scss',
})
export class AddBeerComponent {
  genres: IBeerType[] = [];
  breweries: IBrewery[] = [];

  beerForm = fBeerAddForm();
  submitted: boolean = false;
  showCreateBrewery: boolean = false;

  constructor(private router: Router, private beerService: BeerService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.loadBreweries();
  }

  loadGenres(): void {
    this.beerService.getTypeBeers().subscribe({
      next: (data: IBeerType[]) => (this.genres = data),
      error: (err: any) => console.log(err),
    });
  }

  loadBreweries(): void {
    this.beerService.getBreweries().subscribe({
      next: (data: IBrewery[]) => (this.breweries = data),
      error: (err: any) => console.log(err),
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.beerForm.valid) {
      this.beerService.postBeer(this.beerForm.value as IPostBeer).subscribe({
        next: (data: boolean) => {
          if (data == true) {
            this.router.navigate(['Pages/BeerRanking']);
          } else {
            alert('Une erreur est survenue');
          }
        },
        error: (err: any) => console.log(err),
      });
    }
  }

  Cancel(): void {
    this.router.navigate(['Pages/BeerRanking']);
  }
  updateShowCreate(isVisible: boolean): void {
    this.showCreateBrewery = isVisible;
  }

  getRefreshData(): void {
    console.log('refresh')
    this.loadBreweries();
  }
}
