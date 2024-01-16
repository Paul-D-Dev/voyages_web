import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import { IGpsPosition } from "../interfaces/gps-position.interface";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  initMap(position: IGpsPosition, idMap = 'map') {
    const center: LatLngTuple = [position.lat, position.long, position.atl];
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

    return map;
  }
}
