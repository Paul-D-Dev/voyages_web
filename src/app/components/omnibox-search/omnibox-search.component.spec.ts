import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniboxSearchComponent } from './omnibox-search.component';

describe('OmniboxSearchComponent', () => {
  let component: OmniboxSearchComponent;
  let fixture: ComponentFixture<OmniboxSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmniboxSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OmniboxSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
