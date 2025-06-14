import { UpdatePassword } from './../../interface/iUpdatePassword';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { LoginResponse } from '../../interface/iloginResponse';
import { UserCompleteInfo } from '../../interface/IUserCompleteInfo';
import { config } from '../../config/configuration';
import { checkExist } from '../../interface/iCheckExist';
import { ResMessage } from '../../interface/IResMessage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _showLogin: boolean = false;

  get isShowned(): boolean {
    return this._showLogin;
  }

  get isConnected(): boolean {
    return JSON.parse(localStorage.getItem('isconnected') ?? 'false');
  }

  constructor(private http: HttpClient, private router: Router) {}

  isShownedSubject: Subject<boolean> = new Subject<boolean>();
  isConnectedSubject: Subject<boolean> = new Subject<boolean>();

  emitIsShowned(): void {
    this._showLogin = !this._showLogin;
    this.isShownedSubject.next(this.isShowned);
  }

  emitIsConnected(): void {
    this.isConnectedSubject.next(this.isConnected);
  }

  getNickname(): string {
    return localStorage.getItem('nickname') ?? '';
  }

  Login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<LoginResponse>(config.API_URL + 'Auth/Login', {
        password: password,
        email: email,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('isconnected', JSON.stringify(true));
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('nickname', response.nickname);
          this.emitIsConnected();
        }),
        map(() => true),
        catchError((error) => {
          console.error('login error:', error);
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.emitIsConnected();
    this.router.navigate(['Home']);
  }

  tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  register(user: UserCompleteInfo): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      config.API_URL + 'Auth/Register',
      user
    );
  }

  checkExist(email: string, nickName: string): Observable<checkExist> {
    return this.http.get<checkExist>(
      config.API_URL +
        'Auth/CheckExist?nickName=' +
        nickName +
        '&email=' +
        email
    );
  }

  updatePassword(UpdatePassword: UpdatePassword): Observable<ResMessage> {
    return this.http.put<ResMessage>(config.API_URL + 'Auth/UpdatePassword', UpdatePassword);
  }

  deleteUser(): Observable<ResMessage> {
    return this.http.delete<ResMessage>(config.API_URL + 'Auth/DeleteUser');
  }
}
