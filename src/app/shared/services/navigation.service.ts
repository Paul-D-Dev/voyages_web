import { inject, Injectable, Signal } from '@angular/core';
import { Location } from "@angular/common";
import { NavigationExtras, Router } from "@angular/router";
import { GlobalStateService } from "./global-state.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  location = inject(Location);
  router = inject(Router);
  isMobile: Signal<boolean> = inject(GlobalStateService).select('isMobile');

  back() {
    this.location.back();
  }

  goUrl(path: string, options?: NavigationExtras) {
    this.router.navigateByUrl(path, options);
  }

  go(path: string[], options?: NavigationExtras) {
    this.router.navigate(path, options);
  }

  goHomeIfMobile(options?: NavigationExtras) {
    if (this.isMobile()) {
      this.router.navigate(['/'], options);
    } else {
      console.warn('The display screen is not a mobile then the user can not navigate to home page')
    }
  }

}
