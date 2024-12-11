import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../config/configuration';
import { Observable } from 'rxjs';
import { OffsetResultBeer } from '../../../models/OffsetResultBeer';
import { BeerCompleteInfo } from '../../../models/beerCompleteInfo.model';

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
}
