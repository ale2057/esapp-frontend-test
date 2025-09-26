import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { TranslateDirective } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [TranslateDirective, RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
})
export class NavbarComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get currentTheme() {
    return this.themeService.getTheme();
  }
}
