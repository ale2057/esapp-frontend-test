import { computed, effect, Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction-model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions = signal<Transaction[]>(this.loadFromStorage());
  transactions = this._transactions;
  totalAmount = computed(() =>
    this._transactions().reduce((s, t) => s + t.amount, 0)
  );
  totalCount = computed(() => this._transactions().length);

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

  clear() {
    this._transactions.set([]);
  }

  todayTransactions() {
    const today = new Date().toISOString().slice(0, 10);
    return this._transactions().filter((t) => t.date.slice(0, 10) === today);
  }
}
