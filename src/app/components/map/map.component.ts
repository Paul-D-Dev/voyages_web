import { Component, inject, Input, OnInit } from '@angular/core';
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";
import { MapService } from "../../shared/services/map.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @Input() initPosition: IGpsPosition | undefined;
  @Input() markers: IGpsPosition[] | undefined;
  @Input() isMarker: boolean = false;
  private _mapService = inject(MapService);

  ngOnInit() {
    // TODO when mapDataRoute provide value to initPosition add marker / or setView
    this._mapService.initMap(this.initPosition);
    this._mapService.initMapHandlers();
    this.showMarkers(this.markers);
  }

  // TODO fix addMarker not display in the right on the map
  protected showMarkers(markers: IGpsPosition[] | undefined): void {
    if (markers !== undefined && markers !== null && markers.length > 0) {
      markers.forEach(marker => {
        this._mapService.addMarker(marker);
      });
    }
  }


}
