import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { Country } from './preference/preference.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  countries: Country[] = [
    {name: "USA"},
    {name: "UK"},
    {name: "Japan"},
    {name: "Korea"},
    {name: "China"},
    {name: "Australia"}
  ]

  private apiUrl: string = "http://localhost:5000/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    })
  };

  userPreferences: Country[] = [];

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('An error occured: ', error.error);
    } else {
      console.error(
        `Backend return code ${error.status}` +
        `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try later');
  }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl+'get_countries')
      .pipe(
        tap(_ => console.log("UserPreferenceService: fetched countries list"))
      );
  }

  updateUserPreferences(countries: Country[]): void {
    if(countries === undefined) return;
    var names: string[] = [];
    countries.forEach(country => names.push(country.name));
    this.http.post(this.apiUrl+'update_user_preference', names, this.httpOptions)
      .subscribe(res => console.log(res));
    console.log(names);
  }

  getUserPreferences() {
    return this.http.get(this.apiUrl+'get_user_preference');
  }
}
