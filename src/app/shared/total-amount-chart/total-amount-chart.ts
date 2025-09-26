import { Component } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransactionService } from '../../services/transaction-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-amount-chart',
  imports: [BaseChartDirective, TranslateDirective, CommonModule],
  templateUrl: './total-amount-chart.html',
})
export class TotalAmountChart {
  totalAmount: number = 0;
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
    this.totalAmount = this.transactionService.totalAmountCount();
    this.barChartDate = totals.map((t) => t.date);
    this.barChartTotal = totals.map((t) => t.total);
    this.barChartData = {
      labels: this.barChartDate,
      datasets: [{ data: this.barChartTotal, label: 'Total' }],
    };
  }
}
