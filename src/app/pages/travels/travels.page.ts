import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { DatePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { TravelService } from "../../shared/services/travel.service";

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
  travelService = inject(TravelService);
  travelList: ITravel[] = this.travelService.travels();

}
