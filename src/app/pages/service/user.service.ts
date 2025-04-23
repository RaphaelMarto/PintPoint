import { IRated } from './../../interface/iRated';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/configuration';
import { ProfilePic } from '../../interface/iProfilePic';
import { Observable } from 'rxjs';
import { Top3 } from '../../interface/itop3';
import { OffsetRating } from '../../interface/iOffsetRating';
import { UserUpdate } from '../../interface/iUserUpdate';
import { UserAdress } from '../../interface/iUserAddress';
import { UserProfile } from '../../interface/iUserProfile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfilPic(nickname: string): Observable<ProfilePic> {
    return this.http.get<ProfilePic>(
      config.API_URL + 'User/Profil-Picture/' + nickname
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

  getUserProfile(nickName:string): Observable<UserProfile> {
    return this.http.get<UserProfile>(config.API_URL + 'User/Profile/' + nickName);
  }

  updateUserProfile(user: UserUpdate, nickName: string): Observable<boolean> {
    return this.http.put<boolean>(config.API_URL + 'User/Profile/' + nickName, user);
  }
  updateUserAddress(user: UserAdress): Observable<boolean> {
    return this.http.put<boolean>(config.API_URL + 'User/Address', user);
  }
}
