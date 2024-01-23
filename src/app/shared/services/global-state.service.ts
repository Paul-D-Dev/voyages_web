import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { LocalStorageKeyEnum } from "../enums/local-storage-key.enum";
import { IGlobalState } from "../interfaces/global-state.interface";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
// SOURCE: https://medium.com/ngconf/keeping-state-with-a-service-using-signals-bee652158ecf
export class GlobalStateService {

  constructor(private localStorageService: LocalStorageService<IGlobalState>) {
    this.localStorageService.loadStateFromLocalStorage(this.featureKey, this._state, this.initState);
  }

  private readonly initState: IGlobalState = {
    isNavBarHide: false,
    isSearchFocused: false,
  };

  private readonly featureKey = LocalStorageKeyEnum.GLOBAL_STATE;
  private _state: WritableSignal<IGlobalState> = signal<IGlobalState>(this.initState);

  set<K extends keyof IGlobalState>(key: K, value: IGlobalState[K]): void {
    this._state.update(currentState => ({
      ...currentState,
      [key]: value
    }));
    this.localStorageService.set(this.featureKey, this._state());
  }

  select<K extends keyof IGlobalState>(key: K): Signal<IGlobalState[K]> {
    return computed(() => this._state()[key]);
  }
}
