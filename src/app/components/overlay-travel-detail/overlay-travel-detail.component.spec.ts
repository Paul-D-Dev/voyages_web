import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayTravelDetailComponent } from './overlay-travel-detail.component';

describe('OverlayTravelDetailComponent', () => {
  let component: OverlayTravelDetailComponent;
  let fixture: ComponentFixture<OverlayTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayTravelDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
