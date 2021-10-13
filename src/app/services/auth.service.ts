import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../models/singup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../models/login-request.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: any): Observable<any> {
    return this.httpClient.post('https://reddit-app-ken.herokuapp.com/api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: any): Observable<boolean> {
    return this.httpClient.post<any>("https://reddit-app-ken.herokuapp.com/api/auth/signin", loginRequestPayload)
            // map other subscribe
           .pipe(map((data => {
            this.localStorage.store('token', data.token);
            this.localStorage.store('username', data.username);
            this.localStorage.store('refresToken', data.refresToken);
            this.localStorage.store('expireAt', data.expireAt);

            this.loggedIn.emit(true);
            this.username.emit(data.username);
            return true;
           })));
  }

  getJwtToken() {
    return this.localStorage.retrieve('token');
  }

  refreshToken() {
    return this.httpClient.post<any>('https://reddit-app-ken.herokuapp.com/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('token');
        this.localStorage.clear('expireAt');

        this.localStorage.store('token',
          response.authenticationToken);
        this.localStorage.store('expireAt', response.expireAt);
      }));
  }

  logout() {
    this.httpClient.post('https://reddit-app-ken.herokuapp.com/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('token');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expireAt');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
