import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { DatePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatButton
  ],
  templateUrl: './travels.page.html',
  styleUrl: './travels.page.scss'
})
export class TravelsPage {
  travelListMock: ITravel[] = [
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
    {
      id: 1,
      name: 'Hawaii',
      dateStart: new Date('10/01/2023'),
      dateEnd: new Date('10/15/2023'),
    },
  ];
  travelList: ITravel[] = this.travelListMock || [];

}
