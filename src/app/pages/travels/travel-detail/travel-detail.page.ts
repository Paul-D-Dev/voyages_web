import { Component, Input } from '@angular/core';
import { ITravelDetail } from "../../../shared/interfaces/travel.interface";
import { HeaderComponent } from "../../../components/header/header.component";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [
    HeaderComponent,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './travel-detail.page.html',
  styleUrl: './travel-detail.page.scss'
})

export class TravelDetailPage {
  travelDetailMock: ITravelDetail = {
    id: 1,
    name: 'Paris',
    dateStart: new Date(),
    dateEnd: new Date(),
    steps: [
      {
        id: 1,
        order: 1,
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

  // TODO
  addStep() {
    // open modal with add step form
  }

  // TODO
  editStep(id: number) {
    // open modal with form data of the step
  }

  // TODO
  order(orderId: number) {
    // swap order with draggable step
  }

  // TODO
  openInTheMap() {
    // represents steps into the map
  }
}
