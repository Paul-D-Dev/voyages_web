import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITravel, ITravelFormData, ITravelStep } from "../interfaces/travel.interface";
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

  private _saveLocal() {
    this.localStorageService.set(this.localStorageKey, this.travels());
  }

  add(travel: ITravelFormData): void {
    this.travels.update((travelList: ITravel[]) => {
      const length = travelList.length;
      const id = length === 0 ? 1 : travelList[length - 1].id + 1;
      return [...travelList, { id, ...travel, steps: [] }];
    });
    this._saveLocal();
  }

  getById(travelId: number): ITravel | undefined {
    return this.travels().find(t => t.id === travelId);
  }

  update(travelData: ITravelFormData, id: number): void {
    this.travels.update(travels =>
      travels.map(travel => travel.id === id ?
        { id: travel.id, ...travelData, steps: travel.steps } : travel
      ));
    this._saveLocal();
  }

  updateStepIndexes(steps: ITravelStep[], travelId: number): void {
    const replaceStepsById = (array: ITravel[], id: number): ITravel[] =>
      array.map(item => {
        if (item.id === id) {
          return {
            ...item,
            steps
          };
        } else {
          return item;
        }
      });
    this.travels.update((travels) => replaceStepsById(travels, travelId));
    this._saveLocal();
  }

}
