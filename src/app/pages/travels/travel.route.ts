import { Routes } from "@angular/router";
import { TravelsPage } from "./travels.page";
import { TravelDetailPage } from "./travel-detail/travel-detail.page";
import { TravelFormPage } from "./travel-form/travel-form.page";
import { StepFormPage } from "./step-form/step-form.page";

// base "travels/"
export const travelRoutes: Routes = [
  {
    path: '',
    component: TravelsPage,
  },
  {
    path: 'add',
    component: TravelFormPage
  },
  {
    path: 'edit/:idTravel',
    component: TravelFormPage
  },
  {
    path: ':id',
    component: TravelDetailPage
  },
  {
    path: ':id/add-step',
    component: StepFormPage,
  },
  {
    path: ':id/edit-step/:idStep',
    component: StepFormPage
  },
];
