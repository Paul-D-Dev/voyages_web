import { Component, inject, Input as InputRoute } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { Icons } from "../../../shared/enums/icons.enum";
import { TravelService } from "../../../shared/services/travel.service";
import { FormTravelStepComponent } from "../../../components/form-travel-step/form-travel-step.component";
import { ITravelStep, ITravelStepFormData } from "../../../shared/interfaces/travel.interface";
import { NavigationService } from "../../../shared/services/navigation.service";

@Component({
  selector: 'app-add-step',
  standalone: true,
  imports: [
    HeaderComponent,
    FormTravelStepComponent,
  ],
  templateUrl: './step-form.page.html',
  styleUrl: './step-form.page.scss'
})
export class StepFormPage {
  @InputRoute('id') idTravel?: string;
  @InputRoute() idStep?: string; // if step id means edit the step data

  travelService = inject(TravelService);
  navigationService = inject(NavigationService);

  tripStep: ITravelStep | undefined = undefined;
  protected readonly Icons = Icons;

  ngOnInit() {
    this.tripStep = this.travelService.getStep(+this.idTravel!, +this.idStep!);
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
