import { Component } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';
import { AccountCardComponent } from '../../shared/account-card-component/account-card-component';
import { AccountService } from '../../services/account-service';
import { Account } from '../../models/account-model';
import { ToastService } from '../../services/toast-service';
import { Transaction } from '../../models/transaction-model';
import { v4 as uuidv4 } from 'uuid';
import { TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-transfer-panel-component',
  imports: [TranslateDirective, AccountCardComponent],
  templateUrl: './transfer-panel-component.html',
  styleUrl: './transfer-panel-component.scss',
})
export class TransferPanelComponent {
  private balance = 0;
  accounts: Account[] = [];
  amount: number | null = null;
  invTransaction: boolean = true;
  srcAccountId: string | null = null;
  trgAccountId: string | null = null;
  exceedBalance = false;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {
    this.init();
  }

  private async init() {
    await this.accountService.loadAccounts();
    this.accounts = this.accountService.getAll();
  }

  private validateAccounts(): boolean {
    if (this.srcAccountId === null || this.trgAccountId === null) {
      return true;
    }
    if (this.srcAccountId === this.trgAccountId) {
      this.toastService.warning('trans-panel.duplicate-same', 5000);
      return true;
    }
    return false;
  }

  private saveTransaction(transaction: Transaction) {
    this.transactionService.add(transaction);
    this.toastService.success('trans-panel.success-trans', 5000);
  }

  checkAccount() {
    this.invTransaction = this.validateAccounts();
    this.balance =
      this.accountService.getBalanceById(this.srcAccountId ?? '') ?? 0;
    this.amount = null;
  }

  onAmountInput(event: Event) {
    let input = (event.target as HTMLInputElement).value;
    if (input.startsWith('-')) {
      input = input.replace('-', '');
    }
    input = input.replace(/[^0-9.]/g, '');
    if (input.includes('.')) {
      const [intPart, decPart] = input.split('.');
      input = intPart + '.' + decPart.slice(0, 2);
    }
    this.amount = input ? parseFloat(input) : null;
    this.exceedBalance = this.amount !== null && this.amount > this.balance;
    (event.target as HTMLInputElement).value = input;
  }

  createTransaction() {
    if (this.amount === null || this.amount <= 0) {
      this.toastService.danger('trans-panel.high-amt', 5000);
      return;
    }
    if (!this.srcAccountId || !this.trgAccountId) {
      return;
    }
    if (this.srcAccountId === this.trgAccountId) {
      this.toastService.warning('trans-panel.duplicate-same', 5000);
      return;
    }
    const transaction: Transaction = {
      id: uuidv4(),
      srcAccountId: this.srcAccountId,
      trgAccountId: this.trgAccountId,
      amount: Number(this.amount.toFixed(2)),
      date: new Date().toISOString(),
    };
    this.saveTransaction(transaction);
  }
}
