import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar-component/navbar-component';
import { ToastContainerComponent } from './shared/toast-container-component/toast-container-component';
import { AccountService } from './services/account-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('esapp-frontend-test');

  constructor(private accountService: AccountService) {}

  async ngOnInit(): Promise<void> {
    await this.accountService.loadAccounts();
  }
}
