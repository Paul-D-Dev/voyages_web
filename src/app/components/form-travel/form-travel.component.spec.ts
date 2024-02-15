import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTravelComponent } from './form-travel.component';
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ITravelFormData } from "../../shared/interfaces/travel.interface";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

fdescribe('FormTravelComponent', () => {
  let component: FormTravelComponent;
  let fixture: ComponentFixture<FormTravelComponent>;
  const mockFormData: ITravelFormData = {
    name: 'Paris',
    dateStart: '2024-01-28T00:00:00.000Z',
    dateEnd: '2024-01-29T00:00:00.000Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTravelComponent, FormsModule, ReactiveFormsModule],
      providers: [
        provideMomentDateAdapter(undefined, { useUtc: true }),
        provideAnimations(),
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(FormTravelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create form with default formData', () => {
    fixture.detectChanges();
    expect(component.form.getRawValue()).toEqual(component.formData);
  });

  it('should create form with @input formData provided', () => {
    component.formData = mockFormData;
    fixture.detectChanges();
    expect(component.form.getRawValue()).toEqual(component.formData);
  });

  it('should emit value if formData is provided by parent', () => {
    component.formData = mockFormData;
    fixture.detectChanges();
    const onSubmitFormSpy = spyOn(component.onSubmitForm, 'emit');
    component.onSubmit();
    expect(component.form.valid).toBeTrue();
    expect(onSubmitFormSpy).toHaveBeenCalledWith(mockFormData);
  });

  describe('component initialized', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not emit value form if form is invalid', () => {
      const onSubmitFormSpy = spyOn(component.onSubmitForm, 'emit');
      component.onSubmit();
      expect(component.form.invalid).toBeTrue();
      expect(onSubmitFormSpy).not.toHaveBeenCalled();
    });

    it('should emit value form if form is valid', () => {
      const onSubmitFormSpy = spyOn(component.onSubmitForm, 'emit');
      component.form.setValue(mockFormData);
      fixture.detectChanges();
      component.onSubmit();
      expect(component.form.valid).toBeTrue();
      expect(onSubmitFormSpy).toHaveBeenCalledWith(mockFormData);
    });

  });

  fdescribe('ui', () => {
    let formDe: DebugElement;

    // it('should display input formData provided by parent', () => {
    //   component.formData = mockFormData;
    //   fixture.detectChanges();
    // });

    beforeEach(() => {
      fixture.detectChanges();
      formDe = fixture.debugElement.query(By.css('form'));
    });

    it('should create form template', () => {
      expect(formDe).toBeTruthy();
    });

    it('form should have classList', () => {
      expect(formDe.nativeElement).toHaveClass('travel-form');
      expect(formDe.nativeElement).toHaveClass('form');
    });
  });
});
