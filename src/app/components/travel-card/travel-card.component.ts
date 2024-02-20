import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ITravel } from "../../shared/interfaces/travel.interface";

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './travel-card.component.html',
  styleUrl: './travel-card.component.scss'
})
export class TravelCardComponent {
  @Input({ required: true }) travel: ITravel | null = null;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
}
