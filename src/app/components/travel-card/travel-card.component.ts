import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ITravel } from "../../shared/interfaces/travel.interface";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Icons } from "../../shared/enums/icons.enum";
import { MenuButtonComponent } from "../buttons/menu-button/menu-button.component";
import { IMenuButton } from "../../shared/interfaces/menu-button.interface";

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    TitleCasePipe,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MenuButtonComponent
  ],
  templateUrl: './travel-card.component.html',
  styleUrl: './travel-card.component.scss'
})
export class TravelCardComponent {
  @Input({ required: true }) travel: ITravel | null = null;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  protected readonly Icons = Icons;
  menuButtonList: IMenuButton[] = [
    {
      icon: Icons.EDIT,
      label: 'edit',
      onClick: () => this.onEdit.emit(this.travel?.id)
    },
    {
      icon: Icons.DELETE,
      label: 'delete',
      onClick: () => this.onDelete.emit(this.travel?.id)
    }
  ];
}
