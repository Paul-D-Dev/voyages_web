import { IGpsPosition } from "./gps-position.interface";
import { MarkerOptions } from "leaflet";

export interface IMarkerConfig<T = any> {
  data?: T;
  canRemove?: boolean,
  options?: MarkerOptions,
}

export interface IMarker<T = any> {
  position: IGpsPosition,
  config?: IMarkerConfig<T>
}
