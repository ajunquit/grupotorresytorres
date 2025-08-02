import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import('./order-list/order-list.component').then(
        (m) => m.OrderListComponent
      ),
  },
  {
    path: 'orders/new',
    loadComponent: () =>
      import('./order-form/order-form.component').then(
        (m) => m.OrderFormComponent
      ),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent
      ),
  },
];
