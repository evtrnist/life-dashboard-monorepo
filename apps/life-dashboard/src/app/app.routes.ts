import { Route } from '@angular/router';
import { KnownPath } from '@life-dashboard/known-path';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: KnownPath.Dashboard,
    pathMatch: 'full',
  },
  {
    path: KnownPath.Dashboard,
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (component) => component.DashboardComponent
      ),
  },
];
