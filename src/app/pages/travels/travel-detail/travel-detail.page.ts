import { Component, inject, Input } from '@angular/core';
import { ITravel, ITravelStep } from "../../../shared/interfaces/travel.interface";
import { HeaderComponent } from "../../../components/header/header.component";
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../../shared/enums/icons.enum";
import { MatButton, MatIconButton } from "@angular/material/button";
import { DatePipe, LowerCasePipe, NgIf, TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TravelService } from "../../../shared/services/travel.service";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { NavigationService } from "../../../shared/services/navigation.service";
import { TravelStateService } from "../../../shared/services/travel-state.service";

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    CdkDropList,
    CdkDrag,
    MatIcon,
    CdkDragHandle,
    MatIconButton,
    NgIf,
    RouterLink,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    DatePipe,
    TitleCasePipe,
    MatButton,
    LowerCasePipe
  ],
  templateUrl: './travel-detail.page.html',
  styleUrl: './travel-detail.page.scss'
})

export class TravelDetailPage {
  travelService = inject(TravelService);
  navigationService = inject(NavigationService);
  travelStateService = inject(TravelStateService);

  @Input()
  set id(travelId: string) {
    this.travel = this.travelService.getById(+travelId);
    if (this.travel) {
      this.mutableTravelSteps = this.travel;
    }
  }

  travel: ITravel | undefined = undefined;
  mutableTravelSteps!: ITravel;
  protected readonly Icons = Icons;

  // TODO
  editStep(id: number) {
    // open modal with form data of the step
  }

  drop(event: CdkDragDrop<ITravelStep[]>) {
    moveItemInArray(this.mutableTravelSteps.steps, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.mutableTravelSteps.steps = this._saveIndex(this.mutableTravelSteps.steps);
      this.travelService.updateStepIndexes(this.mutableTravelSteps.steps, this.mutableTravelSteps.id);
    }
  }

  viewIntoTheMap(idStep: number) {
    const travel: ITravel = {
      ...this.mutableTravelSteps,
      steps: this.mutableTravelSteps.steps.filter(step => step.id === idStep)
    };
    this.travelStateService.set(travel);
    this.navigationService.go(['/']);
  }

  viewTrip(travel: ITravel) {
    this.travelStateService.set(travel);
    this.navigationService.go(['/']);
  }

  delete(stepId: number) {
    this.travelService.deleteStep(stepId, this.mutableTravelSteps.id);
  }

  private _saveIndex(array: ITravelStep[]): ITravelStep[] {
    return array.map((item, index) => ({
      ...item,
      index
    }));
  };

}
