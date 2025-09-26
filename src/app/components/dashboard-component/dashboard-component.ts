import { Component } from '@angular/core';
import { BtcTradeComponent } from '../../shared/btc-trade-component/btc-trade-component';
import { TotalTransactionChart } from '../../shared/total-transaction-chart/total-transaction-chart';
import { TotalAmountChart } from '../../shared/total-amount-chart/total-amount-chart';

@Component({
  selector: 'app-dashboard-component',
  imports: [BtcTradeComponent, TotalTransactionChart, TotalAmountChart],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {}
