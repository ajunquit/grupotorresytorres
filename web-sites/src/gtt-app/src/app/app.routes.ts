import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { customerRoutes } from './customers/customers.routes';
import { ordersRoutes } from './orders/orders.routes';
import { dashboardRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [...dashboardRoutes, ...customerRoutes, ...ordersRoutes],
  },
  ...authRoutes,
  { path: '**', redirectTo: 'dashboard' },
];
