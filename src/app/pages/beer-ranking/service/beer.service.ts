import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../config/configuration';
import { Observable } from 'rxjs';
import { IBeerType } from '../../../interface/iBeerType';
import { IBrewery } from '../../../interface/iBrewery';
import { OffsetResultBeer } from '../../../interface/iOffsetResultBeer';
import { BeerCompleteInfo } from '../../../interface/ibeerCompleteInfo';
import { IPostBeer } from '../../../interface/iPostBeer';
import { ICountry } from '../../../interface/iCountry';
import { IPostBrewery } from '../../../interface/iPostBrewery';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http : HttpClient) { }

  getBeers(type : string, order : string = "ASC", offset : number = 0, search : string = '', limit : number = 20) : Observable<OffsetResultBeer> {
    return this.http.get<OffsetResultBeer>(config.API_URL + 'Beers/Type/' + type + '?search=' + search + '&offset=' + offset + '&limit=' + limit + '&order=' + order)
  }

  getBeerById(id : string) : Observable<BeerCompleteInfo> {
    return this.http.get<BeerCompleteInfo>(config.API_URL + 'Beers/' + id)
  }

  getTypeBeers() : Observable<IBeerType[]> {
    return this.http.get<IBeerType[]>(config.API_URL + 'BeerType')
  }

  getBreweries() : Observable<IBrewery[]> {
    return this.http.get<IBrewery[]>(config.API_URL + 'Breweries')
  }

  postBeer(beer : IPostBeer) : Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Beers', beer)
  }

  getCountries() : Observable<ICountry[]> {
    return this.http.get<ICountry[]>(config.API_URL + 'Countries')
  }

  postBrewery(brewery : IPostBrewery) : Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Breweries', brewery)
  }
}
