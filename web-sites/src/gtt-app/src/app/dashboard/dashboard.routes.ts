import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-home/dashboard-home.component').then(
        (m) => m.DashboardHomeComponent
      ),
  },
];
