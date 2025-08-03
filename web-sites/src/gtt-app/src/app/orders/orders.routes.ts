import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/order-container/order-container.component').then(
        (m) => m.OrderContainerComponent
      ),
  },
];
