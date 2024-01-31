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
  @Input() isMarker: boolean = false;
  private _mapService = inject(MapService);

  ngOnInit() {
    // TODO when mapDataRoute provide value to initPosition add marker / or setView
    this._mapService.initMap(this.initPosition, this.isMarker);
    this._mapService.onClick();
  }


}
