import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  countryName: string = '';
  countryData: any[] = [];
  languages: string = '';
  currencies: string = '';
  topLevelDomain: string = '';
  nativeNames: string = '';
  borderCountryCodes: string = '';
  borderCountryData: any[] = [];
  theme: string = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe((currentTheme) => {
      this.theme = currentTheme;
    });

    this.route.params.subscribe((param) => {
      this.countryName = param['id'];
      this.languages = '';
      this.currencies = '';
      this.topLevelDomain = '';
      this.nativeNames = '';
      this.borderCountryCodes = '';
      this.borderCountryData = [];

      this.countryService
        .getCountryByName(this.countryName)
        .subscribe((countryData) => {
          this.countryData = countryData;

          if (
            this.countryData &&
            this.countryData.length > 0 &&
            this.countryData[0].name &&
            this.countryData[0].name.nativeName
          ) {
            for (let key of Object.keys(this.countryData[0].name.nativeName)) {
              this.nativeNames +=
                this.countryData[0].name.nativeName[key].common + ', ';
            }
            this.nativeNames = this.nativeNames.slice(0, -2);
          }

          if (
            this.countryData &&
            this.countryData.length > 0 &&
            this.countryData[0].tld
          ) {
            for (let domain of this.countryData[0].tld) {
              this.topLevelDomain += domain + ', ';
            }
            this.topLevelDomain = this.topLevelDomain.slice(0, -2);
          }

          if (
            this.countryData &&
            this.countryData.length > 0 &&
            this.countryData[0].currencies
          ) {
            for (let key of Object.keys(this.countryData[0].currencies)) {
              this.currencies +=
                this.countryData[0].currencies[key].name + ', ';
            }
            this.currencies = this.currencies.slice(0, -2);
          }

          if (
            this.countryData &&
            this.countryData.length > 0 &&
            this.countryData[0].languages
          ) {
            for (let key of Object.keys(this.countryData[0].languages)) {
              this.languages += this.countryData[0].languages[key] + ', ';
            }
            this.languages = this.languages.slice(0, -2);
          }

          if (
            this.countryData &&
            this.countryData.length > 0 &&
            this.countryData[0].borders &&
            this.countryData[0].borders.length > 0
          ) {
            for (let i = 0; i < this.countryData[0].borders.length; i++) {
              this.borderCountryCodes += this.countryData[0].borders[i] + ',';
            }
            this.borderCountryCodes = this.borderCountryCodes.slice(0, -1);
            this.countryService
              .getBorderCountries(this.borderCountryCodes)
              .subscribe((countryData) => {
                this.borderCountryData = countryData;
              });
          }
        });
    });
  }

  goToBorderCountry(countryName: string) {
    this.router.navigate([countryName]);
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
