import { Component, Input, output } from '@angular/core';
import { BeerService } from '../../../service/beer.service';
import { fBreweryForm } from '../../../../models/fBreweryForm';
import { ICountry } from '../../../../interface/iCountry';
import { IPostBrewery } from '../../../../interface/iPostBrewery';
import { CountryService } from '../../../service/country.service';
import { BreweryService } from '../../../service/brewery.service';

@Component({
  selector: 'app-add-brewery',
  templateUrl: './add-brewery.component.html',
  styleUrl: './add-brewery.component.scss',
})
export class AddBreweryComponent {
  @Input() showCreateBrewery: boolean = false;

  showOut = output<boolean>();
  refreshBrewery = output<boolean>();

  submitted: boolean = false;

  breweryForm = fBreweryForm();
  countries: ICountry[] = [];

  constructor(private breweryService: BreweryService,
    private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountrys();
  }

  loadCountrys() {
    this.countryService.getCountries().subscribe({
      next: (data: ICountry[]) => (this.countries = data),
      error: (err: any) => console.log(err),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.breweryForm.valid) {
      this.breweryService
        .postBrewery(this.breweryForm.value as IPostBrewery)
        .subscribe({
          next: (data: boolean) => {
            if (data == true) {
              this.refreshBrewery.emit(true);
              this.showOut.emit(false);
            } else {
              alert('Une erreur est survenue');
            }
          },
          error: (err: any) => console.log(err),
        });
    }
  }
  Cancel() {
    this.showOut.emit(false);
  }

  onHide() {
    this.showOut.emit(false);
  }
}
