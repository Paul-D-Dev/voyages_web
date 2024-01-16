import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngTuple } from 'leaflet';
import { IGpsPosition } from "../interfaces/gps-position.interface";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map!: L.Map;

  get mapInstance() {
    return this._map;
  }

  initMap(position: IGpsPosition, idMap = 'map') {
    if (!this._map) {

      const center: LatLngTuple = [position.lat, position.lng, position.atl];
      const map = L.map(idMap, {
        center,
        zoom: 16
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(map);

      this._map = map;
      return map;
    } else {
      return this._map;
    }

  }

  onClick() {
    this._map.on('click', (e: any) => {
      console.log('click data: ', e);
      const { lat, lng }: LatLng = e.latlng;
      this.addMarker({ lat, lng });
    });
  }

  addMarker(position: IGpsPosition) {
    const marker = L.marker([position.lat, position.lng]);
    marker.addTo(this._map);
  }
}
