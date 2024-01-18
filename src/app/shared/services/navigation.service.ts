import { inject, Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  location = inject(Location);
  router = inject(Router);

  back() {
    this.location.back();
  }

  goUrl(path: string) {
    this.router.navigateByUrl(path);
  }

  go(path: string[]) {
    this.router.navigate(path);
  }

}
