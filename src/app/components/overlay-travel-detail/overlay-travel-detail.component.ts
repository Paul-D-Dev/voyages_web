import { Component } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";

@Component({
  selector: 'app-overlay-travel-detail',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './overlay-travel-detail.component.html',
  styleUrl: './overlay-travel-detail.component.scss'
})
export class OverlayTravelDetailComponent {
  protected readonly Icons = Icons;
}
