import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/configuration';
import { Observable, Subject } from 'rxjs';
import { IRated } from '../../interface/iRated';
import { OffsetRating } from '../../interface/iOffsetRating';
import { AverageBeer } from '../../interface/iAverageBeer';
import { PostRate } from '../../interface/iPostRate';
import { Top3 } from '../../interface/itop3';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private _showAddLog: boolean = false;

  get isAddLogShowned(): boolean {
    return this._showAddLog;
  }

  isAddLogShownedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getRatingPopular(idBeer: number): Observable<IRated[]> {
    return this.http.get<IRated[]>(
      config.API_URL + 'Ratings/Popular/' + idBeer
    );
  }

  getRatingNewest(idBeer: number): Observable<IRated[]> {
    return this.http.get<IRated[]>(config.API_URL + 'Ratings/Newest/' + idBeer);
  }

  postLikeDislike(likeStatus: boolean, idRating: number): Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Ratings', {
      likeStatus: likeStatus,
      idRating: idRating,
    });
  }

  getRating(
    type: string,
    idBeer: number,
    order: string = 'ASC',
    offset: number = 0,
    limit: number = 20
  ): Observable<OffsetRating> {
    return this.http.get<OffsetRating>(
      config.API_URL +
        'Ratings/Type/' +
        type +
        '?idBeer=' +
        idBeer +
        '&offset=' +
        offset +
        '&limit=' +
        limit +
        '&order=' +
        order
    );
  }

  getAverageRating(idBeer: number): Observable<AverageBeer[]> {
    return this.http.get<AverageBeer[]>(
      config.API_URL + 'Ratings/Moyen/' + idBeer
    );
  }

  emitIsShowned(): void {
    this._showAddLog = !this._showAddLog;
    this.isAddLogShownedSubject.next(this.isAddLogShowned);
  }

  postRate(rate: PostRate, idBeer: number): Observable<boolean> {
    return this.http.post<boolean>(config.API_URL + 'Ratings/Rate/' + idBeer, rate);
  }

  putRate(rate: PostRate, idRating: number): Observable<boolean> {
    return this.http.put<boolean>(config.API_URL + 'Ratings/Rate/' + idRating, rate);
  }

  getOneRating(idBeer: number): Observable<PostRate> {
    return this.http.get<PostRate>(config.API_URL + 'Ratings/Rate/' + idBeer);
  }

  getTop3Beers(): Observable<Top3[]> {
    return this.http.get<Top3[]>(config.API_URL + 'Ratings/Rate/Top3');
  }
}
