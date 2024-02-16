import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTravelComponent } from './form-travel.component';
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ITravelFormData } from "../../shared/interfaces/travel.interface";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatFormFieldHarness } from "@angular/material/form-field/testing";
import { MatInputHarness } from "@angular/material/input/testing";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatIconHarness } from "@angular/material/icon/testing";
import { Icons } from "../../shared/enums/icons.enum";

fdescribe('FormTravelComponent', () => {
  let component: FormTravelComponent;
  let fixture: ComponentFixture<FormTravelComponent>;
  let loader: HarnessLoader;

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
    loader = TestbedHarnessEnvironment.loader(fixture);
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

    it('should have 2 form fields', async () => {
      const fields = await loader.getAllHarnesses(MatFormFieldHarness);
      expect(fields).toHaveSize(2);
    });

    // TODO describe input travel name
    it('should input travel name', async () => {
      const travelNameFields = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Travel name' }));
      expect(travelNameFields).toBeTruthy();
      expect(await travelNameFields.getLabel()).toEqual('Travel name');
      const matInput = await travelNameFields.getControl(MatInputHarness);
      if (matInput) {
        expect(matInput).toBeTruthy();
        expect(await matInput.isRequired()).toBeTrue();
        expect(await matInput.getType()).toEqual('text');
      }
    });

    // TODO describe input date range
    it('should date range input', async () => {
      const field = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Set the date' }));
      expect(field).toBeTruthy();
      // TODO date range input

      expect(await field.getTextHints()).toEqual(['MM/DD/YYYY – MM/DD/YYYY']);
    });

    describe('submit button', () => {
      let matButton: MatButtonHarness;

      beforeEach(async () => {
        matButton = await loader.getHarness(MatButtonHarness.with({ variant: 'mini-fab' }));
      });

      it('should create', async () => {
        expect(matButton).toBeTruthy();
      });

      it('should trigger onSubmit method when clicked', async () => {
        await matButton.click();
        const onSubmitSpy = spyOn(component, 'onSubmit');
        await matButton.click();
        expect(onSubmitSpy).toHaveBeenCalledTimes(1);
      });

      it('should content a mat-icon with arrow_forward', async () => {
        const matIcon = await matButton.getHarnessOrNull(MatIconHarness);
        expect(matIcon).toBeTruthy();
        expect(await matIcon?.getName()).toContain(Icons.ARROW_FORWARD);
      });

    });


  });
});
