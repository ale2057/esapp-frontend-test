import { Component, OnInit } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';
import { TransactionService } from '../../services/transaction-service';
import { AccountService } from '../../services/account-service';
import { Account } from '../../models/account-model';

@Component({
  selector: 'app-most-active-account-component',
  imports: [TranslateDirective],
  templateUrl: './most-active-account-component.html',
  styleUrl: './most-active-account-component.scss',
})
export class MostActiveAccountComponent implements OnInit {
  accuntData: Account | undefined;
  totalMov: number | undefined = 0;
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    console.log(this.transactionService.mostActiveAccount());
    const mostActive = this.transactionService.mostActiveAccount();
    this.totalMov = mostActive?.count;
    this.accuntData = this.accountService.getById(mostActive?.accountId ?? '');
  }
}
