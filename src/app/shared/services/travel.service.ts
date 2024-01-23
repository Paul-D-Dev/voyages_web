import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITravel, ITravelFormData } from "../interfaces/travel.interface";
import { LocalStorageService } from "./local-storage.service";
import { LocalStorageKeyEnum } from "../enums/local-storage-key.enum";

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  constructor(private localStorageService: LocalStorageService<ITravel[]>) {
    this.localStorageService.loadStateFromLocalStorage(this.localStorageKey, this.travels, []);
  }

  private readonly localStorageKey = LocalStorageKeyEnum.TRAVELS;
  readonly travels: WritableSignal<ITravel[]> = signal<ITravel[]>([]);

  add(travel: ITravelFormData): void {
    this.travels.update((travels) => {
      const length = travels.length;
      const id = length === 0 ? 1 : travels[length - 1].id + 1;
      return [...travels, { id, ...travel }];
    });
    this.localStorageService.set(this.localStorageKey, this.travels());
  }

  update(travelData: ITravelFormData, id: number): void {
    this.travels.update(travels =>
      travels.map(travel => travel.id === id ?
        { id: travel.id, ...travelData } : travel
      ));
    this.localStorageService.set(this.localStorageKey, this.travels());
  }

}
