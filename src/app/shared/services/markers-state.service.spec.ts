import { TestBed } from '@angular/core/testing';

import { MarkersStateService } from './markers-state.service';

describe('MarkersStateService', () => {
  let service: MarkersStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkersStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
