import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ITravelFormData } from "../../shared/interfaces/travel-form-data.interface";


@Component({
  selector: 'app-form-travel',
  standalone: true,
  imports: [
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
  templateUrl: './form-travel.component.html',
  styleUrl: './form-travel.component.scss'
})

export class FormTravelComponent {
  @Input() formData: ITravelFormData = {
    name: '',
    dateStart: new Date(''),
    dateEnd: new Date('')
  };
  @Output() onSubmitForm = new EventEmitter<ITravelFormData>;

  readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
      name: new FormControl(this.formData.name),
      dateStart: new FormControl(this.formData.dateStart),
      dateEnd: new FormControl(this.formData.dateEnd),
    }
  );

  onSubmit() {
    console.log('onCLick submit button');
    if (this.form.valid) {
      const values = this.form.getRawValue();
      console.log('FormTravelComponent form values:', values);
      this.onSubmitForm.emit(values);
    }
  }
}
