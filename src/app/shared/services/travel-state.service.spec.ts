import { TestBed } from '@angular/core/testing';
import { TravelStateService } from './travel-state.service';


describe('TravelStateService', () => {
  let service: TravelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
