import { Component, inject } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { SearchAddressFormComponent } from "../../components/search-address-form/search-address-form.component";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { IAddress } from "../../shared/interfaces/address.interface";
import { AddressListComponent } from "../../components/address-list/address-list.component";
import { MapService } from "../../shared/services/map.service";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";
import { TravelStateService } from "../../shared/services/travel-state.service";
import { IMarker } from "../../shared/interfaces/marker.interface";
import { RouterOutlet } from "@angular/router";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapComponent,
    SearchAddressFormComponent,
    JsonPipe,
    AddressListComponent,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  globalStateService = inject(GlobalStateService);
  searchFocused = inject(GlobalStateService).select("isSearchFocused");
  isHomePage = this.globalStateService.select("isHomePage");
  travelStateService = inject(TravelStateService);
  mapService = inject(MapService);

  addressList: IAddress[] = [];
  markers: IMarker[] | undefined = this.travelStateService.getMarkers();
  isTravelRoute$: Observable<boolean> = of(true);


  getLookupAddress(addresses: IAddress[]) {
    this.addressList = addresses;
  }

  onSelectedAddress(address: IAddress): void {
    const { lat, lng } = address;
    const position: IGpsPosition = { lat, lng };
    this.globalStateService.set("isSearchFocused", false);
    this.mapService.addMarkerAndSetView(position);
  }

  closeSearchPanel() {
    this.globalStateService.set("isSearchFocused", false);
  }
}
