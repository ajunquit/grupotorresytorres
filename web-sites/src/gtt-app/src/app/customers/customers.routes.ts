import { Routes } from '@angular/router';

export const customerRoutes: Routes = [
  {
    path: 'customers',
    loadComponent: () =>
      import('./pages/customer-container/customer-container.component').then(
        (x) => x.CustomerContainerComponent
      ),
  },
];
