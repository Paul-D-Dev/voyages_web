import { Component, computed, EventEmitter, inject, Output, Signal, signal, WritableSignal } from '@angular/core';
import { SearchAddressFormComponent } from "../search-address-form/search-address-form.component";
import { AddressListComponent } from "../address-list/address-list.component";
import { IAddress } from "../../shared/interfaces/address.interface";
import { GlobalStateService } from "../../shared/services/global-state.service";

@Component({
  selector: 'app-omnibox-search',
  standalone: true,
  imports: [
    SearchAddressFormComponent,
    AddressListComponent
  ],
  templateUrl: './omnibox-search.component.html',
  styleUrl: './omnibox-search.component.scss'
})
export class OmniboxSearchComponent {
  @Output() selectAddress = new EventEmitter<IAddress>();

  globalStateService = inject(GlobalStateService);
  searchFocused = this.globalStateService.select("isSearchFocused");
  addressList: WritableSignal<IAddress[]> = signal([]);
  isOmniboxActive: Signal<boolean> = computed(() => this.addressList().length > 0 && this.searchFocused());

  getLookupAddress(addresses: IAddress[]) {
    this.addressList.set(addresses);
  }

  onSelectedAddress(address: IAddress): void {
    this.globalStateService.set("isSearchFocused", false);
    this.selectAddress.emit(address);
  }

  closeSearchPanel() {
    this.globalStateService.set("isSearchFocused", false);
  }

  protected readonly length = length;
}
