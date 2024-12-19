import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/configuration';
import { Observable } from 'rxjs';
import { IRated } from '../../interface/iRated';
import { OffsetRating } from '../../interface/iOffsetRating';
import { AverageBeer } from '../../interface/iAverageBeer';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient) {}

  getRatingPopular(): Observable<IRated[]> {
    return this.http.get<IRated[]>(config.API_URL + 'Ratings/Popular');
  }

  getRatingNewest(): Observable<IRated[]> {
    return this.http.get<IRated[]>(config.API_URL + 'Ratings/Newest');
  }

  postLikeDislike(
    likeStatus: boolean,
    idRating: number
  ): Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Ratings/', {
      likeStatus: likeStatus,
      idRating: idRating,
    });
  }

  getRating(
    type: string,
    order: string = 'ASC',
    offset: number = 0,
    limit: number = 20
  ): Observable<OffsetRating> {
    return this.http.get<OffsetRating>(
      config.API_URL +
        'Ratings/Type/' +
        type +
        '& offset=' +
        offset +
        '&limit=' +
        limit +
        '&order=' +
        order
    );
  }

  getAverageRating(idBeer: number): Observable<AverageBeer[]> {
    return this.http.get<AverageBeer[]>(config.API_URL + 'Ratings/Moyen/' + idBeer);
  }
}
