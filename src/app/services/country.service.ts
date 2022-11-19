import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  base_url = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base_url}all`);
  }

  getCountryByName(countryName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.base_url}name/${countryName}?fullText=true`
    );
  }

  getCountryByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base_url}region/${region}`);
  }
}
