import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { Icons } from "../../shared/enums/icons.enum";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  protected readonly Icons = Icons;
}
