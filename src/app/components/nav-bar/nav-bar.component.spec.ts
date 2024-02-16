import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "./nav-bar.component";
import { provideRouter, Router, RouterLink } from "@angular/router";
import { DebugElement } from "@angular/core";
import { Icons } from "../../shared/enums/icons.enum";

fdescribe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let linkDes: DebugElement[];
  let routerLinks: RouterLink[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, RouterLink, MatIconModule],
      providers: [provideRouter([])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three navigation links', () => {
    expect(routerLinks.length).toEqual(3);
    expect(routerLinks[0].href).toBe('/');
    expect(routerLinks[1].href).toBe('/travels');
    expect(routerLinks[2].href).toBe('/settings');
  });

  it('can click link in template', fakeAsync(() => {
    fixture.ngZone?.run(() => {
      linkDes.forEach((link, index) => {
        TestBed.inject(Router).resetConfig([{ path: '**', children: [] }]);
        link.triggerEventHandler('click', { button: 0 });
        tick();
        fixture.detectChanges();

        const href = routerLinks[index].href;
        expect(TestBed.inject(Router).url).withContext(`click on link ${href!}`).toBe(href!);
      });
    });
  }));

  it('should contain mat-icons in navigation links', () => {
    const icons = fixture.debugElement.queryAll(By.css('nav.nav-bar ul li a mat-icon'));
    expect(icons.length).toEqual(3);
  });

  it('should display the right icon for each links', () => {
    const icons = [Icons.HOME, Icons.ROUTE, Icons.SETTINGS];
    linkDes.forEach((link, index) => {
      const matIconDe = link.query(By.css('mat-icon'));
      expect(matIconDe.nativeElement.textContent).withContext('icon name').toContain(icons[index]);
    });
  });
});
