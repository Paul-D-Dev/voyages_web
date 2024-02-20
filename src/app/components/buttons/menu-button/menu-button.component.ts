import { Component, Input } from '@angular/core';
import { Icons } from "../../../shared/enums/icons.enum";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { IMenuButton } from "../../../shared/interfaces/menu-button.interface";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    TitleCasePipe
  ],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent {
  @Input() menuButtonList: IMenuButton[] = [];
  protected readonly Icons = Icons;
}
