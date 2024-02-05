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
  private _mapService = inject(MapService);
  @Input() markers: IGpsPosition[] | undefined;

  ngOnInit() {
    this._mapService.initMap();
    this._mapService.initMapHandlers();
    this.showMarkers(this.markers);
  }

  protected showMarkers(markers: IGpsPosition[] | undefined): void {
    if (markers !== undefined && markers !== null && markers.length > 0) {
      markers.forEach((marker, index) => {
        index === 0 ?
          this._mapService.addMarkerAndSetView(marker)
          : this._mapService.addMarker(marker);
      });
    }
  }


}
