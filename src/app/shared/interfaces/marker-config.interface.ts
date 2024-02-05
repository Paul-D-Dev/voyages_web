import { ITravelStep } from "./travel.interface";

export interface IMarkerConfig {
  popup?: ITravelStep;
  data: {
    travelId?: number
  };
}
