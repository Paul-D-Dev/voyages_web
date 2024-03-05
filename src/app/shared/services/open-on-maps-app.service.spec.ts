import { TestBed } from '@angular/core/testing';
import { OpenOnMapsAppService } from './open-on-maps-app.service';

describe('ViewMapsAppService', () => {
  let service: OpenOnMapsAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenOnMapsAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
