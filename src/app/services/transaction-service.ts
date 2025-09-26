import { effect, Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction-model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions = signal<Transaction[]>(this.loadFromStorage());

  constructor() {
    effect(() => {
      const value = this._transactions();
      try {
        localStorage.setItem('transactions', JSON.stringify(value));
      } catch (e) {
        console.warn(e);
      }
    });
  }

  private loadFromStorage(): Transaction[] {
    try {
      const raw = localStorage.getItem('transactions');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  add(tx: Transaction) {
    this._transactions.update((prev) => [...prev, tx]);
  }

  todayTransactions() {
    const today = new Date().toISOString().slice(0, 10);
    return this._transactions().filter((t) => t.date.slice(0, 10) === today);
  }

  todayTotal() {
    return this.todayTransactions().reduce((s, t) => s + t.amount, 0);
  }

  filterTransactions(opts: {
    originId?: string;
    destId?: string;
    minAmount?: number;
    maxAmount?: number;
  }) {
    return this.todayTransactions().filter((t) => {
      if (opts.originId && t.srcAccountId !== opts.originId) return false;
      if (opts.destId && t.trgAccountId !== opts.destId) return false;
      if (opts.minAmount !== undefined && t.amount < opts.minAmount)
        return false;
      if (opts.maxAmount !== undefined && t.amount > opts.maxAmount)
        return false;
      return true;
    });
  }
}
