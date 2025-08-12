import { Component, OnInit } from '@angular/core';
import { DoughnutChartComponent } from '../../chart-types/doughnut-chart/doughnut-chart.component';
import { DashboardService } from '../../../services/dashboard.service';
import { ChartPropertiesResponse } from '../../../models/chart-properties-response.model';

@Component({
  selector: 'app-clients-by-month-chart',
  standalone: true,
  templateUrl: './clients-by-month-chart.component.html',
  styleUrl: './clients-by-month-chart.component.scss',
  imports: [DoughnutChartComponent],
})
export class ClientsByMonthChartComponent implements OnInit {
  public title: string = 'Nuevos Clientes';
  public chartProperties!: ChartPropertiesResponse;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.internalInit();
  }

  private internalInit(): void {
    this.setChartProperties();
  }

  private setChartProperties(): void {
    this.dashboardService.getNewClientsByLastMonths(6).subscribe({
      next: (data: ChartPropertiesResponse) => (this.chartProperties = data),
      error: (err) =>
        console.error(err, 'Error when getting new clients by last x months'),
    });
  }
}
