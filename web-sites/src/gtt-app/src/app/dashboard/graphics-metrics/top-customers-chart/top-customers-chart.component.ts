import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DoughnutChartComponent } from '../../chart-types/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-top-customers-chart',
  standalone: true,
  templateUrl: './top-customers-chart.component.html',
  styleUrl: './top-customers-chart.component.scss',
  imports: [DoughnutChartComponent],
})
export class TopCustomersChartComponent {}
