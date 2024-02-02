import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Icons } from "../../shared/enums/icons.enum";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { ITravelStep, ITravelStepFormData } from "../../shared/interfaces/travel.interface";
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
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from "@angular/common";
import { MatSelect } from "@angular/material/select";
import { StepCategories } from "../../shared/enums/step-categories.enum";

@Component({
  selector: 'app-form-travel-step',
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
    AsyncPipe,
    MatSelect,
    TitleCasePipe,
    KeyValuePipe
  ],
  templateUrl: './form-travel-step.component.html',
  styleUrl: './form-travel-step.component.scss'
})

// TODO Rename class FormManageTravelStep
export class FormTravelStepComponent {
  @Input() set formData(data: ITravelStep | undefined) {
    if (!data) return;
    this._stepData = data;
  }

  @Output() onSubmitForm = new EventEmitter<ITravelStepFormData>;

  private readonly addressService = inject(AddressService);
  private readonly fb = inject(FormBuilder);
  protected readonly Icons = Icons;
  protected readonly Categories = StepCategories;
  addresses$: Observable<IAddress[]> = of([]);
  isDisplayedLocationInput = false;

  // TODO complete FormGroup type
  form!: FormGroup;
  private _stepData: ITravelStepFormData = {
    label: '',
    category: null,
    dateStart: this._formatDateLocalTime(new Date().toISOString()),
    dateEnd: this._formatDateLocalTime(new Date().toISOString()),
    location: {} as IGpsPosition
  };

  ngOnInit() {
    this.form = this.fb.group({
      label: [this._stepData.label, { validators: [Validators.required] }],
      description: [this._stepData.description],
      dateStart: [this._stepData.dateStart, { validators: [Validators.required] }],
      dateEnd: [this._stepData.dateEnd, { validators: [Validators.required] }],
      category: [this._stepData.category],
      locationAddress: [''],
      location: this.fb.group({
        lng: [this._stepData.location.lng, { validators: [Validators.required] }],
        lat: [this._stepData.location.lat, { validators: [Validators.required] }]
      })
    });

    this.addresses$ = this.form.controls['locationAddress'].valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      switchMap((value) => this.addressService.lookUp(value)),
    );
  }

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

  private _formatDateLocalTime(dateIsoString: string): string {
    return dateIsoString.substring(0, 16);
  }
}
