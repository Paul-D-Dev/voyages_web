import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../shared/enums/icons.enum";
import { IGpsPosition } from "../../shared/interfaces/gps-position.interface";
import { OpenOnMapsAppService } from "../../shared/services/open-on-maps-app.service";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-overlay-travel-detail',
  standalone: true,
  imports: [MatIconButton, MatIcon],
  templateUrl: './overlay-travel-detail.component.html',
  styleUrl: './overlay-travel-detail.component.scss'
})
export class OverlayTravelDetailComponent {
  @Input() travel: ITravel | null = null;
  router = inject(Router);
  openOnMapsAppService = inject(OpenOnMapsAppService);
  protected readonly Icons = Icons;
  currentIndex: WritableSignal<number> = signal(0);

  ngOnInit() {
    const routerState = this.router.lastSuccessfulNavigation?.extras.state
    // Get the index of the step that was activated
    if (routerState) {
      const activateStepId = routerState['activateStepId']
      const index: number | undefined = this.travel?.steps
        .findIndex(step => step.id = activateStepId);
      const isDefinedIndex = !!index && index !== -1
      const indexToSet: number = isDefinedIndex ? index : 0;
      this.currentIndex.set(indexToSet);
    }
  }

  navigateTo(location: IGpsPosition | undefined): void {
    if (location) {
      this.openOnMapsAppService.viewLocation(location);
    }
  }


}
