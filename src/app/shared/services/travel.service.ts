import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITravel, ITravelFormData } from "../interfaces/travel.interface";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  constructor(private localStorageService: LocalStorageService<ITravel[]>) {
    this.localStorageService.loadStateFromLocalStorage(this.featureKey, this.travels, []);
  }

  private readonly featureKey = 'travels';
  readonly travels: WritableSignal<ITravel[]> = signal<ITravel[]>([]);

  add(travel: ITravelFormData): void {
    this.travels.update((travels) => {
      const length = travels.length;
      const id = length === 0 ? 1 : travels[length - 1].id + 1;
      return [...travels, { id, ...travel }];
    });
    this.localStorageService.set(this.featureKey, this.travels());
  }

  update(travelData: ITravelFormData, id: number): void {
    this.travels.update(travels =>
      travels.map(travel => travel.id === id ?
        { id: travel.id, ...travelData } : travel
      ));
    this.localStorageService.set(this.featureKey, this.travels());
  }

}
