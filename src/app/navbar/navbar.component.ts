import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  theme: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe((currentTheme) => {
      this.theme = currentTheme;
    });
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
