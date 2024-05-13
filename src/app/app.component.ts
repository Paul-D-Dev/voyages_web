import { Component, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { filter, map, Observable, tap } from "rxjs";
import { GlobalStateService } from "./shared/services/global-state.service";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router, private globalStateService: GlobalStateService, private breakpointObserver: BreakpointObserver) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap(e => {
        const isHomePage = e.url === '/';
        this.globalStateService.set('isHomePage', isHomePage);
      })
    ).subscribe();

    const isMobile: Signal<boolean | undefined> = toSignal(this._verifyIfDisplayIsMobile())
    effect(() => {
      this.globalStateService.set('isMobile', !!isMobile());
    }, { allowSignalWrites: true })

  }

  title = 'voyages';
  hideNavbar: Signal<boolean> = this.globalStateService.select('isNavBarHide');

  private _verifyIfDisplayIsMobile(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(map(result => result.matches))
  }
}
