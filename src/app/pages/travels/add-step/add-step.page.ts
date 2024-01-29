import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { Icons } from "../../../shared/enums/icons.enum";
import { TravelService } from "../../../shared/services/travel.service";
import { FormAddTravelStepComponent } from "../../../components/form-add-travel-step/form-add-travel-step.component";
import { ITravelStepFormData } from "../../../shared/interfaces/travel.interface";
import { NavigationService } from "../../../shared/services/navigation.service";

@Component({
  selector: 'app-add-step',
  standalone: true,
  imports: [
    HeaderComponent,
    FormAddTravelStepComponent
  ],
  templateUrl: './add-step.page.html',
  styleUrl: './add-step.page.scss'
})
export class AddStepPage {
  travelService = inject(TravelService);
  navigationService = inject(NavigationService);
  @Input('id') travelId?: string;
  protected readonly Icons = Icons;


  onSubmit(formData: ITravelStepFormData): void {
    console.log(this.travelId);
    if (this.travelId) {
      this.travelService.addStep(formData, +this.travelId);
      // if ok
      this.navigationService.back();
    }

  }
}
