import { Component } from '@angular/core';
import { fBeerAddForm } from '../../../../models/fBeerAddForm';
import { Router } from '@angular/router';
import { BeerService } from '../../../service/beer.service';
import { IBeerType } from '../../../../interface/iBeerType';
import { IBrewery } from '../../../../interface/iBrewery';
import { IPostBeer } from '../../../../interface/iPostBeer';
import { BreweryService } from '../../../service/brewery.service';

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
  currentYear = new Date().getFullYear(); 

  constructor(
    private router: Router,
    private beerService: BeerService,
    private breweryService: BreweryService,
  ) {}

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
    this.breweryService.getBreweries().subscribe({
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
    this.loadBreweries();
  }
}
