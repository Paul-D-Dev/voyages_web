import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { NavigationService } from "../../shared/services/navigation.service";
import { Icons } from "../../shared/enums/icons.enum";

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
  @Input() title: string | undefined = undefined;
  navigationService = inject(NavigationService);
  protected readonly Icons = Icons;

  backNavigation() {
    this.navigationService.back();
  }
}
