import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartPropertiesResponse } from '../../../models/chart-properties-response.model';
import { DashboardService } from '../../../services/dashboard.service';
import { DoughnutChartComponent } from '../../chart-types/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-clients-by-month-chart',
  standalone: true,
  templateUrl: './clients-by-month-chart.component.html',
  styleUrl: './clients-by-month-chart.component.scss',
  imports: [DoughnutChartComponent, CommonModule],
})
export class ClientsByMonthChartComponent implements OnInit {
  public title: string = 'Nuevos Clientes';
  public chartProperties!: ChartPropertiesResponse;
  public LAST_MONTHS: number = 6;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.internalInit();
  }

  private internalInit(): void {
    this.setChartProperties();
  }

  private setChartProperties(): void {
    this.dashboardService
      .getNewClientsByLastMonths(this.LAST_MONTHS)
      .subscribe({
        next: (data: ChartPropertiesResponse) => (this.chartProperties = data),
        error: (err) =>
          console.error(err, 'Error when getting new clients by last x months'),
      });
  }
}
