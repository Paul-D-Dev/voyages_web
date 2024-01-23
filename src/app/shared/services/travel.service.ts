import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITravel, ITravelFormData } from "../interfaces/travel.interface";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  travels: WritableSignal<ITravel[]> = signal<ITravel[]>([]);

  add(travel: ITravelFormData): void {
    this.travels.update((travels) => {
      const newId = travels[travels.length - 1].id + 1;
      return [...travels, { id: newId, ...travel }];
    });
  }

  update(travelData: ITravelFormData, id: number): void {
    this.travels.update(travels =>
      travels.map(travel => travel.id === id ?
        { id: travel.id, ...travelData } : travel
      ));
  }

}
