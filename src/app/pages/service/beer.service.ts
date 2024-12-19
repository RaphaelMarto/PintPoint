import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/configuration';
import { Observable } from 'rxjs';
import { IBeerType } from '../../interface/iBeerType';
import { OffsetResultBeer } from '../../interface/iOffsetResultBeer';
import { BeerCompleteInfo } from '../../interface/ibeerCompleteInfo';
import { IPostBeer } from '../../interface/iPostBeer';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  constructor(private http: HttpClient) {}

  getBeers(
    type: string,
    order: string = 'ASC',
    offset: number = 0,
    search: string = '',
    limit: number = 20
  ): Observable<OffsetResultBeer> {
    return this.http.get<OffsetResultBeer>(
      config.API_URL +
        'Beers/Type/' +
        type +
        '?search=' +
        search +
        '&offset=' +
        offset +
        '&limit=' +
        limit +
        '&order=' +
        order
    );
  }

  getBeerById(id: number): Observable<BeerCompleteInfo> {
    return this.http.get<BeerCompleteInfo>(config.API_URL + 'Beers/' + id);
  }

  getTypeBeers(): Observable<IBeerType[]> {
    return this.http.get<IBeerType[]>(config.API_URL + 'BeerType');
  }

  postBeer(beer: IPostBeer): Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Beers', beer);
  }
}
