import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFormPage } from './step-form.page';

describe('StepFormPage', () => {
  let component: StepFormPage;
  let fixture: ComponentFixture<StepFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepFormPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
