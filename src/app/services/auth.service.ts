import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../shared/interfaces/user-interface';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = environment.API_URL;
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLogged());

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  registerUser(name: string, email: string, password: string) {
    const urlApi = `${this.authURL}register/`;
    return this.http
      .post<UserInterface>(
        urlApi,
        { name, email, password },
        { headers: this.headers }
      )
      .pipe(tap(data => data),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  loginUser(email: string, password: string): Observable<any> {
    const urlApi = `${this.authURL}login/`;
    return this.http
      .post<UserInterface>(
        urlApi,
        { name, email, password },
        { headers: this.headers }
      )
      .pipe(tap(data => {
        localStorage.setItem('isLogged', 'true');
        this.isLogged.next(true);
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  setUser(user: UserInterface): void {
    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!(accessToken === undefined || accessToken === null)) {
      return accessToken;
    } else {
      return null;
    }

  }

  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogged');
  }

  getLogged(): boolean {
    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else { return false; }
  }
}
