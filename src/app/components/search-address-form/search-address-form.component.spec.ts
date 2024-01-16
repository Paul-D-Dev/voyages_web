import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddressFormComponent } from './search-address-form.component';

describe('SearchAddressFormComponent', () => {
  let component: SearchAddressFormComponent;
  let fixture: ComponentFixture<SearchAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAddressFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
