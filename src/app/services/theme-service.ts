import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey) as
      | 'light'
      | 'dark'
      | null;
    this.setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  }

  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme') as
      | 'light'
      | 'dark';
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getTheme(): string {
    return document.documentElement.getAttribute('data-bs-theme') || 'light';
  }
}
