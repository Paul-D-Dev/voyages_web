import { inject, Injectable } from '@angular/core';
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  location = inject(Location);

  back() {
    this.location.back();
  }

}
