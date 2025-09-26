import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Transaction } from '../../models/transaction-model';
import { TranslateDirective } from '@ngx-translate/core';
import { AccountService } from '../../services/account-service';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/account-model';

@Component({
  selector: 'app-history-component',
  imports: [DecimalPipe, DatePipe, TranslateDirective, FormsModule],
  templateUrl: './history-component.html',
  styleUrl: './history-component.scss',
})
export class HistoryComponent implements OnInit {
  today = new Date();
  trCount = 0;
  trAmount = 0;
  tdTransacions: Transaction[] = [];
  accounts: Account[] = [];
  filterOrigin?: string;
  filterDest?: string;
  filterMin?: number;
  filterMax?: number;

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.tdTransacions = this.transactionService.todayTransactions();
    this.trAmount = this.transactionService.todayTotal();
    this.trCount = this.tdTransacions.length;
    this.accounts = this.accountService.getAll();
  }

  applyFilters() {
    this.tdTransacions = this.transactionService.filterTransactions({
      originId: this.filterOrigin,
      destId: this.filterDest,
      minAmount: this.filterMin,
      maxAmount: this.filterMax,
    });
    this.trAmount = this.tdTransacions.reduce((s, t) => s + t.amount, 0);
    this.trCount = this.tdTransacions.length;
  }

  resetFilters() {
    this.filterOrigin = undefined;
    this.filterDest = undefined;
    this.filterMin = undefined;
    this.filterMax = undefined;
    this.applyFilters();
  }

  getAccountName(id: string) {
    return this.accountService.getNameById(id);
  }
}
