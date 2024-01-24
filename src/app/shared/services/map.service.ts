import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngTuple } from 'leaflet';
import { IGpsPosition } from "../interfaces/gps-position.interface";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private _map!: L.Map;
  searchProvider = new OpenStreetMapProvider();

  get mapInstance() {
    return this._map;
  }

  initMap(position: IGpsPosition, idMap = 'map') {
    const center: LatLngTuple = [position.lat, position.lng, position.atl];
    const map = L.map(idMap, {
      center,
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    // Add control in the map - Maybe to remove
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: this.searchProvider
    });
    map.addControl(searchControl);
    //

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
    const marker = L.marker([position.lat, position.lng]);
    marker.addTo(this._map);
  }

  setView(position: IGpsPosition): void {
    this._map.flyTo(position);
  }
}
