import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler, ServerError } from './components/iqb-components.module';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {
  constructor(private http: HttpClient) { }

  checkError(url: string, parameterName: string, parameterValue: string)
    : Observable<string | ServerError> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const myBody = {};
    myBody[parameterName] = parameterValue;
    return this.http
      .post<string>(url, myBody, { headers })
      .pipe(
        catchError(ErrorHandler.handle)
      );
  }
}
