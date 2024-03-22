import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchAddressFormComponent } from './search-address-form.component';
import { AddressService } from "../../shared/services/address.service";
import { provideHttpClient } from "@angular/common/http";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { Icons } from "../../shared/enums/icons.enum";
import { IAddress } from "../../shared/interfaces/address.interface";
import { of } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { jest } from '@jest/globals';


describe('SearchAddressFormComponent', () => {
  let component: SearchAddressFormComponent;
  let fixture: ComponentFixture<SearchAddressFormComponent>;
  let addressServiceSpy: any;
  let globalStateServiceSpy: { set: jest.Mock };

  beforeEach(async () => {
    addressServiceSpy = {
      lookUp: jest.fn()
    };

    globalStateServiceSpy = {
      set: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SearchAddressFormComponent],
      providers: [
        { provide: AddressService, useValue: addressServiceSpy },
        { provide: GlobalStateService, useValue: globalStateServiceSpy },
        provideHttpClient()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSearchFocused to true when onFocused() is called', () => {
    component.searchIsFocused = false;
    component.onFocused();
    expect(globalStateServiceSpy.set).toHaveBeenCalledWith('isSearchFocused', true);
  });

  it('should not set isSearchFocused when onFocused() is called and searchIsFocused is true', () => {
    component.searchIsFocused = true;
    component.onFocused();
    expect(globalStateServiceSpy.set).not.toHaveBeenCalled();
  });

  it('should set isSearchFocused to false when backNav() is called', () => {
    component.searchIsFocused = true;
    component.backNav();
    expect(globalStateServiceSpy.set).toHaveBeenCalledWith('isSearchFocused', false);
  });

  it('should not set isSearchFocused when backNav() is called and searchIsFocused is false', () => {
    component.searchIsFocused = false;
    component.backNav();
    expect(globalStateServiceSpy.set).not.toHaveBeenCalled();
  });

  it('should emit address result when search value changes', fakeAsync(() => {
    const addressResultSpy = jest.spyOn(component.addressResult, 'emit');
    const mockAddresses: IAddress[] = [];
    jest.spyOn(addressServiceSpy, 'lookUp').mockReturnValue(of(mockAddresses));
    const query = 'test';

    component.searchValue.setValue(query);
    tick(1000);
    fixture.detectChanges();
    expect(addressServiceSpy.lookUp).toBeCalledTimes(1);
    expect(addressServiceSpy.lookUp).toHaveBeenCalledWith('test');
    expect(addressResultSpy).toHaveBeenCalledWith(mockAddresses);
  }));

  describe('ui', () => {
    let formDe: DebugElement;
    const getFormDe = () => fixture.debugElement.query(By.css('form.form-search-address'));
    it('should create a form', () => {
      formDe = getFormDe();
      expect(formDe.nativeElement).toBeTruthy();
      const formChildren = formDe.children;
      expect(formChildren.length).toBe(1);
      expect(formChildren[0].name).toBe('input');
    });

    it('should call backNav method when button is clicked', () => {
      jest.spyOn(component, 'backNav');
      const buttonDe = fixture.debugElement.query(By.css('button'));
      buttonDe.triggerEventHandler('click');
      expect(component.backNav).toHaveBeenCalled();
    });

    it('should create input', () => {
      const inputDe = fixture.debugElement.query(By.css('input'));
      expect(inputDe).toBeTruthy();
      const inputEl = inputDe.nativeElement;
      expect(inputEl.classList).toContain('search');
      expect(inputEl.type).toBe('search');
      expect(inputEl.getAttribute('placeholder')).toBe('Search');
    });

    it('should call onFocused method when input is focused', () => {
      jest.spyOn(component, 'onFocused');
      const inputDe = fixture.debugElement.query(By.css('.search'));
      inputDe.triggerEventHandler('focus');
      expect(component.onFocused).toHaveBeenCalled();
    });

    describe('case: searchIsFocused is false', () => {
      beforeEach(() => {
        component.searchIsFocused = false;
        fixture.detectChanges();
        formDe = getFormDe();
      });

      it('mat-icon should display location_on icon', () => {
        const iconDe = fixture.debugElement.query(By.css('mat-icon'));
        expect(iconDe).toBeTruthy();
        expect(iconDe.nativeElement.textContent).toContain(Icons.LOCATION_ON);
      });
    });

    describe('case: searchIsFocused is true', () => {
      beforeEach(() => {
        component.searchIsFocused = true;
        fixture.detectChanges();
        formDe = getFormDe();
      });


      it('mat-icon should display arrow_back icon', () => {
        const iconDe = fixture.debugElement.query(By.css('mat-icon'));
        expect(iconDe).toBeTruthy();
        expect(iconDe.nativeElement.textContent).toContain(Icons.ARROW_BACK);
      });
    });

  });
});
