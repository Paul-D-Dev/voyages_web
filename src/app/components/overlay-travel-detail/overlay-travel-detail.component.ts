import { Component, inject, Input } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";
import { OpenOnMapsAppService } from "../../shared/services/open-on-maps-app.service";
import { ITravelStep } from "../../shared/interfaces/travel.interface";

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
  @Input() travelDetail: ITravelStep | undefined = undefined;
  openOnMapsAppService = inject(OpenOnMapsAppService);
  protected readonly Icons = Icons;

  navigateTo(location: IGpsPosition | undefined): void {
    if (location) {
      this.openOnMapsAppService.viewLocation(location);
    }
  }
}
