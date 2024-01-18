import { Routes } from '@angular/router';
import { HomePage } from "./pages/home/home.page";
import { TravelsPage } from "./pages/travels/travels.page";
import { AddTravelPage } from "./pages/travels/add-travel/add-travel.page";

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'travels',
    component: TravelsPage
  },
  {
    path: 'travels/add',
    component: AddTravelPage
  }
];
