import { Injectable, signal, WritableSignal } from '@angular/core';
import { IGpsPosition } from "../interfaces/gps-position.interface";

@Injectable({
  providedIn: 'root'
})
export class MarkersStateService {
  private _markers: WritableSignal<IGpsPosition[]> = signal([]);
  readonly markers = this._markers.asReadonly();

  set(positions: IGpsPosition[]) {
    this._markers.set(positions);
  }

  reset() {
    this._markers.set([]);
  }
}
