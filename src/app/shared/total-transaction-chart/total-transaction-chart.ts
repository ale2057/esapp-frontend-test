import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { TransactionService } from '../../services/transaction-service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-total-transaction-chart',
  imports: [BaseChartDirective, TranslateDirective],
  templateUrl: './total-transaction-chart.html',
  styleUrl: './total-transaction-chart.scss',
})
export class TotalTransactionChart implements OnInit {
  totalCount: number = 0;
  barChartType: ChartType = 'bar';
  barChartDate: string[] = [];
  barChartTotal: number[] = [];
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: '' }],
  };
  barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: { display: true },
    },
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    const totals = this.transactionService.totalTransactionsByDate();
    this.totalCount = this.transactionService.totalTransactionsCount();
    this.barChartDate = totals.map((t) => t.date);
    this.barChartTotal = totals.map((t) => t.count);
    this.barChartData = {
      labels: this.barChartDate,
      datasets: [{ data: this.barChartTotal, label: 'Total' }],
    };
  }
}
