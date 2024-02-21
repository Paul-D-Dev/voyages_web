import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { MatButton } from "@angular/material/button";
import { TravelService } from "../../shared/services/travel.service";
import { HeaderComponent } from "../../components/header/header.component";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { TravelCardComponent } from "../../components/travel-card/travel-card.component";
import { NavigationService } from "../../shared/services/navigation.service";

@Component({
  selector: 'app-travels',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    RouterOutlet,
    HeaderComponent,
    TravelCardComponent
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
    ]),
    trigger('deleteAnimation', [
      transition(':leave', [
        animate('250ms ease-out', style({ opacity: 0, height: '0', padding: '0' }))
      ])
    ]),
  ]
})

export class TravelsPage {
  travelService = inject(TravelService);
  navigationService = inject(NavigationService);
  route = inject(ActivatedRoute);
  travelList: Signal<ITravel[]> = this.travelService.travels;

  navigateToTravelDetail(idTravel: number) {
    const id: string = idTravel.toString();
    this.navigationService.go([id], { relativeTo: this.route });
  }

  editTravel(idTravel: number): void {
    const id: string = idTravel.toString();
    this.navigationService.go(['./edit', id], { relativeTo: this.route });
  }

  deleteTravel(idTravel: number): void {
    this.travelService.delete(idTravel);
  }
}
