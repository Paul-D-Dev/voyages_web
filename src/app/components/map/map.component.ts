import { Component, inject, Input, OnInit } from '@angular/core';
import { MapService } from "../../shared/services/map.service";
import { IMarker } from "../../shared/interfaces/marker.interface";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private _mapService = inject(MapService);
  @Input() markers: IMarker[] | undefined = [];

  ngOnInit() {
    this._mapService.getPermissionGeolocation();
    this._mapService.initMap();
    this._mapService.initMapHandlers();
    this._mapService.addControlMyPosition();
    this.showMarkers(this.markers);
  }

  protected showMarkers<T>(markers: IMarker<T>[] | undefined): void {
    if (markers !== undefined && markers !== null && markers.length > 0) {
      markers.forEach((marker, index) => {
        const { position, config } = marker;
        index === 0 ?
          this._mapService.addMarkerAndSetView(marker.position, config)
          : this._mapService.addMarker(position, config);
      });
    }
  }


}
