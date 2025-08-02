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

@Component({
  selector: 'app-top-customers-chart',
  standalone: true,
  templateUrl: './top-customers-chart.component.html',
  styleUrl: './top-customers-chart.component.scss',
})
export class TopCustomersChartComponent implements AfterViewInit {
  @ViewChild('topCustomersChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = this.chartRef.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Cliente A',
            'Cliente B',
            'Cliente C',
            'Cliente D',
            'Cliente E',
          ],
          datasets: [
            {
              label: 'Volumen de Compra',
              data: [1200, 950, 780, 600, 450],
              backgroundColor: [
                '#4F46E5', // Indigo
                '#06B6D4', // Cyan
                '#10B981', // Emerald
                '#F59E0B', // Amber
                '#EF4444', // Red
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Top 5 Clientes por Volumen de Compra',
            },
          },
        },
      });
    }
  }
}
