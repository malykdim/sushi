import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

import { AuthResponseData } from "src/app/shared/interfaces/authResponseData";
import { User } from "./user.model";
import { environment } from 'src/environments/environment';
const authEndpoint = environment.authEndpoint;
const webAPIkey = environment.webAPIkey;


@Injectable({ providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        (authEndpoint + 'signUp?key=' + webAPIkey),
        {
          email: email,
          password: password,
          returnSecureToken: true
        },
      )
      .pipe(
        catchError(this.handleError),
        tap(
          resData => {
            console.log(resData);

            this.handleAuthentication(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn));
          }
        ),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        (authEndpoint + 'signInWithPassword?key=' + webAPIkey),
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(
          resData => {
            console.log(resData);
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, Number(resData.expiresIn));
          }
        )

      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      role: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData.role, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    console.log(this.user);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    let role = 'guest';
    switch (email) {
      case 'admin@sushi.com': role = 'admin'; break;
      case 'chef@sushi.com': role = 'chef'; break;
      default: role = 'client';
    }
    console.log(role);

    const user = new User(email, userId, role, token, expirationDate);

    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocured!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already'; break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Please enter valid credentials!'; break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Please enter valid credentials!'; break;
    }

    return throwError(errorMessage);
  }

  // Back4App
  /*
  getCurrentUser(id: string) {
    return this.http
      .get<AuthResponseData>(
        'https://parseapi.back4app.com/users/me',
        {
          headers: new HttpHeaders({
            "X-Parse-Application-Id": "BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f",
            "X-Parse-REST-API-Key": "swrFFIXJlFudtF3HkZPtfybDFRTmS7sPwvGUzQ9w",
            "X-Parse-Session-Token": "r:03a4c2d87a63a020a7d737c6fc64fd4c"
          })
        }
      )
  }
  */
}
