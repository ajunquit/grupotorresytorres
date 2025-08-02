import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

Chart.register(...registerables);

@Component({
  selector: 'app-orders-by-month-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-by-month-chart.component.html',
})
export class OrdersByMonthChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ordersChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Pedidos',
              data: [12, 19, 9, 15, 22, 13],
              backgroundColor: 'rgba(59,130,246,0.5)', // tailwind blue-500 w/ opacity
              borderColor: 'rgba(59,130,246,1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };

      this.chart = new Chart(this.chartRef.nativeElement, config);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
