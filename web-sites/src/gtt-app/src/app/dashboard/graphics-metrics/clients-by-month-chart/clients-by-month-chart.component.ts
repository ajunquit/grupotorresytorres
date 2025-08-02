import { Component } from '@angular/core';
import { DoughnutChartComponent } from '../../chart-types/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-clients-by-month-chart',
  standalone: true,
  templateUrl: './clients-by-month-chart.component.html',
  styleUrl: './clients-by-month-chart.component.scss',
  imports: [DoughnutChartComponent],
})
export class ClientsByMonthChartComponent {}
