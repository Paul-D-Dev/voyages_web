import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTravelStepComponent } from './form-travel-step.component';
import { AddressService } from "../../shared/services/address.service";
import { provideAnimations } from "@angular/platform-browser/animations";

fdescribe('FormTravelStepComponent', () => {
  let component: FormTravelStepComponent;
  let fixture: ComponentFixture<FormTravelStepComponent>;
  let addressServiceSpy = jasmine.createSpyObj(AddressService, ['lookUp']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTravelStepComponent],
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
});
