import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from "./nav-bar.component";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, RouterTestingModule, MatIconModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('nav.nav-bar ul li'));
    expect(links.length).toEqual(3);
  });

  it('should have the correct routerLinks', () => {
    const links = fixture.debugElement.queryAll(By.css('nav.nav-bar ul li a'));
    expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/');
    expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/travels');
    expect(links[2].nativeElement.getAttribute('routerLink')).toBe('/settings');
  });

  it('should contain mat-icons in navigation links', () => {
    const icons = fixture.debugElement.queryAll(By.css('nav.nav-bar ul li a mat-icon'));
    expect(icons.length).toEqual(3);
  });
});
