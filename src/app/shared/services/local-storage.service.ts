import { Injectable, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {

  get(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set(key: string, data: unknown): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadStateFromLocalStorage(key: string, state: WritableSignal<T>, initState: T): void {
    const store = this.get(key);
    if (store) {
      state.set(store);
    } else {
      state.set(initState);
    }
  }
}
