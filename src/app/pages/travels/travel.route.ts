import { Routes } from "@angular/router";
import { TravelsPage } from "./travels.page";
import { TravelDetailPage } from "./travel-detail/travel-detail.page";
import { AddTravelPage } from "./add-travel/add-travel.page";
import { AddStepPage } from "./add-step/add-step.page";

export const travelRoutes: Routes = [
  {
    path: '',
    component: TravelsPage,
  },
  {
    path: 'add',
    component: AddTravelPage
  },
  {
    path: ':id',
    component: TravelDetailPage
  },
  {
    path: ':id/add-step',
    component: AddStepPage,
  },
];
