import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormTravelStepComponent } from './form-travel-step.component';
import { AddressService } from "../../shared/services/address.service";
import { provideAnimations } from "@angular/platform-browser/animations";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ITravelStep, ITravelStepFormData } from "../../shared/interfaces/travel.interface";
import { StepCategories } from "../../shared/enums/step-categories.enum";
import { of } from "rxjs";
import { IAddress } from "../../shared/interfaces/address.interface";

fdescribe('FormTravelStepComponent', () => {
  let component: FormTravelStepComponent;
  let fixture: ComponentFixture<FormTravelStepComponent>;
  let addressServiceSpy: jasmine.SpyObj<AddressService>;

  beforeEach(async () => {
    addressServiceSpy = jasmine.createSpyObj('AddressService', ['lookUp']);

    await TestBed.configureTestingModule({
      imports: [FormTravelStepComponent, ReactiveFormsModule],
      providers: [
        { provide: AddressService, useValue: addressServiceSpy },
        provideAnimations(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormTravelStepComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with expected controls', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['label']).toBeDefined();
    expect(component.form.controls['description']).toBeDefined();
    expect(component.form.controls['dateStart']).toBeDefined();
    expect(component.form.controls['dateEnd']).toBeDefined();
    expect(component.form.controls['category']).toBeDefined();
    expect(component.form.controls['locationAddress']).toBeDefined();
    expect(component.form.controls['location']).toBeDefined();
    expect(component.form.controls['location']).toBeInstanceOf(FormGroup);
    expect(component.form.controls['location']?.get('lng')).toBeDefined();
    expect(component.form.controls['location']?.get('lat')).toBeDefined();
  });

  it('should create a form with init value', () => {
    const dateStartFormatted = component['_formatDateLocalTime'](new Date());
    const dateEndFormatted = component['_formatDateLocalTime'](new Date());

    expect(component.form.controls['label'].value).toEqual('');
    expect(component.form.controls['description'].value).toEqual('');
    expect(component.form.controls['dateStart'].value).toEqual(dateStartFormatted);
    expect(component.form.controls['dateEnd'].value).toEqual(dateEndFormatted);
    expect(component.form.controls['category'].value).toEqual(null);
    expect(component.form.controls['locationAddress'].value).toEqual('');
    expect(component.form.controls['location']?.get('lng')?.value).toEqual(null);
    expect(component.form.controls['location']?.get('lat')?.value).toEqual(null);
  });

  it('should create form with @Input formData value', () => {
    const formDataMock: ITravelStep = {
      id: 1,
      index: 1,
      label: 'Rome',
      category: StepCategories.FLIGHT,
      description: 'Ma ma mia',
      location: {
        lat: 45,
        lng: 50
      },
      dateStart: new Date().toISOString(),
      dateEnd: new Date().toISOString(),
      createdDate: new Date(),
    };

    component.formData = formDataMock;
    fixture.detectChanges();

    const {
      label,
      description,
      category,
      dateStart,
      dateEnd,
      location
    } = formDataMock;
    const dateStartFormatted = component['_formatDateLocalTime'](dateStart);
    const dateEndFormatted = component['_formatDateLocalTime'](dateEnd);
    expect(component.form.controls['label'].value).toEqual(label);
    expect(component.form.controls['description'].value).toEqual(description);
    expect(component.form.controls['dateStart'].value).toEqual(dateStartFormatted);
    expect(component.form.controls['dateEnd'].value).toEqual(dateEndFormatted);
    expect(component.form.controls['category'].value).toEqual(category);
    expect(component.form.controls['locationAddress'].value).toEqual('');
    expect(component.form.controls['location']?.get('lng')?.value).toEqual(location.lng);
    expect(component.form.controls['location']?.get('lat')?.value).toEqual(location.lat);
  });

  it('should call onSubmitForm.emit() when form is submitted with valid data', () => {
    const mockFormData: ITravelStepFormData = {
      label: 'Test label',
      description: 'Test description',
      dateStart: '2022-01-01',
      dateEnd: '2022-01-05',
      category: StepCategories.FLIGHT,
      location: { lng: 0, lat: 0 }
    };

    spyOn(component.onSubmitForm, 'emit');
    component.form.patchValue(mockFormData);
    fixture.detectChanges();
    component.onSubmit();
    expect(component.onSubmitForm.emit).toHaveBeenCalledWith(mockFormData);
  });

  fit('should call addressService.lookUp() when locationAddress value changes', fakeAsync(() => {
    const mockAddressResult: IAddress[] = [];
    addressServiceSpy.lookUp.and.returnValue(of(mockAddressResult));
    const testAddress: string = 'Test_address';
    component.form.controls['locationAddress'].setValue(testAddress);
    fixture.detectChanges();
    tick(1000);
    expect(addressServiceSpy.lookUp).toHaveBeenCalledWith(testAddress);
    component.addresses$.subscribe((addresses) => {
      expect(addresses).toEqual(mockAddressResult);
    });
  }));

});
