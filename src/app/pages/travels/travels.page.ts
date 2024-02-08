import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { DatePipe, TitleCasePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { TravelService } from "../../shared/services/travel.service";
import { HeaderComponent } from "../../components/header/header.component";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatButton,
    RouterOutlet,
    HeaderComponent,
    TitleCasePipe
  ],
  templateUrl: './travels.page.html',
  styleUrl: './travels.page.scss',
  // SOURCE: https://ultimatecourses.com/blog/angular-animations-how-to-animate-lists
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('120ms', animate('600ms ease-out', style({ opacity: 1 }))),
        ], { optional: true })
      ])
    ])
  ]
})
export class TravelsPage {
  travelService = inject(TravelService);
  travelList: ITravel[] = this.travelService.travels();

}
