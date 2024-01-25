import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDetailPage } from './travel-detail.page';

describe('TravelDetailPage', () => {
  let component: TravelDetailPage;
  let fixture: ComponentFixture<TravelDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelDetailPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
