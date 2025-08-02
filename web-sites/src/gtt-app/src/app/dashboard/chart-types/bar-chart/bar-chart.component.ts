import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

// Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements AfterViewInit, OnDestroy {
  @Input() title?: string;
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() label: string = 'Datos';
  @Input() backgroundColor: string = 'rgba(59,130,246,0.5)';
  @Input() borderColor: string = 'rgba(59,130,246,1)';

  @ViewChild('canvas') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.label,
              data: this.data,
              backgroundColor: this.backgroundColor,
              borderColor: this.borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: {
              display: !!this.title,
              text: this.title ?? '',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
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
