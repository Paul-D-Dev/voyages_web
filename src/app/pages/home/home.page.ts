import { Component, inject } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { SearchAddressFormComponent } from "../../components/search-address-form/search-address-form.component";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { JsonPipe } from "@angular/common";
import { IAddress } from "../../shared/interfaces/address.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    SearchAddressFormComponent,
    JsonPipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  searchFocused = inject(GlobalStateService).select("isSearchFocused");
  addressList: IAddress[] = [];

  getLookupAddress(addresses: IAddress[]) {
    this.addressList = addresses;
  }
}
