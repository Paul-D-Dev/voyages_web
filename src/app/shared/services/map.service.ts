import { Inject, Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLng } from 'leaflet';
import { IGpsPosition } from "../interfaces/gps-position.interface";
import { MAP_CONFIG, MapConfig } from "../../app.config";

class CustomLatLng extends LatLng {
  constructor(props: IGpsPosition) {
    super(props.lat, props.lng, props.atl);
  }
}

@Injectable({
  providedIn: 'root'
})

export class MapService {
  constructor(@Inject(MAP_CONFIG) private mapConfig: MapConfig) {
    this.position = {
      lat: this.mapConfig.center.lat,
      lng: this.mapConfig.center.lng
    };
  }

  private _map!: L.Map;
  private readonly _tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: this.mapConfig.zoom.max,
    minZoom: this.mapConfig.zoom.min,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
  });

  mapLoaded: boolean = false;
  position: IGpsPosition;
  zoom: number = 16;

  initMap(position: IGpsPosition | undefined) {
    if (position) {
      this.position = position;
    }

    if (this.mapLoaded) {
      this._map.remove();
      this.mapLoaded = false;
      console.log(this._map.options);
      this._createMap();
      return;
    }

    this._createMap();
    this.setViewMyGeoLocation();

  }

  initMapHandlers() {
    this._map.on('click', (e: any) => {
      console.log('click data: ', e);
      const { lat, lng }: LatLng = e.latlng;
      this.addMarker({ lat, lng });
    });
  }

  addMarker(position: IGpsPosition) {
    console.log('add marker: ', position);
    const marker = L.marker(new CustomLatLng(position));
    marker.addTo(this._map);
  }

  setView(position: IGpsPosition): void {
    this._map.setView(position, this.mapConfig.zoom.max);
  }

  /*
  *   GeoLocation the user position and set the view*/
  setViewMyGeoLocation(): void {
    this._map.locate({ setView: true });
  }

  private _createMap(): void {
    const map = L.map(this.mapConfig.id, {
      center: new CustomLatLng(this.position),
      zoom: this.zoom,
    });

    this._tiles.addTo(map);
    this._map = map;
    this.mapLoaded = true;
  }
}
