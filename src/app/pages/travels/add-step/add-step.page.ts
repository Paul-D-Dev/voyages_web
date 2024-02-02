import { Component, inject, Input as InputRoute } from '@angular/core';
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
    FormAddTravelStepComponent,
  ],
  templateUrl: './add-step.page.html',
  styleUrl: './add-step.page.scss'
})
export class AddStepPage {
  @InputRoute('id') idTravel?: string;
  @InputRoute('stepId') idStep?: string; // if step id means edit the step data

  travelService = inject(TravelService);
  navigationService = inject(NavigationService);

  tripStepData: ITravelStepFormData | undefined = undefined;
  protected readonly Icons = Icons;

  ngOnInit() {
    this.tripStepData = this.travelService.getStep(+this.idTravel!, +this.idStep!);
  }


  onSubmit(formData: ITravelStepFormData): void {
    if (this.idTravel) {
      if (this.idStep) {
        this.travelService.editStep(formData, +this.idTravel, +this.idStep);
      } else {
        this.travelService.addStep(formData, +this.idTravel);
      }
    }

    this.navigationService.back();
  }
}
