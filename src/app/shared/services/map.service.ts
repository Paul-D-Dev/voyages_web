import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngTuple } from 'leaflet';
import { IGpsPosition } from "../interfaces/gps-position.interface";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map!: L.Map;
  // searchProvider = new OpenStreetMapProvider();
  zoom = { min: 3, max: 18 };

  initMap(position: IGpsPosition | undefined, isMarker = false, idMap = 'map') {
    if (!position) {
      // Default position
      position = {
        lat: 45.5031824,
        lng: -73.5698065
      };
    }
    console.log('init map: ', position);
    const center: LatLngTuple = [position.lat, position.lng, position.atl];
    const map = L.map(idMap, {
      center,
      zoom: 16,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.zoom.max,
      minZoom: this.zoom.min,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    this._map = map;

    // GeoLocation the user position and set the view
    this._map.locate({ setView: true });

  }

  onClick() {
    this._map.on('click', (e: any) => {
      console.log('click data: ', e);
      const { lat, lng }: LatLng = e.latlng;
      this.addMarker({ lat, lng });
    });
  }

  addMarker(position: IGpsPosition) {
    console.log('add marker: ', position);
    const marker = L.marker([position.lat, position.lng]);
    marker.addTo(this._map);
  }

  setView(position: IGpsPosition): void {
    this._map.setView(position, this.zoom.max);
  }
}
