import { Component, OnInit } from '@angular/core';

import { CountryService } from '../services/country.service';
import { ThemeService } from '../services/theme.service';

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
  theme = '';

  constructor(
    private countryService: CountryService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe((currentTheme) => {
      this.theme = currentTheme;
    });
    this.countryService.getAllCountries().subscribe((countryData) => {
      this.countries = countryData;
    });
    this.regionName = undefined;
  }

  onSearch(event: any) {
    if (event.key == 'Enter') {
      this.countryService.getCountryByName(this.countryName).subscribe({
        next: (countryData) => {
          this.countries = countryData;
          this.regionName = undefined;
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.countryName = '';
    }
  }

  onRegionChanged() {
    this.countryService.getCountryByRegion(this.regionName).subscribe({
      next: (countryData) => {
        this.countries = countryData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
