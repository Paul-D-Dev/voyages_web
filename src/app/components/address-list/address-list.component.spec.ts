import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressListComponent } from './address-list.component';
import { IAddress } from "../../shared/interfaces/address.interface";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

fdescribe('AddressItemComponent', () => {
  let component: AddressListComponent;
  let fixture: ComponentFixture<AddressListComponent>;
  let mockAddressList: IAddress[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressListComponent]
    }).compileComponents();

    mockAddressList = [
      {
        id: 1,
        fullAddress: '123 Main St, Anytown, USA',
        label: 'Home',
        type: 'Residential',
        lat: 123.456,
        lng: -78.901,
        boundingBox: ['40.7128', '-74.0060', '40.7128', '-74.0060'],
        addressDetail: {
          houseNumber: '123',
          road: 'Main St',
          city: 'Anytown',
          postcode: '12345',
          country: 'USA',
          state: 'NY',
          countryCode: 'US'
        }
      }];

    fixture = TestBed.createComponent(AddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty address list by default', () => {
    expect(component.addressList).toEqual([]);
    const addressItems = fixture.debugElement.queryAll(By.css('li.address-item'));
    expect(addressItems.length).toBe(0);
  });

  describe('addressList input got value', () => {
    beforeEach(() => {
      component.addressList = mockAddressList;
      fixture.detectChanges();
    });

    afterAll(() => {
      component.addressList = [];
    });

    it('should render address list items with labels if provided', () => {
      const addressItems = fixture.debugElement.queryAll(By.css('li.address-item'));
      expect(addressItems.length).toBe(mockAddressList.length);
      addressItems.forEach((item: DebugElement, index: number) => {
        const address = mockAddressList[index];
        const itemEl = item.nativeElement;
        if (address.label) {
          expect(itemEl.textContent).toContain(address.label);
        } else {
          expect(itemEl.textContent).toContain(address.addressDetail.houseNumber);
          expect(itemEl.textContent).toContain(address.addressDetail.road);
        }
      });
    });

    it('should emit selectAddress event when an address is clicked', () => {
      const selectAddressSpy = spyOn(component.selectAddress, 'emit');
      const addressItems: DebugElement[] = fixture.debugElement.queryAll(By.css('li.address-item'));
      addressItems[0].triggerEventHandler('click');
      expect(selectAddressSpy).toHaveBeenCalledWith(mockAddressList[0]);
    });

    it('should emit selectAddress event when an address is pressed by key enter', () => {
      const selectAddressSpy = spyOn(component.selectAddress, 'emit');
      const addressItems: DebugElement[] = fixture.debugElement.queryAll(By.css('li.address-item'));
      addressItems[0].triggerEventHandler('keydown.enter');
      expect(selectAddressSpy).toHaveBeenCalledWith(mockAddressList[0]);
    });
  });


});
