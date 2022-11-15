import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  base_url = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get(`${this.base_url}all`);
  }

  getCountryByName(countryName: string) {
    return this.http.get(`${this.base_url}name/${countryName}`);
  }

  getCountryByRegion(region: string) {
    return this.http.get(`${this.base_url}region/${region}`);
  }
}
