import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ITravel, ITravelStep } from "../interfaces/travel.interface";
import { IMarker } from "../interfaces/marker.interface";

@Injectable({
  providedIn: 'root'
})
export class TravelStateService {
  private _travel: WritableSignal<ITravel | null> = signal(null);
  readonly travel: Signal<ITravel | null> = this._travel.asReadonly();

  set(item: ITravel) {
    this._travel.set(item);
  }

  getMarkers(): Signal<IMarker[]> {
    return computed(() => {
      if (this.travel() === null) {
        return [];
      } else {
        return this.travel()!.steps.map(step => ({
          position: step.location,
          config: {
            data: step
          }
        }));
      }
    });
  }

  getOverlayTravelStepData(): Signal<ITravelStep | undefined> {
    return computed(() => {
      return this.travel()?.steps[0] || undefined;
    });
  }

  reset() {
    this._travel.set(null);
  }
}
