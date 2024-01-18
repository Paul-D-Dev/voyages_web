import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { NavigationService } from "../../shared/services/navigation.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isBackNavigation = false;
  navigationService = inject(NavigationService);

  backNavigation() {
    this.navigationService.back();
  }
}
