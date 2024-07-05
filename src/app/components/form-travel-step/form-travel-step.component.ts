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
import { MatButton, MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { ITravelDocument, ITravelStep, ITravelStepFormData } from "../../shared/interfaces/travel.interface";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import { debounceTime, Observable, of, startWith, switchMap } from "rxjs";
import { AddressService } from "../../shared/services/address.service";
import { AsyncPipe, KeyValuePipe, TitleCasePipe } from "@angular/common";
import { MatSelect } from "@angular/material/select";
import { StepCategories } from "../../shared/enums/step-categories.enum";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FileUploadDialogComponent } from "../dialogs/file-upload-dialog/file-upload-dialog.component";
import { DocumentListComponent } from "../document-list/document-list.component";

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
    KeyValuePipe,
    MatIconButton,
    MatDialogModule,
    MatButton,
    DocumentListComponent,
  ],
  templateUrl: './form-travel-step.component.html',
  styleUrl: './form-travel-step.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('void', style({
        height: 0,
        opacity: 0
      })),
      transition(':enter', [
        animate('150ms ease-out', style({
          height: '*',
          opacity: 1
        })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({
          height: 0,
          opacity: 0
        }))
      ])
    ])
  ]
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
  private readonly dialog = inject(MatDialog);
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
    location: {} as IGpsPosition,
    documents: []
  };

  // Create a getter for the documents form control
  get documents() {
    return this.form.controls['documents'];
  }

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
      }),
      documents: [this._stepData.documents],
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

  openDialogToAddDocument() {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((uploadedDocument: ITravelDocument) => {
      if (uploadedDocument) {
        const currentDocuments: ITravelDocument[] = this.documents.value as ITravelDocument[];
        console.log(uploadedDocument)
        this.documents.setValue([...currentDocuments, uploadedDocument]);
      }
    });
  }

  removeDocument(index: number): void {
    const currentDocuments: ITravelDocument[] = this.documents.getRawValue();
    currentDocuments.splice(index, 1);
    this.documents.patchValue([...currentDocuments]);
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
