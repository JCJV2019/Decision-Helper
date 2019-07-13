import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Positive } from '../shared/clases/positives';
import { Negative } from '../shared/clases/negatives';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItemsPositivos$() {
    return this.http.get('http://localhost:3000/positivos/');
  }

  getItemsNegativos$() {
    return this.http.get('http://localhost:3000/negativos/');
  }

  addPositivo$(itemP: Positive) {
    return this.http.post<Positive>('http://localhost:3000/positivos', itemP)
      .pipe(tap((itemP: Positive) => console.log(`added Positive Item: id=${itemP.id}`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  addNegativo$(itemN: Negative) {
    return this.http.post<Negative>('http://localhost:3000/negativos', itemN)
      .pipe(tap((itemN: Negative) => console.log(`added Negative Item: id=${itemN.id}`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  editPositivo$(itemP: Positive) {
    return this.http.put<Positive>(`http://localhost:3000/positivos/${itemP.id}`, itemP)
      .pipe(tap((itemP: Positive) => console.log(`edited Positive Item: id=${itemP.id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  editNegativo$(itemN: Negative) {
    return this.http.put<Negative>(`http://localhost:3000/negativos/${itemN.id}`, itemN)
      .pipe(tap((itemN: Negative) => console.log(`edited Negative Item: id=${itemN.id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  deletePositivo$(id: string) {
    return this.http.delete(`http://localhost:3000/positivos/${id}`);
  }

  deleteNegativo$(id: string) {
    return this.http.delete(`http://localhost:3000/negativos/${id}`);
  }

   /*
  getMember$(id: string) {
    return this.http.get<Member>(`http://localhost:3000/customers/${id}`);
  }

  addMember$(member: Member) {
    return this.http.post<Member>('http://localhost:3000/customers', member)
      .pipe(tap((member: Member) => console.log(`added Customer: id=${member.id}`)),
      catchError(error => {
        console.log(error);
        return throwError(error);
      }));
  }

  deleteMember$(id: string) {
    return this.http.delete(`http://localhost:3000/customers/${id}`);
  }

  editMember$(member: Member) {
    return this.http.put<Member>(`http://localhost:3000/customers/${member.id}`, member)
      .pipe(tap((member: Member) => console.log(`edited Customer: id=${member.id}`)),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }
*/
}

