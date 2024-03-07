import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { filter, tap } from "rxjs";
import { GlobalStateService } from "./shared/services/global-state.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router, private globalStateService: GlobalStateService) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap(e => {
        const isHomePage = e.url === '/';
        this.globalStateService.set('isHomePage', isHomePage);
      })
    ).subscribe();
  }

  title = 'voyages';
  hideNavbar: Signal<boolean> = this.globalStateService.select('isNavBarHide');
}
