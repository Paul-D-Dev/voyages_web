import { IGpsPosition } from "./gps-position.interface";

export interface IMarkerConfig<T = any> {
  data?: T;
}

export interface IMarker<T = any> {
  position: IGpsPosition,
  config?: IMarkerConfig<T>
}
