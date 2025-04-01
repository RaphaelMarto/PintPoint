import { IRated } from './../../interface/iRated';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/configuration';
import { UserProfil } from '../../interface/iUserProfil';
import { Observable } from 'rxjs';
import { Top3 } from '../../interface/itop3';
import { OffsetRating } from '../../interface/iOffsetRating';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(nickname: string): Observable<UserProfil> {
    return this.http.get<UserProfil>(
      config.API_URL + 'User/Profil-Info/' + nickname
    );
  }

  getUserTop3(nickname: string): Observable<Top3[]> {
    return this.http.get<Top3[]>(config.API_URL + 'User/Top3/' + nickname);
  }

  getUserRecentRating(nickname: string): Observable<IRated[]> {
    return this.http.get<IRated[]>(
      config.API_URL + 'User/Recent-Rating/' + nickname
    );
  }

  getUserRatings(
    nickname: string,
    type: string,
    offset: number = 0,
    limit: number = 20,
    order: string = 'ASC'
  ): Observable<OffsetRating> {
    return this.http.get<OffsetRating>(
      config.API_URL +
        'User/User-Ratings/' +
        nickname +
        '?type=' +
        type +
        '&offset=' +
        offset +
        '&limit=' +
        limit +
        '&order=' +
        order
    );
  }
}
