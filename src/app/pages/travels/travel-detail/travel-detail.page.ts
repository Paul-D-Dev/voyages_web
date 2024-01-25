import { Component, Input } from '@angular/core';
import { ITravelDetail, ITravelStep } from "../../../shared/interfaces/travel.interface";
import { HeaderComponent } from "../../../components/header/header.component";
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../../shared/enums/icons.enum";

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    CdkDropList,
    CdkDrag,
    MatIcon
  ],
  templateUrl: './travel-detail.page.html',
  styleUrl: './travel-detail.page.scss'
})

export class TravelDetailPage {
  protected readonly Icons = Icons;
  travelDetailMock: ITravelDetail = {
    id: 1,
    name: 'Paris',
    dateStart: new Date(),
    dateEnd: new Date(),
    steps: [
      {
        id: 1,
        index: 1,
        createdDate: new Date(),
        dateStart: new Date(),
        dateEnd: new Date(),
        category: 'flight',
        label: 'Step 1',
        location: {
          lat: 0,
          lng: 0
        }
      },
      {
        id: 2,
        index: 0,
        createdDate: new Date(),
        dateStart: new Date(),
        dateEnd: new Date(),
        category: 'flight',
        label: 'Step 1',
        location: {
          lat: 0,
          lng: 0
        }
      }
    ]
  };
  @Input() travel: ITravelDetail = this.travelDetailMock || [];

  mutableTravelSteps = this.travelDetailMock;

  // TODO
  addStep() {
    // open modal with add step form
  }

  // TODO
  editStep(id: number) {
    // open modal with form data of the step
  }

  drop(event: CdkDragDrop<ITravelStep[]>) {
    moveItemInArray(this.mutableTravelSteps.steps, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.mutableTravelSteps.steps = this._saveIndex(this.mutableTravelSteps.steps);
      console.log(this.mutableTravelSteps.steps);
      // TODO trigger save new array with index changed
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
