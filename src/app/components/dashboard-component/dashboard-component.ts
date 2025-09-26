import { Component } from '@angular/core';
import { BtcTradeComponent } from '../../shared/btc-trade-component/btc-trade-component';

@Component({
  selector: 'app-dashboard-component',
  imports: [BtcTradeComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {}
