import { Component, inject, Signal } from '@angular/core';
import { MapComponent } from "../../components/map/map.component";
import { SearchAddressFormComponent } from "../../components/search-address-form/search-address-form.component";
import { GlobalStateService } from "../../shared/services/global-state.service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { AddressListComponent } from "../../components/address-list/address-list.component";
import { MapService } from "../../shared/services/map.service";
import { TravelStateService } from "../../shared/services/travel-state.service";
import { IMarker } from "../../shared/interfaces/marker.interface";
import { RouterOutlet } from "@angular/router";
import { OmniboxSearchComponent } from "../../components/omnibox-search/omnibox-search.component";
import { IAddress } from "../../shared/interfaces/address.interface";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";

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
    OmniboxSearchComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  globalStateService = inject(GlobalStateService);
  isHomePage = this.globalStateService.select("isHomePage");
  travelStateService = inject(TravelStateService);
  mapService = inject(MapService);

  markers: Signal<IMarker[]> = this.travelStateService.getMarkers();

  onSelectedAddress(address: IAddress): void {
    const { lat, lng } = address;
    const position: IGpsPosition = { lat, lng };
    this.mapService.addMarkerAndSetView(position);
  }

}
