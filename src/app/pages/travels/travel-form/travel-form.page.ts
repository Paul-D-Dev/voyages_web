import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FormTravelComponent } from "../../../components/form-travel/form-travel.component";
import { ITravelFormData } from "../../../shared/interfaces/travel.interface";
import { TravelService } from "../../../shared/services/travel.service";
import { NavigationService } from "../../../shared/services/navigation.service";

@Component({
  selector: 'app-add-travel',
  standalone: true,
  imports: [
    HeaderComponent,
    FormTravelComponent,
  ],
  templateUrl: './travel-form.page.html',
  styleUrl: './travel-form.page.scss'
})
export class TravelFormPage {
  travelService = inject(TravelService);
  navigationService = inject(NavigationService);

  onSave(formData: ITravelFormData) {
    console.log(formData);
    this.travelService.add(formData);
    this.navigationService.go(['/travels']);
  }

}
