import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';
import { Account } from '../../models/account-model';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-account-card-component',
  imports: [TranslateDirective, FormsModule, DecimalPipe],
  templateUrl: './account-card-component.html',
  styleUrl: './account-card-component.scss',
})
export class AccountCardComponent {
  @Input() cardTitle = '';
  @Input() accounts: Account[] = [];
  @Output() selected = new EventEmitter<Account | null>();
  selectedAccount: Account | null = null;

  onAccountChange() {
    this.selected.emit(this.selectedAccount);
  }
}
