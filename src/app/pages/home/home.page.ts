import { Component, computed, inject, Signal } from '@angular/core';
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
import { OverlayTravelDetailComponent } from "../../components/overlay-travel-detail/overlay-travel-detail.component";
import { bottomSheetAnimation } from "../../shared/animations";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { MatIconButton } from "@angular/material/button";
import { NavigationService } from "../../shared/services/navigation.service";

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
    OverlayTravelDetailComponent,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  animations: [bottomSheetAnimation]
})

export class HomePage {
  globalStateService = inject(GlobalStateService);
  travelStateService = inject(TravelStateService);
  mapService = inject(MapService);
  navigationService = inject(NavigationService);

  protected readonly Icons = Icons;

  markers: Signal<IMarker[]> = this.travelStateService.getMarkers();
  overlayTravelData: Signal<ITravel | null> = this.travelStateService.travel;
  isHomePage = this.globalStateService.select('isHomePage');
  isMobile = this.globalStateService.select('isMobile');
  displayOverlayTravel: Signal<boolean | null> = computed(() => this.overlayTravelData() && this.isMobile() && this.isHomePage())

  onSelectedAddress(address: IAddress): void {
    const { lat, lng } = address;
    const position: IGpsPosition = { lat, lng };
    this.mapService.addMarkerAndSetView(position);
  }

  clearTravelAndHisMarkers(): void {
    this.mapService.removeAllMarkers();
    this.travelStateService.reset();
  }

  backToTravelDetailPage(): void {
    this.navigationService.goUrl(`/travels/${this.overlayTravelData()?.id}`);
    this.clearTravelAndHisMarkers();
  }

}
