import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/configuration';
import { ICountry } from '../../interface/iCountry';
import { Observable } from 'rxjs';
import { City } from '../../interface/iCity';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(config.API_URL + 'Countries');
  }

  getCity(): Observable<City[]> {
    return this.http.get<City[]>(config.API_URL + 'Countries/Cities');
  }
}
