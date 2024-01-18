import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FormTravelComponent } from "../../../components/form-travel/form-travel.component";
import { ITravelFormData } from "../../../shared/interfaces/travel.interface";


@Component({
  selector: 'app-add-travel',
  standalone: true,
  imports: [
    HeaderComponent,
    FormTravelComponent,
  ],
  templateUrl: './add-travel.page.html',
  styleUrl: './add-travel.page.scss'
})
export class AddTravelPage {

  onSave(formData: ITravelFormData) {
    console.log(formData);
  }

}
