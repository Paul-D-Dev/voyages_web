import { Injectable, WritableSignal } from '@angular/core';
import { LocalStorageKeyEnum } from "../enums/local-storage-key.enum";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {

  get(key: LocalStorageKeyEnum): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadStateFromLocalStorage(key: LocalStorageKeyEnum, state: WritableSignal<T>, initState: T): void {
    const store = this.get(key);
    if (store) {
      state.set(store);
    } else {
      state.set(initState);
      this.set(key, state());
    }
  }
}
