import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddTravelStepComponent } from './form-add-travel-step.component';

describe('FormAddTravelStepComponent', () => {
  let component: FormAddTravelStepComponent;
  let fixture: ComponentFixture<FormAddTravelStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddTravelStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAddTravelStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
