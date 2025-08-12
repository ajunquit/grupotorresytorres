import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AverageDeliveryTimeChartComponent } from '../../components/chart-metrics/average-delivery-time-chart/average-delivery-time-chart.component';
import { ClientsByMonthChartComponent } from '../../components/chart-metrics/clients-by-month-chart/clients-by-month-chart.component';
import { OrdersByMonthChartComponent } from '../../components/chart-metrics/orders-by-month-chart/orders-by-month-chart.component';
import { OrdersStatusChartComponent } from '../../components/chart-metrics/orders-status-chart/orders-status-chart.component';
import { TopCustomersChartComponent } from '../../components/chart-metrics/top-customers-chart/top-customers-chart.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { DashboardCounter } from '../../models/counter.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    CommonModule,
    DashboardCardComponent,
    OrdersByMonthChartComponent,
    ClientsByMonthChartComponent,
    TopCustomersChartComponent,
    OrdersStatusChartComponent,
    AverageDeliveryTimeChartComponent,
  ],
  templateUrl: './dashboard-container.component.html',
})
export class DashboardContainerComponent implements OnInit {
  public title: string = 'Resumen General';
  public counters: DashboardCounter = {
    completedOrders: 0,
    pendingOrders: 0,
    totalClients: 0,
    totalOrders: 0,
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.internalInit();
  }

  private internalInit() {
    this.setCounters();
  }

  private setCounters() {
    this.dashboardService.getCounters().subscribe({
      next: (data: DashboardCounter) => {
        this.counters = data;
      },
      error: (err) =>
        console.error(err, 'Error when getting dashboard counters.'),
    });
  }
}
