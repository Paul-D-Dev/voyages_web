import { Component, inject, Input as InputRoute, numberAttribute } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FormTravelComponent } from "../../../components/form-travel/form-travel.component";
import { ITravel, ITravelFormData } from "../../../shared/interfaces/travel.interface";
import { TravelService } from "../../../shared/services/travel.service";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ActivatedRoute } from "@angular/router";
import { convertTravelToFormData } from "../../../shared/utils";

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
  @InputRoute({ transform: numberAttribute }) idTravel!: number;
  travelService = inject(TravelService);
  navigationService = inject(NavigationService);
  isEdit: boolean = inject(ActivatedRoute).snapshot.url.map(url => url.path).includes('edit');
  formData: ITravelFormData | undefined;
  travel: ITravel | undefined;

  ngOnInit() {
    if (this.isEdit && !!this.idTravel) {
      this.travel = this.travelService.getById(this.idTravel);
      this.formData = convertTravelToFormData(this.travel);
    } else {
      // TODO somehow redirect to 404 page
    }
  };

  onSave(formData: ITravelFormData) {
    if (this.isEdit && !!this.travel) {
      this.travelService.update(formData, this.travel.id);
    } else {
      this.travelService.add(formData);
    }
    this.navigationService.go(['/travels']);
  }

}
