import { Injectable } from '@angular/core';
import { Account } from '../models/account-model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  async loadAccounts(): Promise<void> {
    const data = this.http.get<Account[]>('http://localhost:3000/accounts');
    this.accounts = await lastValueFrom(data);
  }

  getAll(): Account[] {
    return this.accounts.map((a) => ({ ...a }));
  }

  getBalanceById(id: string) {
    return this.accounts.find((a) => a.id === id)?.balance;
  }
}
