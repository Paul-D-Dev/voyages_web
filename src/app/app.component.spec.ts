import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { By } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NavBarComponent, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });

  it('should contain the app-nav-bar component', () => {
    const navBarComponent = fixture.debugElement.query(By.directive(NavBarComponent));
    expect(navBarComponent).toBeTruthy();
  });

  it('should hide the nav bar if hideNavbar is true', () => {
    component.hideNavbar = true;
    fixture.detectChanges();
    const navBarComponent = fixture.debugElement.query(By.directive(NavBarComponent));
    expect(navBarComponent.nativeElement.getAttribute('hidden')).toBe("");
  });

  it('should show the nav bar if hideNavbar is false', () => {
    component.hideNavbar = false;
    fixture.detectChanges();
    const navBarComponent = fixture.debugElement.query(By.directive(NavBarComponent));
    expect(navBarComponent).toBeTruthy();
  });

});
