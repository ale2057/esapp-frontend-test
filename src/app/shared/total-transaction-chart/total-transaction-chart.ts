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
  barChartType: ChartType = 'line';
  barChartDate: string[] = [];
  barChartTotal: number[] = [];
  barChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: '' }],
  };
  barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    const totals = this.transactionService.lastFiveTotalsByDate();
    this.barChartDate = totals.map((t) => t.date);
    this.barChartTotal = totals.map((t) => t.total);
    this.barChartData = {
      labels: this.barChartDate,
      datasets: [{ data: this.barChartTotal, label: 'Total' }],
    };
  }
}
