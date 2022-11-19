import { Component, OnInit } from '@angular/core';

import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  countryName: any = '';
  regionName: any = '';
  regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((countryData) => {
      console.log(countryData);
      this.countries = countryData;
    });
    this.regionName = undefined;
  }

  onSearch(event: any) {
    if (event.key == 'Enter') {
      this.countryService.getCountryByName(this.countryName).subscribe({
        next: (countryData) => {
          this.countries = countryData;
          console.log(countryData);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onRegionChanged() {
    console.log(this.regionName);
    this.countryService.getCountryByRegion(this.regionName).subscribe({
      next: (countryData) => {
        this.countries = countryData;
        console.log(countryData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
