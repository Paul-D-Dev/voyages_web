import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepPage } from './add-step.page';

describe('AddStepPage', () => {
  let component: AddStepPage;
  let fixture: ComponentFixture<AddStepPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStepPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
