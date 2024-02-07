import { Inject, Injectable } from '@angular/core';
import * as L from 'leaflet';
import { ControlOptions, LatLng } from 'leaflet';
import { IGpsPosition } from "../interfaces/gps-position.interface";
import { MAP_CONFIG, MapConfig } from "../../app.config";
import { IMarkerConfig } from "../interfaces/marker.interface";

class CustomLatLng extends LatLng {
  constructor(props: IGpsPosition) {
    super(props.lat, props.lng, props.atl);
  }
}

interface CurrentPositionState {
  state: 'success' | 'failed' | 'init',
  coords: IGpsPosition | null,
  markerAdded: boolean
  failedError?: any
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
  currentPosition: CurrentPositionState = {
    state: 'init',
    coords: null,
    markerAdded: false
  };

  initMap(position?: IGpsPosition | undefined) {
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
    // Click event
    this._map.on('click', (e: any) => {
      const { lat, lng }: LatLng = e.latlng;
      this.addMarker({ lat, lng });
    });
  }

  getPermissionGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('success');
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        // TODO custom marker icon
        this.addMarker(coords);
        this.currentPosition = {
          state: "success",
          coords,
          markerAdded: true
        };
      },
      (err) => {
        console.log('failed');
        console.log(err);
        this.currentPosition = {
          state: "failed",
          coords: null,
          markerAdded: false,
          failedError: err
        };
        if (err.PERMISSION_DENIED) {
          // TODO display popup
        }
      });
  }

  // TODO custom marker icon
  addMarker(position: IGpsPosition, markerConfig?: IMarkerConfig) {
    console.log('add marker: ', position);
    const marker = L.marker(new CustomLatLng(position));
    if (markerConfig?.data) {
      const data = markerConfig.data;
      marker.bindPopup(`${data.index + 1} - ${data.label}`);
    }
    marker.addTo(this._map);
  }

  setView(position: IGpsPosition, zoom: number = this.mapConfig.zoom.max - 3): void {
    this._map.setView(position, zoom);
  }

  addMarkerAndSetView(position: IGpsPosition, markerConfig?: IMarkerConfig) {
    this.addMarker(position, markerConfig);
    this.setView(position);
  }

  /*
  *   GeoLocation the user position and set the view
  * */
  setViewMyGeoLocation(): void {
    this._map.locate({ setView: true });
  }

  addControlMyPosition(): void {
    const options: ControlOptions = {
      position: 'bottomright'
    };
    const MyCtrl = L.Control.extend({
      onAdd: (map: L.Map) => {
        const div = L.DomUtil.create('div', 'leaflet-control-my-position');
        const button = L.DomUtil.create('button', 'leaflet-control-my-position-button', div);
        button.addEventListener('click', () => {
          if (this.currentPosition.coords) {
            this.setView(this.currentPosition.coords, this.mapConfig.zoom.max);
          }
        });

        const img = L.DomUtil.create('img', 'my-position-icon', button);
        img.src = '../../../assets/icons/my_location.png';
        img.style.width = '24px';
        return div;
      },
      onRemove: () => {
      }
    });

    const c = new MyCtrl(options);
    c.addTo(this._map);
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
