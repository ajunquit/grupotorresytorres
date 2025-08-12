import { Component } from '@angular/core';
import { LineTimeChartComponent } from '../../chart-types/line-time-chart/line-time-chart.component';

@Component({
  selector: 'app-average-delivery-time-chart',
  standalone: true,
  templateUrl: './average-delivery-time-chart.component.html',
  styleUrl: './average-delivery-time-chart.component.scss',
  imports: [LineTimeChartComponent],
})
export class AverageDeliveryTimeChartComponent {}
