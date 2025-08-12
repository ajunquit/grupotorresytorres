import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../dashboard-card/dashboard-card.component';
import { ClientsByMonthChartComponent } from '../../graphics-metrics/clients-by-month-chart/clients-by-month-chart.component';
import { OrdersByMonthChartComponent } from '../../graphics-metrics/orders-by-month-chart/orders-by-month-chart.component';
import { TopCustomersChartComponent } from '../../graphics-metrics/top-customers-chart/top-customers-chart.component';
import { OrdersStatusChartComponent } from '../../graphics-metrics/orders-status-chart/orders-status-chart.component';
import { AverageDeliveryTimeChartComponent } from '../../graphics-metrics/average-delivery-time-chart/average-delivery-time-chart.component';
import { DashboardCounter } from '../../models/counter.model';
import { DashboardService } from '../../services/dashboard.service';
import { error } from 'console';

@Component({
  selector: 'app-dashboard-home',
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
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {
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
