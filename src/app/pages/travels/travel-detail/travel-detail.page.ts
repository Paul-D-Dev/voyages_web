import { Component, inject, Input } from '@angular/core';
import { ITravel, ITravelStep } from "../../../shared/interfaces/travel.interface";
import { HeaderComponent } from "../../../components/header/header.component";
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../../shared/enums/icons.enum";
import { MatIconButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TravelService } from "../../../shared/services/travel.service";

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
    RouterLink
  ],
  templateUrl: './travel-detail.page.html',
  styleUrl: './travel-detail.page.scss'
})

export class TravelDetailPage {
  travelService = inject(TravelService);

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

  // TODO
  openInTheMap() {
    // represents steps into the map
  }

  private _saveIndex(array: ITravelStep[]): ITravelStep[] {
    return array.map((item, index) => ({
      ...item,
      index
    }));
  };

}
