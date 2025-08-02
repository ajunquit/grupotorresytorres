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
  selector: 'app-clients-by-month-chart',
  standalone: true,
  templateUrl: './clients-by-month-chart.component.html',
  styleUrl: './clients-by-month-chart.component.scss',
})
export class ClientsByMonthChartComponent implements AfterViewInit {
  @ViewChild('clientsChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const ctx = this.chartRef.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Clientes nuevos',
              data: [10, 18, 7, 15, 20, 12],
              backgroundColor: [
                '#60A5FA', // Azul claro
                '#34D399', // Verde esmeralda
                '#FBBF24', // Amarillo
                '#F87171', // Rojo claro
                '#A78BFA', // Violeta
                '#F472B6', // Rosado
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
              text: 'Distribución de Clientes Nuevos (últimos 6 meses)',
            },
          },
        },
      });
    }
  }
}
