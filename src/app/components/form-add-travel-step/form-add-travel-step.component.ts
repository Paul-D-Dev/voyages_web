import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Icons } from "../../shared/enums/icons.enum";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import { MatFormField, MatHint, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatMiniFabButton } from "@angular/material/button";
import { ITravelStepFormData } from "../../shared/interfaces/travel.interface";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";

@Component({
  selector: 'app-form-add-travel-step',
  standalone: true,
  imports: [
    FormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatStartDate,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './form-add-travel-step.component.html',
  styleUrl: './form-add-travel-step.component.scss'
})
export class FormAddTravelStepComponent {
  @Input() formData: ITravelStepFormData = {
    label: '',
    category: '',
    dateStart: new Date(''),
    dateEnd: new Date(''),
    location: {} as IGpsPosition
  };
  @Output() onSubmitForm = new EventEmitter<ITravelStepFormData>;

  protected readonly Icons = Icons;
  readonly fb = inject(FormBuilder);

  // TODO complete FormGroup type
  form: FormGroup = this.fb.group({
    label: new FormControl(this.formData.label),
    description: new FormControl(this.formData.description),
    dateStart: new FormControl(this.formData.dateStart),
    dateEnd: new FormControl(this.formData.dateEnd),
    category: new FormControl(this.formData.category),
    location: new FormGroup({
      lng: new FormControl(this.formData.location.lng),
      lat: new FormControl(this.formData.location.lat)
    })
  });

  onSubmit() {
    console.log('onCLick submit button');
    if (this.form.valid) {
      const values = this.form.getRawValue();
      console.log(values);
      this.onSubmitForm.emit(values);
    }
  }
}
