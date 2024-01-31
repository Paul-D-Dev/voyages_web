import { inject, Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { NavigationExtras, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  location = inject(Location);
  router = inject(Router);

  back() {
    this.location.back();
  }

  goUrl(path: string, options?: NavigationExtras) {
    this.router.navigateByUrl(path, options);
  }

  go(path: string[], options?: NavigationExtras) {
    this.router.navigate(path, options);
  }

}
