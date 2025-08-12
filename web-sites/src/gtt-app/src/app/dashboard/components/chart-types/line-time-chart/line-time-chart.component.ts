import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  Input,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-line-time-chart',
  standalone: true,
  templateUrl: './line-time-chart.component.html',
  styleUrl: './line-time-chart.component.scss',
})
export class LineTimeChartComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() datasetLabel: string = 'Serie';
  @Input() color: string = '#3B82F6';

  @ViewChild('canvas') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.datasetLabel,
            data: this.data,
            fill: false,
            borderColor: this.color,
            pointBackgroundColor: this.color,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'bottom' },
          title: { display: true, text: this.title },
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
