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
  selector: 'app-orders-status-chart',
  standalone: true,
  templateUrl: './orders-status-chart.component.html',
  styleUrl: './orders-status-chart.component.scss',
})
export class OrdersStatusChartComponent implements AfterViewInit {
  @ViewChild('ordersStatusChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = this.chartRef.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completados', 'Pendientes'],
          datasets: [
            {
              label: 'Estado de Pedidos',
              data: [120, 45], // datos quemados, reemplazables por valores reales
              backgroundColor: ['#10B981', '#F59E0B'], // Verde y amarillo
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Pedidos Completados vs Pendientes',
            },
          },
        },
      });
    }
  }
}
