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
  @Input() position: IGpsPosition = {
    lat: 45.5031824,
    long: -73.5698065
  };
  private _map: any;
  mapService = inject(MapService);

  ngOnInit() {
    this._map = this.mapService.initMap(this.position);
  }


}
