import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { IPostBrewery } from '../../interface/iPostBrewery';
import { IBrewery } from '../../interface/iBrewery';
import { config } from '../../config/configuration';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor(private http: HttpClient) {}

  getBreweries(): Observable<IBrewery[]> {
    return this.http.get<IBrewery[]>(config.API_URL + 'Breweries');
  }

  postBrewery(brewery: IPostBrewery): Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Breweries', brewery);
  }
}
