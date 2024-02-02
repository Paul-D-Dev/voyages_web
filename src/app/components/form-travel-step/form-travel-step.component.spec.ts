import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTravelStepComponent } from './form-travel-step.component';

describe('FormTravelStepComponent', () => {
  let component: FormTravelStepComponent;
  let fixture: ComponentFixture<FormTravelStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTravelStepComponent]
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
