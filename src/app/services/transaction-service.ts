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

  totalAmountCount() {
    return this._transactions().reduce((s, t) => s + t.amount, 0);
  }

  lastFiveTotalsByDate() {
    const grouped: Record<string, number> = {};
    for (const t of this._transactions()) {
      const date = t.date.slice(0, 10);
      grouped[date] = (grouped[date] ?? 0) + t.amount;
    }
    const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
    return sortedDates.slice(0, 5).map((date) => ({
      date,
      total: grouped[date],
    }));
  }

  totalTransactionsCount(): number {
    return this._transactions().length;
  }

  totalTransactionsByDate() {
    const grouped: Record<string, number> = {};
    for (const t of this._transactions()) {
      const date = t.date.slice(0, 10);
      grouped[date] = (grouped[date] ?? 0) + 1;
    }
    return Object.keys(grouped)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 5)
      .map((date) => ({
        date,
        count: grouped[date],
      }));
  }
}
