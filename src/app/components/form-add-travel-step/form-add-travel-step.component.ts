import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Icons } from "../../shared/enums/icons.enum";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import { debounceTime, Observable, of, startWith, switchMap } from "rxjs";
import { AddressService } from "../../shared/services/address.service";
import { IAddress } from "../../shared/interfaces/address.interface";
import { AsyncPipe } from "@angular/common";

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
    ReactiveFormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    AsyncPipe
  ],
  templateUrl: './form-add-travel-step.component.html',
  styleUrl: './form-add-travel-step.component.scss'
})
export class FormAddTravelStepComponent {

  constructor(private addressService: AddressService) {
    // TODO fix when select option from it retrigger lookup
    this.addresses$ = this.form.controls['locationAddress'].valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((value) => this.addressService.lookUp(value)),
    );
  }

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
  addresses$: Observable<IAddress[]> = of([]);
  isDisplayedLocationInput = false;

  // TODO complete FormGroup type
  form: FormGroup = this.fb.group({
    label: [this.formData.label],
    description: [this.formData.description],
    dateStart: [this.formData.dateStart],
    dateEnd: [this.formData.dateEnd],
    category: [this.formData.category],
    locationAddress: [''],
    location: this.fb.group({
      lng: [this.formData.location.lng],
      lat: [this.formData.location.lat]
    })
  });

  displayFn(address: IAddress): string {
    return address && address.label ? address.label : '';
  }

  onOptionAddressSelected(ev: MatAutocompleteSelectedEvent) {
    console.log(this.form.controls['locationAddress']);
    const address: IAddress = ev.option.value;
    this.form.patchValue({
      locationAddress: '',
      location: {
        lng: address.lng,
        lat: address.lat
      }
    });
    this.toggleDisplayLocationInput();
  }

  toggleDisplayLocationInput() {
    this.isDisplayedLocationInput = !this.isDisplayedLocationInput;
  }

  onSubmit() {
    console.log('onCLick submit button');
    if (this.form.valid) {
      const values = this.form.getRawValue();
      console.log(values);
      this.onSubmitForm.emit(values);
    }
  }
}
