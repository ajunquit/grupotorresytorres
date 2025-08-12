import { Component } from '@angular/core';
import { DoughnutChartComponent } from '../../chart-types/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-orders-status-chart',
  standalone: true,
  templateUrl: './orders-status-chart.component.html',
  styleUrl: './orders-status-chart.component.scss',
  imports: [DoughnutChartComponent],
})
export class OrdersStatusChartComponent {}
