import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { ClientsByMonthChartComponent } from '../graphics-metrics/clients-by-month-chart/clients-by-month-chart.component';
import { OrdersByMonthChartComponent } from '../graphics-metrics/orders-by-month-chart/orders-by-month-chart.component';
import { TopCustomersChartComponent } from '../graphics-metrics/top-customers-chart/top-customers-chart.component';
import { OrdersStatusChartComponent } from '../graphics-metrics/orders-status-chart/orders-status-chart.component';
import { AverageDeliveryTimeChartComponent } from '../graphics-metrics/average-delivery-time-chart/average-delivery-time-chart.component';

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
export class DashboardHomeComponent {
  stats = {
    totalClients: 125,
    totalOrders: 342,
    completedOrders: 280,
    pendingOrders: 62,
  };
}
