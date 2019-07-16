import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Positive } from '../shared/clases/positives';
import { Negative } from '../shared/clases/negatives';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getItemsPositivos$() {
    return this.http.get(`${this.apiURL}positivos/`);
  }

  getItemsNegativos$() {
    return this.http.get(`${this.apiURL}negativos/`);
  }

  addPositivo$(itemP: Positive) {
    return this.http.post<Positive>(`${this.apiURL}positivos/`, itemP)
      .pipe(tap((itemP: Positive) => console.log(`added Positive Item: id=${itemP.id}`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  addNegativo$(itemN: Negative) {
    return this.http.post<Negative>(`${this.apiURL}negativos/`, itemN)
      .pipe(tap((itemN: Negative) => console.log(`added Negative Item: id=${itemN.id}`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  editPositivo$(itemP: Positive) {
    return this.http.put<Positive>(`${this.apiURL}positivos/${itemP.id}`, itemP)
      .pipe(tap((itemP: Positive) => console.log(`edited Positive Item: id=${itemP.id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  editNegativo$(itemN: Negative) {
    return this.http.put<Negative>(`${this.apiURL}negativos/${itemN.id}`, itemN)
      .pipe(tap((itemN: Negative) => console.log(`edited Negative Item: id=${itemN.id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  deletePositivo$(id: string) {
    return this.http.delete(`${this.apiURL}positivos/${id}`);
  }

  deleteNegativo$(id: string) {
    return this.http.delete(`${this.apiURL}negativos/${id}`);
  }

}

