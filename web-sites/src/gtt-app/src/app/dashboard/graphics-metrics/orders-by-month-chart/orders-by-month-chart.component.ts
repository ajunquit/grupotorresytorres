import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarChartComponent } from '../../chart-types/bar-chart/bar-chart.component';

//Chart.register(...registerables);

@Component({
  selector: 'app-orders-by-month-chart',
  standalone: true,
  imports: [CommonModule, BarChartComponent],
  templateUrl: './orders-by-month-chart.component.html',
})
export class OrdersByMonthChartComponent {}
