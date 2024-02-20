import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelFormPage } from './travel-form.page';

describe('TravelFormPage', () => {
  let component: TravelFormPage;
  let fixture: ComponentFixture<TravelFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelFormPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TravelFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
