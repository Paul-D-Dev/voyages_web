import { Component, inject } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { SearchAddressFormComponent } from "../../components/search-address-form/search-address-form.component";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { JsonPipe } from "@angular/common";
import { IAddress } from "../../shared/interfaces/address.interface";
import { AddressListComponent } from "../../components/address-list/address-list.component";
import { MapService } from "../../shared/services/map.service";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    SearchAddressFormComponent,
    JsonPipe,
    AddressListComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  globalStateService = inject(GlobalStateService);
  searchFocused = inject(GlobalStateService).select("isSearchFocused");
  addressList: IAddress[] = [];
  mapService = inject(MapService);

  getLookupAddress(addresses: IAddress[]) {
    this.addressList = addresses;
  }

  onSelectedAddress(address: IAddress): void {
    const { lat, lng } = address;
    const position: IGpsPosition = { lat, lng };
    this.globalStateService.set("isSearchFocused", false);
    this.mapService.addMarker(position);
    this.mapService.setView(position);
  }
}
