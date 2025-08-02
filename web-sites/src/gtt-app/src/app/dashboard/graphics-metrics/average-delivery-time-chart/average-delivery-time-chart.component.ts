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
  selector: 'app-average-delivery-time-chart',
  standalone: true,
  templateUrl: './average-delivery-time-chart.component.html',
  styleUrl: './average-delivery-time-chart.component.scss',
})
export class AverageDeliveryTimeChartComponent implements AfterViewInit {
  @ViewChild('deliveryTimeChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = this.chartRef.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Tiempo promedio de entrega (días)',
              data: [3.2, 2.8, 3.5, 4.1, 3.7, 2.9],
              fill: false,
              borderColor: '#3B82F6',
              tension: 0.3,
              pointBackgroundColor: '#3B82F6',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Tiempo Promedio de Entrega por Mes',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Días',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Mes',
              },
            },
          },
        },
      });
    }
  }
}
