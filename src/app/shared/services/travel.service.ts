import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITravel, ITravelFormData, ITravelStep, ITravelStepFormData } from "../interfaces/travel.interface";
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

  addStep(step: ITravelStepFormData, travelId: number): void {
    this.travels.update(travels => {
      const travel = travels.find(t => t.id === travelId);
      if (travel) {
        // TODO replace how to create the new step BE will handle it
        const newStep: ITravelStep = {
          ...step,
          createdDate: new Date(),
          index: travel.steps.length,
          id: travel.steps.length + 1,
        };
        travel.steps.push(newStep);
      }
      return travels;
    });

    this._saveLocal();
  }

  getStep(idTravel: number, idStep: number): ITravelStep | undefined {
    return this.travels().find(travel => travel.id === idTravel)?.steps.find(step => step.id === idStep);
  }

  editStep(data: ITravelStepFormData, idTravel: number, idStep: number) {
    this.travels.update(travels => travels
      .map(t => {
        if (t.id === idTravel) {
          t.steps = t.steps.map(s => (s.id === idStep ? { ...s, ...data } : s));
        }
        return t;
      })
    );

    this._saveLocal();
  }

  deleteStep(stepId: number, travelId: number): void {
    this.travels.update((travels) => {
      return travels.map((t) => {
        if (t.id === travelId) {
          t.steps = t.steps
            .filter(step => step.id !== stepId)
            .map((step, index) => ({
              ...step,
              index
            }));
        }
        return t;
      });
    });

    this._saveLocal();

  }
}
