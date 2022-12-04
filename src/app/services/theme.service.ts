import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = new BehaviorSubject<string>('light');
  theme$ = this.theme.asObservable();

  getTheme() {
    return this.theme$;
  }

  setTheme(newTheme: string) {
    return this.theme.next(newTheme);
  }
}
