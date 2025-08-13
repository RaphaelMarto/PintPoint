import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { fBeerPutForm } from '../../../../models/fBeerPutForm';
import { IBeerType } from '../../../../interface/iBeerType';
import { IBrewery } from '../../../../interface/iBrewery';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from '../../../service/beer.service';
import { BreweryService } from '../../../service/brewery.service';
import { IPutBeer } from '../../../../interface/iPutBeer';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-put-beer',
  templateUrl: './put-beer.component.html',
  styleUrl: './put-beer.component.scss'
})
export class PutBeerComponent {
  beerPutForm: FormGroup;
  //beerPutForm = fBeerPutForm();
  genres: IBeerType[] = [];
  breweries: IBrewery[] = [];
  submitted: boolean = false;
  showCreateBrewery: boolean = false;
  currentYear = new Date().getFullYear();
  id : number = 0;
    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private beerService: BeerService,
      private breweryService: BreweryService,
      private Location : Location,
    ) {
      this.beerPutForm = fBeerPutForm();
    }
  
    ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.loadGenres();
      this.loadBreweries();
      this.loadBeerData();
      
    }

    loadBeerData() {
      this.beerService.getBeerById(this.id).subscribe({
        next: (data: IPutBeer) => {
          this.beerPutForm.patchValue(data);
        },
        error: (err: any) => console.log(err),
      });
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
  
      if (this.beerPutForm.valid) {
        this.beerPutForm.get('id')?.setValue(this.id);
        this.beerService.putBeer(this.beerPutForm.value as IPutBeer).subscribe({
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
      this.Location.back();
    }
    updateShowCreate(isVisible: boolean): void {
      this.showCreateBrewery = isVisible;
    }
  
    getRefreshData(): void {
      this.loadBreweries();
    }
}
