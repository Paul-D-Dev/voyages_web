import { Routes } from '@angular/router';
import { HomePage } from "./pages/home/home.page";

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'travels',
    loadChildren: () => import('./pages/travels/travel.route').then(m => m.travelRoutes)
  },
];
