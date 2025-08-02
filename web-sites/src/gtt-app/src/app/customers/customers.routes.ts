import { Routes } from '@angular/router';

export const customerRoutes: Routes = [
  {
    path: 'customers',
    loadComponent: () =>
      import('./customer-list/customer-list.component').then(
        (x) => x.CustomerListComponent
      ),
  },
  {
    path: 'customers/new',
    loadComponent: () =>
      import('./customer-form/customer-form.component').then(
        (x) => x.CustomerFormComponent
      ),
  },
  {
    path: 'customers/:id',
    loadComponent: () =>
      import('./customer-detail/customer-detail.component').then(
        (x) => x.CustomerDetailComponent
      ),
  },
];
